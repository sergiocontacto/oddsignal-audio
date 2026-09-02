/*
  EvoraVerb — motor de reverb (puerto web)
  Reimplementación en JS del algoritmo documentado en la ficha técnica:
  pre-delay estéreo -> reflexiones tempranas (8 taps/canal) -> difusor allpass (4 etapas/canal)
  -> tanque FDN de 8 líneas con matriz Householder, damping y modulación de 3 capas -> anchura M/S.
  No es el binario C++ del plugin: es una réplica fiel del diseño, pensada para sonar en el navegador.
*/

class DelayLine {
  constructor(maxSamples) {
    let size = 1;
    while (size < maxSamples) size <<= 1;
    this.mask = size - 1;
    this.buf = new Float32Array(size);
    this.w = 0;
  }
  write(v) {
    this.buf[this.w] = v;
    this.w = (this.w + 1) & this.mask;
  }
  readInt(delaySamples) {
    const i = (this.w - delaySamples) & this.mask;
    return this.buf[i];
  }
  readFrac(delaySamples) {
    const pos = this.w - delaySamples;
    const i0f = Math.floor(pos);
    const frac = pos - i0f;
    const i0 = i0f & this.mask;
    const i1 = (i0 + 1) & this.mask;
    return this.buf[i0] + (this.buf[i1] - this.buf[i0]) * frac;
  }
}

function softclip(x, ceiling) {
  return ceiling * Math.tanh(x / ceiling);
}

function lerp(range, t) {
  return range[0] + (range[1] - range[0]) * t;
}

const EARLY_TAPS_L_MS = [8.7, 14.3, 21.9, 28.1, 36.7, 45.3, 56.9, 68.3];
const EARLY_TAPS_R_MS = [11.3, 17.9, 25.1, 32.7, 41.3, 51.7, 62.1, 74.9];
const DIFFUSER_L_MS = [4.7, 7.9, 13.1, 19.3];
const DIFFUSER_R_MS = [5.9, 9.7, 15.3, 21.7];
const FDN_BASE_MS = [29.7, 37.1, 41.3, 47.9, 53.7, 59.3, 67.1, 73.9];

const MACRO = {
  size: [0.20, 0.95],
  decay: [0.8, 12.0],
  damp: [0.55, 0.30],
  pre: [10, 35],
  mod: [0.15, 0.55],
  width: [0.70, 1.00],
  erLevel: [0.30, 0.14],
  tailLevel: [0.75, 1.05]
};

const HADAMARD_L = [1, 1, 1, 1, -1, -1, -1, -1];
const HADAMARD_R = [1, -1, 1, -1, 1, -1, 1, -1];

class EvoraVerbProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [{ name: 'amount', defaultValue: 0.35, minValue: 0, maxValue: 1, automationRate: 'k-rate' }];
  }

  constructor() {
    super();
    const sr = sampleRate;

    this.preBufL = new DelayLine(Math.ceil(sr * 0.06) + 4);
    this.preBufR = new DelayLine(Math.ceil(sr * 0.06) + 4);

    this.erBufL = new DelayLine(Math.ceil(sr * 0.09) + 4);
    this.erBufR = new DelayLine(Math.ceil(sr * 0.09) + 4);
    this.tapSamplesL = EARLY_TAPS_L_MS.map(ms => Math.round(ms * sr / 1000));
    this.tapSamplesR = EARLY_TAPS_R_MS.map(ms => Math.round(ms * sr / 1000));

    this.diffBufL = DIFFUSER_L_MS.map(ms => new DelayLine(Math.ceil(ms * sr / 1000) + 4));
    this.diffBufR = DIFFUSER_R_MS.map(ms => new DelayLine(Math.ceil(ms * sr / 1000) + 4));
    this.diffDelayL = DIFFUSER_L_MS.map(ms => Math.round(ms * sr / 1000));
    this.diffDelayR = DIFFUSER_R_MS.map(ms => Math.round(ms * sr / 1000));

    this.fdnLine = FDN_BASE_MS.map(ms => new DelayLine(Math.ceil(ms * sr / 1000 * 2.2) + 32));
    this.fdnDampState = new Float32Array(8);
    this.fdnDcState = new Float32Array(8);
    this.fdnDev = FDN_BASE_MS.map(() => 0.90 + Math.random() * 0.20);

    this.lfoPhase = FDN_BASE_MS.map(() => Math.random() * Math.PI * 2);
    this.lfoInc = FDN_BASE_MS.map(() => 2 * Math.PI * (0.15 + Math.random() * 0.49) / sr);
    this.driftPhase = FDN_BASE_MS.map(() => Math.random() * Math.PI * 2);
    this.driftInc = FDN_BASE_MS.map(() => 2 * Math.PI * (0.021 + Math.random() * 0.091) / sr);
    this.noiseState = new Float32Array(8);

    this.erLpL = 0; this.erLpR = 0;

    this.preDelayMsSmoothed = 20;
    this.fdnScaleSmoothed = 1.0;

    this.sr = sr;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    const outL = output[0];
    const outR = output[1] || output[0];
    const hasIn = input && input.length > 0 && input[0].length > 0;
    const inL = hasIn ? input[0] : null;
    const inR = hasIn ? (input[1] || input[0]) : null;

    const amount = parameters.amount[0];
    const n = outL.length;

    const size = lerp(MACRO.size, amount);
    const decayTime = lerp(MACRO.decay, amount);
    const damp = lerp(MACRO.damp, amount);
    const preDelayTarget = lerp(MACRO.pre, amount);
    const modVal = lerp(MACRO.mod, amount);
    const widthAmt = lerp(MACRO.width, amount);
    const erLevel = lerp(MACRO.erLevel, amount);
    const tailLevel = lerp(MACRO.tailLevel, amount);
    const sizeNorm = (size - MACRO.size[0]) / (MACRO.size[1] - MACRO.size[0]);
    const diffCoeff = 0.55 + 0.15 * sizeNorm;
    const fdnScaleTarget = 0.4 + 1.6 * sizeNorm;

    const blockDur = n / this.sr;
    const alphaPre = 1 - Math.exp(-blockDur / 0.05);
    const alphaScale = 1 - Math.exp(-blockDur / 0.15);
    this.preDelayMsSmoothed += alphaPre * (preDelayTarget - this.preDelayMsSmoothed);
    this.fdnScaleSmoothed += alphaScale * (fdnScaleTarget - this.fdnScaleSmoothed);

    const avgBaseMs = FDN_BASE_MS.reduce((a, b) => a + b, 0) / 8;
    const avgDelaySec = (avgBaseMs * this.fdnScaleSmoothed) / 1000;
    const gFb = Math.min(0.97, Math.pow(10, (-3 * avgDelaySec) / decayTime));
    const dampCoef = Math.max(0, Math.min(0.98, damp));
    const modDepthSamples = 10 * modVal;
    const predelaySamples = (this.preDelayMsSmoothed * this.sr) / 1000;

    const tapOut = new Float32Array(8);
    const mixed = new Float32Array(8);
    const inject = new Float32Array(8);

    for (let i = 0; i < n; i++) {
      const sL = hasIn ? inL[i] : 0;
      const sR = hasIn ? inR[i] : sL;

      this.preBufL.write(sL);
      this.preBufR.write(sR);
      const pdL = this.preBufL.readFrac(predelaySamples);
      const pdR = this.preBufR.readFrac(predelaySamples);

      this.erBufL.write(pdL);
      this.erBufR.write(pdR);
      let sumL = 0, sumR = 0;
      for (let t = 0; t < 8; t++) {
        sumL += this.erBufL.readInt(this.tapSamplesL[t]);
        sumR += this.erBufR.readInt(this.tapSamplesR[t]);
      }
      sumL *= 0.125; sumR *= 0.125;
      this.erLpL += 0.32 * (sumL - this.erLpL);
      this.erLpR += 0.32 * (sumR - this.erLpR);

      let xL = this.erLpL, xR = this.erLpR;
      for (let s = 0; s < 4; s++) {
        const buf = this.diffBufL[s], d = this.diffDelayL[s];
        const w = buf.readInt(d);
        const y = -diffCoeff * xL + w;
        buf.write(xL + diffCoeff * w);
        xL = y;
      }
      for (let s = 0; s < 4; s++) {
        const buf = this.diffBufR[s], d = this.diffDelayR[s];
        const w = buf.readInt(d);
        const y = -diffCoeff * xR + w;
        buf.write(xR + diffCoeff * w);
        xR = y;
      }

      for (let k = 0; k < 8; k++) {
        const mod = 0.60 * Math.sin(this.lfoPhase[k]) + 0.28 * Math.sin(this.driftPhase[k]) + 0.12 * this.noiseState[k];
        this.lfoPhase[k] += this.lfoInc[k];
        this.driftPhase[k] += this.driftInc[k];
        this.noiseState[k] += 0.01 * ((Math.random() * 2 - 1) - this.noiseState[k]);

        const delaySamples = (FDN_BASE_MS[k] * this.fdnScaleSmoothed * this.sr) / 1000 + modDepthSamples * mod;
        const t = this.fdnLine[k].readFrac(Math.max(1, delaySamples));

        this.fdnDampState[k] += (dampCoef * this.fdnDev[k]) * (t - this.fdnDampState[k]);
        let f = this.fdnDampState[k];
        this.fdnDcState[k] += 0.0008 * (f - this.fdnDcState[k]);
        f -= 0.35 * this.fdnDcState[k];
        tapOut[k] = f;

        inject[k] = (k % 2 === 0 ? xL : xR) * 0.5;
      }

      let sum8 = 0;
      for (let k = 0; k < 8; k++) sum8 += tapOut[k];
      for (let k = 0; k < 8; k++) mixed[k] = tapOut[k] - 0.25 * sum8;

      for (let k = 0; k < 8; k++) {
        const raw = inject[k] + gFb * mixed[k];
        this.fdnLine[k].write(softclip(raw, 0.90));
      }

      let tailL = 0, tailR = 0;
      for (let k = 0; k < 8; k++) {
        tailL += HADAMARD_L[k] * tapOut[k];
        tailR += HADAMARD_R[k] * tapOut[k];
      }
      tailL *= 0.25; tailR *= 0.25;

      const preWidthL = erLevel * this.erLpL + tailLevel * tailL;
      const preWidthR = erLevel * this.erLpR + tailLevel * tailR;

      const mid = (preWidthL + preWidthR) * 0.5;
      const side = (preWidthL - preWidthR) * 0.5 * widthAmt;

      outL[i] = softclip(mid + side, 1.0);
      outR[i] = softclip(mid - side, 1.0);
    }

    return true;
  }
}

registerProcessor('evoraverb-processor', EvoraVerbProcessor);
