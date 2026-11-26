// Pagina de ODD ESSENTIALS: pone delante la descarga del sistema del visitante,
// la mete en el carrito de la tienda (0 EUR, alli se cuentan las descargas) y,
// si entra desde el movil, le ofrece guardar el enlace para el ordenador.

// Un producto de Shopify por sistema. "id" es el numero que sale al final de la
// direccion del producto en el panel; "url", su pagina en la tienda, de respaldo
// si el carrito no responde.
window.OE_TIENDA = {
    windows: { id: '15808628261188', url: 'https://bdf1pk-21.myshopify.com/products/odd-essentials-windows' },
    mac: { id: '15808629539140', url: 'https://bdf1pk-21.myshopify.com/products/odd-essentials-macos' }
};

(function () {
    var ua = navigator.userAgent;
    // los iPad recientes se presentan como Mac, pero tienen pantalla tactil
    var movil = /Android|iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    var sistema = movil ? '' : /Macintosh|Mac OS X/.test(ua) ? 'mac' : /Windows/.test(ua) ? 'windows' : '';

    if (sistema) {
        document.querySelectorAll('[data-oe-os="' + sistema + '"]').forEach(function (el) {
            el.classList.add('is-mine');
        });
    }

    // buy-button.js trae el carrito de la tienda; se carga al pulsar.
    function cargarCarrito() {
        if (window.ikAddToCart) return Promise.resolve();
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src = 'buy-button.js?v=10';
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    var ocupado = false;
    function pedir(boton) {
        var producto = window.OE_TIENDA[boton.getAttribute('data-oe-os')];
        if (ocupado || !producto.id) return;
        ocupado = true;
        boton.setAttribute('aria-busy', 'true');
        var hecho = false;
        function terminar(fallo) {
            if (hecho) return;
            hecho = true;
            ocupado = false;
            clearTimeout(espera);
            boton.removeAttribute('aria-busy');
            if (fallo) window.location.href = producto.url;
        }
        var espera = setTimeout(function () { terminar(true); }, 8000);
        cargarCarrito()
            .then(function () { return window.ikAddToCart(producto.id); })
            .then(function () { terminar(false); }, function () { terminar(true); });
    }

    document.querySelectorAll('button[data-oe-os]').forEach(function (boton) {
        boton.addEventListener('click', function () { pedir(boton); });
    });

    var aviso = document.querySelector('[data-oe-mobile]');
    if (movil && aviso) aviso.hidden = false;

    var compartir = document.querySelector('[data-oe-share]');
    if (!compartir) return;
    compartir.addEventListener('click', function () {
        var original = compartir.textContent;
        function responder(texto) {
            var idioma = typeof translations !== 'undefined' && translations[currentLang];
            compartir.textContent = (idioma && idioma[texto]) || texto;
            setTimeout(function () { compartir.textContent = original; }, 1800);
        }
        if (!navigator.clipboard) return responder('Select and copy');
        navigator.clipboard.writeText(location.href.split(/[?#]/)[0]).then(
            function () { responder('Copied'); },
            function () { responder('Select and copy'); }
        );
    });
})();
