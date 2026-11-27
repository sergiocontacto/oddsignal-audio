// Traducciones de FUZZMIC. Se carga DESPUES de essentials/i18n.js y ANTES de i18n.js.
(function () {
  // [ingles, es, fr, de, it]
  var filas = [
    ["Free plugin", "Plugin gratis", "Plugin gratuit", "Gratis-Plugin", "Plugin gratuito"],
    ["ODDSIGNAL Vintage · Free plugin", "ODDSIGNAL Vintage · Plugin gratis", "ODDSIGNAL Vintage · Plugin gratuit", "ODDSIGNAL Vintage · Gratis-Plugin", "ODDSIGNAL Vintage · Plugin gratuito"],
    ["A microphone and a fuzz circuit in one box. Run any track through it and turn the red knob.", "Un micrófono y un circuito fuzz en una sola caja. Pasa cualquier pista por él y gira la perilla roja.", "Un micro et un circuit fuzz dans un seul boîtier. Faites-y passer n'importe quelle piste et tournez le bouton rouge.", "Ein Mikrofon und eine Fuzz-Schaltung in einer Box. Schick eine beliebige Spur hindurch und dreh den roten Regler.", "Un microfono e un circuito fuzz in un'unica scatola. Facci passare qualsiasi traccia e gira la manopola rossa."],
    ["VST3 · 64-bit · 5 MB", "VST3 · 64 bits · 5 MB", "VST3 · 64 bits · 5 Mo", "VST3 · 64 Bit · 5 MB", "VST3 · 64 bit · 5 MB"],
    ["VST3 + AU · 19 MB", "VST3 + AU · 19 MB", "VST3 + AU · 19 Mo", "VST3 + AU · 19 MB", "VST3 + AU · 19 MB"],
    ["knobs", "perillas", "boutons", "Regler", "manopole"],
    ["oversampled fuzz", "fuzz con sobremuestreo", "fuzz suréchantillonné", "Fuzz mit Oversampling", "fuzz sovracampionato"],
    ["One red knob.", "Una perilla roja.", "Un bouton rouge.", "Ein roter Regler.", "Una manopola rossa."],
    ["From a little grit to a ragged wall.", "De un poco de grano a un muro roto.", "D'un léger grain à un mur déchiré.", "Von etwas Biss bis zur zerrissenen Wand.", "Da un filo di grana a un muro sporco."],
    ["FUZZMIC shapes your audio like a small microphone capsule and drives it into a fuzz preamp that reacts to level. Push the input to excite it, then set the output to taste.", "FUZZMIC moldea tu audio como una pequeña cápsula de micrófono y lo lleva a un previo fuzz que responde al nivel. Sube la entrada para excitarlo y ajusta la salida a tu gusto.", "FUZZMIC façonne votre son comme une petite capsule de micro et l'envoie dans un préampli fuzz sensible au niveau. Poussez l'entrée pour l'exciter, puis réglez la sortie.", "FUZZMIC formt dein Signal wie eine kleine Mikrofonkapsel und schickt es in einen pegelabhängigen Fuzz-Preamp. Dreh den Eingang auf und stell den Ausgang nach Geschmack ein.", "FUZZMIC modella il tuo audio come una piccola capsula microfonica e lo spinge in un preamp fuzz sensibile al livello. Alza l'ingresso per stimolarlo, poi regola l'uscita."],
    ["Microphone capsule into a fuzz preamp", "Cápsula de micrófono hacia un previo fuzz", "Capsule de micro vers un préampli fuzz", "Mikrofonkapsel in einen Fuzz-Preamp", "Capsula microfonica in un preamp fuzz"],
    ["Input and output gain", "Ganancia de entrada y salida", "Gain d'entrée et de sortie", "Eingangs- und Ausgangspegel", "Guadagno di ingresso e uscita"],
    ["Resizable interface", "Interfaz redimensionable", "Interface redimensionnable", "Skalierbare Oberfläche", "Interfaccia ridimensionabile"],
    ["One plugin. Zero cost.", "Un plugin. Cero euros.", "Un plugin. Zéro euro.", "Ein Plugin. Null Euro.", "Un plugin. Zero euro."],
    ["Download FUZZMIC and put it to work on your next session.", "Descarga FUZZMIC y ponlo a trabajar en tu próxima sesión.", "Téléchargez FUZZMIC et mettez-le au travail dès votre prochaine session.", "Lade FUZZMIC und nutze es in deiner nächsten Session.", "Scarica FUZZMIC e usalo nella tua prossima sessione."]
  ];
  window.EXTRA_TRANSLATIONS = window.EXTRA_TRANSLATIONS || {};
  ["es", "fr", "de", "it"].forEach(function (idioma, i) {
    var tabla = window.EXTRA_TRANSLATIONS[idioma] = window.EXTRA_TRANSLATIONS[idioma] || {};
    filas.forEach(function (fila) { tabla[fila[0]] = fila[i + 1]; });
  });
})();
