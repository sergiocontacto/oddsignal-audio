// Comun a todas las paginas: menu de la cabecera y boton "Obtener infinityKits".
(function () {
    // Cuando infinityKits este a la venta o se pueda descargar, pon aqui la
    // direccion y todos los botones "Obtener" llevaran a ella. Vacio = se
    // abre la ventana para dejar el email.
    var INFINITYKITS_URL = 'https://bdf1pk-21.myshopify.com/products/infinitykits-song-to-drum-kit-sampler';
    // Producto de la tienda: con el, los botones abren el carrito en la propia
    // web; la direccion de arriba queda de respaldo si Shopify no responde.
    var INFINITYKITS_PRODUCT_ID = '15806866293060';

    var desktop = window.matchMedia('(min-width: 1100px)');

    /* ---------- menu ---------- */
    var nav = document.getElementById('ik-nav');
    var burger = document.querySelector('.ik-burger');
    var drops = Array.prototype.slice.call(document.querySelectorAll('.ik-drop'));

    function setDrop(drop, open) {
        drop.classList.toggle('is-open', open);
        drop.querySelector('button').setAttribute('aria-expanded', String(open));
    }
    function closeDrops(except) {
        drops.forEach(function (d) { if (d !== except) setDrop(d, false); });
    }
    function setMenu(open) {
        nav.classList.toggle('is-open', open);
        burger.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('ik-menu-open', open);
        if (!open) closeDrops();
    }
    // la portada lo usa al saltar entre diapositivas
    window.ikCloseMenu = function () { setMenu(false); };

    drops.forEach(function (drop) {
        var button = drop.querySelector('button');
        var openedByHover = 0;
        button.addEventListener('click', function () {
            var open = !drop.classList.contains('is-open');
            // si el raton acaba de abrirlo, el clic no debe cerrarlo
            if (!open && Date.now() - openedByHover < 600) return;
            if (desktop.matches) closeDrops(drop);
            setDrop(drop, open);
        });
        drop.addEventListener('pointerenter', function (e) {
            if (!desktop.matches || e.pointerType !== 'mouse') return;
            openedByHover = Date.now();
            closeDrops(drop);
            setDrop(drop, true);
        });
        drop.addEventListener('pointerleave', function (e) {
            if (desktop.matches && e.pointerType === 'mouse') setDrop(drop, false);
        });
        drop.addEventListener('focusout', function (e) {
            if (desktop.matches && !drop.contains(e.relatedTarget)) setDrop(drop, false);
        });
    });

    burger.addEventListener('click', function () {
        setMenu(!nav.classList.contains('is-open'));
    });
    document.addEventListener('click', function (e) {
        if (desktop.matches && !e.target.closest('.ik-drop')) closeDrops();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (nav.classList.contains('is-open')) { setMenu(false); burger.focus(); }
        closeDrops();
    });
    desktop.addEventListener('change', function () { setMenu(false); });

    var lang = document.querySelector('[data-ik-lang]');
    if (lang) {
        lang.value = currentLang;
        lang.addEventListener('change', function () {
            localStorage.setItem('selectedLang', lang.value);
            location.reload();
        });
    }

    /* ---------- obtener infinityKits ---------- */
    var modal = document.getElementById('ik-modal');

    // buy-button.js ya viene en las paginas con productos; en el resto se
    // carga al pulsar el boton.
    function loadCart() {
        if (window.ikAddToCart) return Promise.resolve();
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src = 'buy-button.js?v=10';
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    var adding = false;
    function openCart() {
        if (adding) return;
        adding = true;
        document.body.style.cursor = 'progress';
        var settled = false;
        function finish(failed) {
            if (settled) return;
            settled = true;
            adding = false;
            clearTimeout(timer);
            document.body.style.cursor = '';
            if (failed) window.location.href = INFINITYKITS_URL;
        }
        var timer = setTimeout(function () { finish(true); }, 8000);
        loadCart()
            .then(function () { return window.ikAddToCart(INFINITYKITS_PRODUCT_ID); })
            .then(function () { finish(false); }, function () { finish(true); });
    }

    document.querySelectorAll('[data-ik-get]').forEach(function (button) {
        button.addEventListener('click', function () {
            setMenu(false);
            // que el aviso de bienvenida no salte por encima
            var popup = document.querySelector('[data-welcome-popup]');
            if (popup) popup.remove();
            if (INFINITYKITS_URL) openCart();
            else modal.showModal();
        });
    });
    modal.querySelector('.ik-modal__close').addEventListener('click', function () { modal.close(); });
    modal.addEventListener('click', function (e) {
        if (e.target !== modal) return;
        var r = modal.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) modal.close();
    });
})();
