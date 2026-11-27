// Traducciones de la pagina de ODD ESSENTIALS.
// Se carga ANTES de i18n.js, que las fusiona con las suyas.
// Los nombres de los plugins, de los presets y de los DAW se dejan en ingles.
(function () {
  // [ingles, es, fr, de, it]
  var filas = [
    ["Free plugin bundle", "Bundle de plugins gratis", "Pack de plugins gratuit", "Gratis-Plugin-Bundle", "Bundle di plugin gratuito"],
    // anuncio del bundle en la portada
    ["Free bundle", "Bundle gratis", "Pack gratuit", "Gratis-Bundle", "Bundle gratis"],
    ["Four free plugins, one bundle", "Cuatro plugins gratis en un bundle", "Quatre plugins gratuits en un pack", "Vier Gratis-Plugins in einem Bundle", "Quattro plugin gratis in un bundle"],
    ["Four essential tools with one shared character: distortion, reverb, bus compression and tempo delay.", "Cuatro herramientas esenciales con un mismo carácter: distorsión, reverb, compresión de bus y delay a tempo.", "Quatre outils essentiels au caractère commun : distorsion, réverbe, compression de bus et delay synchronisé.", "Vier essenzielle Werkzeuge mit einem gemeinsamen Charakter: Verzerrung, Reverb, Bus-Kompression und Tempo-Delay.", "Quattro strumenti essenziali con un carattere comune: distorsione, riverbero, compressione di bus e delay a tempo."],
    ["Plugins are installed on a computer. Save this link and open it on your PC or Mac.", "Los plugins se instalan en un ordenador. Guarda este enlace y ábrelo en tu PC o Mac.", "Les plugins s'installent sur un ordinateur. Gardez ce lien et ouvrez-le sur votre PC ou Mac.", "Plugins werden am Computer installiert. Speichere diesen Link und öffne ihn am PC oder Mac.", "I plugin si installano su un computer. Salva questo link e aprilo sul tuo PC o Mac."],
    ["Copy link", "Copiar enlace", "Copier le lien", "Link kopieren", "Copia il link"],
    ["Send it to my email", "Enviármelo por correo", "Me l'envoyer par e-mail", "Per E-Mail an mich senden", "Inviamelo per e-mail"],
    ["Copied", "Copiado", "Copié", "Kopiert", "Copiato"],
    ["Select and copy", "Selecciona y copia", "Sélectionnez et copiez", "Markieren und kopieren", "Seleziona e copia"],
    ["Download for Windows", "Descargar para Windows", "Télécharger pour Windows", "Für Windows laden", "Scarica per Windows"],
    ["Download for macOS", "Descargar para macOS", "Télécharger pour macOS", "Für macOS laden", "Scarica per macOS"],
    ["VST3 · 64-bit · 17 MB", "VST3 · 64 bits · 17 MB", "VST3 · 64 bits · 17 Mo", "VST3 · 64 Bit · 17 MB", "VST3 · 64 bit · 17 MB"],
    ["VST3 + AU · 40 MB", "VST3 + AU · 40 MB", "VST3 + AU · 40 Mo", "VST3 + AU · 40 MB", "VST3 + AU · 40 MB"],
    ["Free · No account · No license key", "Gratis · Sin cuenta · Sin licencia", "Gratuit · Sans compte · Sans clé", "Gratis · Ohne Konto · Ohne Lizenzschlüssel", "Gratis · Senza account · Senza licenza"],
    ["Free checkout: your download link arrives by email", "Pedido a 0 €: el enlace de descarga te llega por correo", "Commande à 0 € : le lien de téléchargement arrive par e-mail", "Bestellung für 0 €: Der Download-Link kommt per E-Mail", "Ordine a 0 €: il link per il download arriva via e-mail"],
    ["plugins", "plugins", "plugins", "Plugins", "plugin"],
    ["presets", "presets", "presets", "Presets", "preset"],
    ["formats", "formatos", "formats", "Formate", "formati"],
    ["Windows 10+ and macOS 11+", "Windows 10+ y macOS 11+", "Windows 10+ et macOS 11+", "Ab Windows 10 und macOS 11", "Windows 10+ e macOS 11+"],
    ["Distortion", "Distorsión", "Distorsion", "Verzerrung", "Distorsione"],
    ["Reverb", "Reverb", "Réverbe", "Reverb", "Riverbero"],
    ["Bus compressor", "Compresor de bus", "Compresseur de bus", "Bus-Kompressor", "Compressore di bus"],
    ["Tempo delay", "Delay a tempo", "Delay synchronisé", "Tempo-Delay", "Delay a tempo"],
    ["Warmth, grit or total burn.", "Calidez, mordiente o fuego total.", "Chaleur, grain ou surchauffe totale.", "Wärme, Biss oder volle Zerstörung.", "Calore, grinta o distorsione totale."],
    ["A saturation that stays musical from the first percent to the last, with the output level compensated so you judge the tone and not the volume.", "Una saturación musical del primer al último punto, con el volumen compensado para que juzgues el sonido y no el nivel.", "Une saturation musicale du premier au dernier cran, avec le niveau compensé pour juger le son et non le volume.", "Eine Sättigung, die vom ersten bis zum letzten Prozent musikalisch bleibt, mit Pegelausgleich: Du beurteilst den Klang, nicht die Lautstärke.", "Una saturazione musicale dal primo all'ultimo punto, con volume compensato per giudicare il suono e non il livello."],
    ["4x oversampled saturation", "Saturación con sobremuestreo 4x", "Saturation suréchantillonnée 4x", "4-fach überabgetastete Sättigung", "Saturazione con sovracampionamento 4x"],
    ["Level compensation", "Compensación de volumen", "Compensation de niveau", "Pegelausgleich", "Compensazione del volume"],
    ["Mix control for parallel distortion", "Control de mezcla para distorsión paralela", "Réglage Mix pour la distorsion parallèle", "Mix-Regler für parallele Verzerrung", "Controllo Mix per la distorsione parallela"],
    ["Space for anything that sounds dry.", "Espacio para todo lo que suena seco.", "De l'espace pour tout ce qui sonne sec.", "Raum für alles, was trocken klingt.", "Spazio per tutto ciò che suona secco."],
    ["From a tight vocal booth to a wide open hall. Two knobs shape the room, and tone decides how bright the tail comes back.", "De una cabina de voz ajustada a una gran sala. Dos mandos dan forma al espacio y el tono decide lo brillante que vuelve la cola.", "D'une cabine de voix à une grande salle. Deux boutons façonnent l'espace et la tonalité règle la brillance de la queue.", "Von der engen Gesangskabine bis zur weiten Halle. Zwei Regler formen den Raum, der Klangregler bestimmt die Helligkeit der Hallfahne.", "Dalla cabina voce a una grande sala. Due manopole modellano lo spazio e il tono decide quanto è brillante la coda."],
    ["Tails from 0.4 to 5 seconds", "Colas de 0,4 a 5 segundos", "Queues de 0,4 à 5 secondes", "Hallfahnen von 0,4 bis 5 Sekunden", "Code da 0,4 a 5 secondi"],
    ["Pre-delay and width follow the room size", "El pre-delay y la anchura siguen al tamaño", "Pré-delay et largeur suivent la taille", "Pre-Delay und Breite folgen der Raumgröße", "Pre-delay e ampiezza seguono la dimensione"],
    ["Tone control for dark or bright rooms", "Control de tono para salas oscuras o brillantes", "Tonalité pour des salles sombres ou brillantes", "Klangregler für dunkle oder helle Räume", "Controllo del tono per sale scure o brillanti"],
    ["One knob to hold it together.", "Un mando para que todo suene junto.", "Un bouton pour tout souder.", "Ein Regler, der alles zusammenhält.", "Una manopola per tenere tutto insieme."],
    ["Glue moves threshold and ratio at once, so a drum group or a whole mix settles into place without menus or guesswork.", "Glue mueve umbral y ratio a la vez, para que un grupo de batería o una mezcla entera se asienten sin menús ni adivinanzas.", "Glue règle seuil et ratio en même temps : un groupe de batterie ou un mix entier se met en place sans menus ni tâtonnements.", "Glue bewegt Threshold und Ratio gleichzeitig, sodass Drumgruppe oder ganzer Mix ohne Menüs und Rätselraten zusammenfinden.", "Glue muove soglia e rapporto insieme: un gruppo di batteria o un intero mix si assestano senza menu né tentativi."],
    ["Low end ignored by the detector below 90 Hz", "El detector ignora los graves por debajo de 90 Hz", "Le détecteur ignore les graves sous 90 Hz", "Der Detektor ignoriert Bässe unter 90 Hz", "Il rilevatore ignora i bassi sotto 90 Hz"],
    ["Stereo-linked with automatic release", "Estéreo enlazado y release automático", "Stéréo liée et relâchement automatique", "Stereo-Link und automatisches Release", "Stereo collegato e rilascio automatico"],
    ["Mix control for parallel compression", "Control de mezcla para compresión paralela", "Réglage Mix pour la compression parallèle", "Mix-Regler für parallele Kompression", "Controllo Mix per la compressione parallela"],
    ["Repeats that follow your song.", "Repeticiones que siguen tu canción.", "Des répétitions qui suivent votre morceau.", "Wiederholungen, die deinem Song folgen.", "Ripetizioni che seguono il tuo brano."],
    ["A tape-style delay locked to your project tempo. Each repeat gets darker and softer, and changing the time bends the sound instead of clicking.", "Un delay tipo cinta ajustado al tempo del proyecto. Cada repetición es más oscura y suave, y al cambiar el tiempo el sonido se estira sin chasquidos.", "Un delay façon bande calé sur le tempo. Chaque répétition devient plus sombre et plus douce, et changer le temps étire le son sans clic.", "Ein Delay im Bandstil, synchron zum Projekttempo. Jede Wiederholung wird dunkler und leiser; Zeitänderungen biegen den Klang, statt zu knacken.", "Un delay in stile nastro agganciato al tempo. Ogni ripetizione è più scura e morbida, e cambiando tempo il suono si piega senza click."],
    ["Nine note values from 1/16 to 1/2", "Nueve figuras de 1/16 a 1/2", "Neuf valeurs de note, de 1/16 à 1/2", "Neun Notenwerte von 1/16 bis 1/2", "Nove valori di nota da 1/16 a 1/2"],
    ["Filtered and saturated tape-style repeats", "Repeticiones filtradas y saturadas, tipo cinta", "Répétitions filtrées et saturées façon bande", "Gefilterte, gesättigte Wiederholungen im Bandstil", "Ripetizioni filtrate e sature in stile nastro"],
    ["Smooth time changes", "Cambios de tiempo suaves", "Changements de temps fluides", "Weiche Zeitänderungen", "Cambi di tempo morbidi"],
    ["Presets", "Presets", "Presets", "Presets", "Preset"],
    ["Four plugins. Zero cost.", "Cuatro plugins. Cero euros.", "Quatre plugins. Zéro euro.", "Vier Plugins. Null Euro.", "Quattro plugin. Zero euro."],
    ["Download the bundle and put it to work on your next session.", "Descarga el bundle y ponlo a trabajar en tu próxima sesión.", "Téléchargez le pack et mettez-le au travail dès votre prochaine session.", "Lade das Bundle und nutze es in deiner nächsten Session.", "Scarica il bundle e usalo nella tua prossima sessione."],
    ["Version 1.0.0 · Installation guide included in the download", "Versión 1.0.0 · La descarga incluye la guía de instalación", "Version 1.0.0 · Guide d'installation inclus", "Version 1.0.0 · Installationsanleitung enthalten", "Versione 1.0.0 · Guida all'installazione inclusa"]
  ];
  var idiomas = ["es", "fr", "de", "it"];
  window.EXTRA_TRANSLATIONS = {};
  idiomas.forEach(function (idioma, i) {
    var tabla = window.EXTRA_TRANSLATIONS[idioma] = {};
    filas.forEach(function (fila) { tabla[fila[0]] = fila[i + 1]; });
  });
})();
