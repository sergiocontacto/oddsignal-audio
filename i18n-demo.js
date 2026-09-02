// Traducciones de la demo interactiva de EvoraVerb (demo.html).
// Se carga ANTES de i18n.js, que las fusiona con las suyas.
// Los nombres de los mandos y parametros (Amount, Mix, Size, Decay,
// Damping, Pre-delay, Mod depth, Width) se dejan en ingles a proposito,
// igual que en i18n-evoraverb.js: son las etiquetas literales del plugin.
window.EXTRA_TRANSLATIONS = window.EXTRA_TRANSLATIONS || {};
(function (extra) {
  extra.es = Object.assign(extra.es || {}, {
    "Live in your browser": "En vivo, en tu navegador",
    "This runs the actual EvoraVerb design — pre-delay, eight-tap early reflections, an allpass diffuser and an 8-line feedback delay network with three-layer modulation — rebuilt in Web Audio. No install, no account.":
      "Esto corre el diseño real de EvoraVerb — pre-delay, ocho tomas de reflexión temprana, un difusor allpass y una red de retardo realimentada de 8 líneas con modulación de tres capas — reescrito en Web Audio. Sin instalar nada, sin cuenta.",
    "Engine · Amount": "Motor · Amount",
    "Drag to turn": "Arrastra para girar",
    "Audio source": "Fuente de audio",
    "Test chord": "Acorde de prueba",
    "Upload audio": "Subir audio",
    "Microphone": "Micrófono",
    "Trigger a chord synthesized right here in the browser and listen to how the tail wraps around it.":
      "Dispara un acorde sintetizado aquí mismo en el navegador y escucha cómo la cola lo envuelve.",
    "Minor chord": "Acorde menor",
    "Major chord": "Acorde mayor",
    "Short pulse": "Pulso corto",
    "📁 Click to choose an audio file — it will loop": "📁 Haz clic para elegir un archivo de audio — se reproducirá en bucle",
    "Use your microphone as a live source. Your browser will ask for permission.":
      "Usa tu micrófono como fuente en vivo. Tu navegador pedirá permiso.",
    "Enable microphone": "Activar micrófono",
    "Disable microphone": "Desactivar micrófono",
    "■ Stop": "■ Detener",
    "Engine idle": "Motor apagado",
    "Playing chord…": "Reproduciendo acorde…",
    "Playing:": "Reproduciendo:",
    "could not decode this file": "no se pudo decodificar este archivo",
    "Microphone live": "Micrófono activo",
    "Could not access microphone": "No se pudo acceder al micrófono",
    "Audio failed to start — reload the page": "El audio no arrancó — recarga la página",
    "A JavaScript reconstruction of EvoraVerb's engine (Web Audio, AudioWorklet), not the plugin binary itself — built so you can hear the design before you install the real thing. Needs a browser with Web Audio support (Chrome, Edge, Firefox, recent Safari).":
      "Una reconstrucción en JavaScript del motor de EvoraVerb (Web Audio, AudioWorklet), no el binario del plugin — pensada para que oigas el diseño antes de instalar el real. Necesita un navegador con soporte de Web Audio (Chrome, Edge, Firefox, Safari reciente).",
    "Read how EvoraVerb works →": "Lee cómo funciona EvoraVerb →",
    "Like what you hear? Get the full VST3 / Audio Unit / Standalone plugin.":
      "¿Te gusta lo que oyes? Consigue el plugin completo VST3 / Audio Unit / Standalone."
  });

  extra.fr = Object.assign(extra.fr || {}, {
    "Live in your browser": "En direct, dans votre navigateur",
    "This runs the actual EvoraVerb design — pre-delay, eight-tap early reflections, an allpass diffuser and an 8-line feedback delay network with three-layer modulation — rebuilt in Web Audio. No install, no account.":
      "Ceci fait tourner le vrai design d'EvoraVerb — pre-delay, huit prises de réflexions précoces, un diffuseur allpass et un réseau de délai à contre-réaction de 8 lignes avec modulation à trois couches — reconstruit en Web Audio. Aucune installation, aucun compte.",
    "Engine · Amount": "Moteur · Amount",
    "Drag to turn": "Glissez pour tourner",
    "Audio source": "Source audio",
    "Test chord": "Accord de test",
    "Upload audio": "Importer un fichier",
    "Microphone": "Microphone",
    "Trigger a chord synthesized right here in the browser and listen to how the tail wraps around it.":
      "Déclenchez un accord synthétisé directement dans le navigateur et écoutez comment la traîne l'enveloppe.",
    "Minor chord": "Accord mineur",
    "Major chord": "Accord majeur",
    "Short pulse": "Impulsion courte",
    "📁 Click to choose an audio file — it will loop": "📁 Cliquez pour choisir un fichier audio — il sera joué en boucle",
    "Use your microphone as a live source. Your browser will ask for permission.":
      "Utilisez votre microphone comme source en direct. Votre navigateur demandera une autorisation.",
    "Enable microphone": "Activer le microphone",
    "Disable microphone": "Désactiver le microphone",
    "■ Stop": "■ Arrêter",
    "Engine idle": "Moteur à l'arrêt",
    "Playing chord…": "Lecture de l'accord…",
    "Playing:": "Lecture :",
    "could not decode this file": "impossible de décoder ce fichier",
    "Microphone live": "Microphone actif",
    "Could not access microphone": "Impossible d'accéder au microphone",
    "Audio failed to start — reload the page": "Le moteur audio n'a pas démarré — rechargez la page",
    "A JavaScript reconstruction of EvoraVerb's engine (Web Audio, AudioWorklet), not the plugin binary itself — built so you can hear the design before you install the real thing. Needs a browser with Web Audio support (Chrome, Edge, Firefox, recent Safari).":
      "Une reconstruction en JavaScript du moteur d'EvoraVerb (Web Audio, AudioWorklet), pas le binaire du plugin lui-même — conçue pour que vous entendiez le design avant d'installer le vrai plugin. Nécessite un navigateur compatible Web Audio (Chrome, Edge, Firefox, Safari récent).",
    "Read how EvoraVerb works →": "Découvrez comment fonctionne EvoraVerb →",
    "Like what you hear? Get the full VST3 / Audio Unit / Standalone plugin.":
      "Ça vous plaît ? Procurez-vous le plugin complet VST3 / Audio Unit / Standalone."
  });

  extra.de = Object.assign(extra.de || {}, {
    "Live in your browser": "Live in deinem Browser",
    "This runs the actual EvoraVerb design — pre-delay, eight-tap early reflections, an allpass diffuser and an 8-line feedback delay network with three-layer modulation — rebuilt in Web Audio. No install, no account.":
      "Hier läuft das echte EvoraVerb-Design — Pre-Delay, acht Early-Reflection-Taps, ein Allpass-Diffusor und ein 8-Linien-Feedback-Delay-Network mit dreischichtiger Modulation — neu gebaut in Web Audio. Keine Installation, kein Konto.",
    "Engine · Amount": "Engine · Amount",
    "Drag to turn": "Zum Drehen ziehen",
    "Audio source": "Audioquelle",
    "Test chord": "Test-Akkord",
    "Upload audio": "Audio hochladen",
    "Microphone": "Mikrofon",
    "Trigger a chord synthesized right here in the browser and listen to how the tail wraps around it.":
      "Löse einen direkt im Browser synthetisierten Akkord aus und höre, wie der Nachhall ihn umhüllt.",
    "Minor chord": "Moll-Akkord",
    "Major chord": "Dur-Akkord",
    "Short pulse": "Kurzer Impuls",
    "📁 Click to choose an audio file — it will loop": "📁 Klicken, um eine Audiodatei auszuwählen — sie wird in Schleife abgespielt",
    "Use your microphone as a live source. Your browser will ask for permission.":
      "Nutze dein Mikrofon als Live-Quelle. Dein Browser fragt nach Erlaubnis.",
    "Enable microphone": "Mikrofon aktivieren",
    "Disable microphone": "Mikrofon deaktivieren",
    "■ Stop": "■ Stopp",
    "Engine idle": "Engine im Leerlauf",
    "Playing chord…": "Akkord wird abgespielt…",
    "Playing:": "Wiedergabe:",
    "could not decode this file": "diese Datei konnte nicht dekodiert werden",
    "Microphone live": "Mikrofon aktiv",
    "Could not access microphone": "Zugriff auf das Mikrofon nicht möglich",
    "Audio failed to start — reload the page": "Audio-Engine konnte nicht starten — Seite neu laden",
    "A JavaScript reconstruction of EvoraVerb's engine (Web Audio, AudioWorklet), not the plugin binary itself — built so you can hear the design before you install the real thing. Needs a browser with Web Audio support (Chrome, Edge, Firefox, recent Safari).":
      "Eine JavaScript-Nachbildung der EvoraVerb-Engine (Web Audio, AudioWorklet), nicht das Plugin selbst — damit du das Design hören kannst, bevor du das echte Plugin installierst. Erfordert einen Browser mit Web-Audio-Unterstützung (Chrome, Edge, Firefox, aktuelles Safari).",
    "Read how EvoraVerb works →": "Lies, wie EvoraVerb funktioniert →",
    "Like what you hear? Get the full VST3 / Audio Unit / Standalone plugin.":
      "Gefällt dir, was du hörst? Hol dir das vollständige VST3-/Audio-Unit-/Standalone-Plugin."
  });

  extra.it = Object.assign(extra.it || {}, {
    "Live in your browser": "Dal vivo, nel tuo browser",
    "This runs the actual EvoraVerb design — pre-delay, eight-tap early reflections, an allpass diffuser and an 8-line feedback delay network with three-layer modulation — rebuilt in Web Audio. No install, no account.":
      "Qui gira il vero motore di EvoraVerb — pre-delay, otto prese di riflessioni precoci, un diffusore allpass e una rete di delay in retroazione a 8 linee con modulazione a tre livelli — ricostruito in Web Audio. Nessuna installazione, nessun account.",
    "Engine · Amount": "Motore · Amount",
    "Drag to turn": "Trascina per ruotare",
    "Audio source": "Sorgente audio",
    "Test chord": "Accordo di prova",
    "Upload audio": "Carica audio",
    "Microphone": "Microfono",
    "Trigger a chord synthesized right here in the browser and listen to how the tail wraps around it.":
      "Attiva un accordo sintetizzato direttamente nel browser e ascolta come la coda lo avvolge.",
    "Minor chord": "Accordo minore",
    "Major chord": "Accordo maggiore",
    "Short pulse": "Impulso breve",
    "📁 Click to choose an audio file — it will loop": "📁 Clicca per scegliere un file audio — verrà riprodotto in loop",
    "Use your microphone as a live source. Your browser will ask for permission.":
      "Usa il microfono come sorgente dal vivo. Il browser chiederà l'autorizzazione.",
    "Enable microphone": "Attiva microfono",
    "Disable microphone": "Disattiva microfono",
    "■ Stop": "■ Stop",
    "Engine idle": "Motore fermo",
    "Playing chord…": "Riproduzione accordo…",
    "Playing:": "Riproduzione:",
    "could not decode this file": "impossibile decodificare questo file",
    "Microphone live": "Microfono attivo",
    "Could not access microphone": "Impossibile accedere al microfono",
    "Audio failed to start — reload the page": "Il motore audio non si è avviato — ricarica la pagina",
    "A JavaScript reconstruction of EvoraVerb's engine (Web Audio, AudioWorklet), not the plugin binary itself — built so you can hear the design before you install the real thing. Needs a browser with Web Audio support (Chrome, Edge, Firefox, recent Safari).":
      "Una ricostruzione in JavaScript del motore di EvoraVerb (Web Audio, AudioWorklet), non il binario del plugin — pensata per farti ascoltare il design prima di installare quello vero. Richiede un browser con supporto Web Audio (Chrome, Edge, Firefox, Safari recente).",
    "Read how EvoraVerb works →": "Scopri come funziona EvoraVerb →",
    "Like what you hear? Get the full VST3 / Audio Unit / Standalone plugin.":
      "Ti piace quello che senti? Prendi il plugin completo VST3 / Audio Unit / Standalone."
  });
})(window.EXTRA_TRANSLATIONS);
