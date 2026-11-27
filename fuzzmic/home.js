// Boton "Download Free" de la franja de la portada: mete FUZZMIC (0 EUR) en el
// carrito de la tienda; si la tienda no responde, abre la pagina del producto.
// El producto es el mismo de fuzzmic/store.js.
(function () {
    var ID = '15810634744132';
    var URL_TIENDA = 'https://bdf1pk-21.myshopify.com/products/fuzzmic-lo-fi-microphone-distortion';
    var ocupado = false;

    document.querySelectorAll('[data-fm-get]').forEach(function (boton) {
        boton.addEventListener('click', function () {
            if (ocupado) return;
            ocupado = true;
            boton.setAttribute('aria-busy', 'true');
            // que el aviso de bienvenida no salte por encima del carrito
            var popup = document.querySelector('[data-welcome-popup]');
            if (popup) popup.remove();
            var hecho = false;
            function terminar(fallo) {
                if (hecho) return;
                hecho = true;
                ocupado = false;
                clearTimeout(espera);
                boton.removeAttribute('aria-busy');
                if (fallo) window.location.href = URL_TIENDA;
            }
            var espera = setTimeout(function () { terminar(true); }, 8000);
            if (!window.ikAddToCart) return terminar(true);
            window.ikAddToCart(ID).then(function () { terminar(false); }, function () { terminar(true); });
        });
    });
})();
