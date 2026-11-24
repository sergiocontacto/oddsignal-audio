// Portada: menu, carrusel y boton "Obtener infinityKits".
(function () {
    // Cuando infinityKits este a la venta o se pueda descargar, pon aqui la
    // direccion y todos los botones "Obtener" llevaran a ella. Vacio = se
    // abre la ventana para dejar el email.
    var INFINITYKITS_URL = '';

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

    /* ---------- carrusel ---------- */
    var hero = document.querySelector('.ik-hero');
    var slides = Array.prototype.slice.call(document.querySelectorAll('.ik-slide'));
    var dots = Array.prototype.slice.call(document.querySelectorAll('.ik-dots button'));
    var current = 0;

    function go(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach(function (slide, i) {
            slide.classList.toggle('is-active', i === current);
            slide.inert = i !== current;
        });
        dots.forEach(function (dot, i) {
            dot.classList.toggle('is-active', i === current);
            if (i === current) dot.setAttribute('aria-current', 'true');
            else dot.removeAttribute('aria-current');
        });
    }

    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () { go(i); });
    });
    hero.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') go(current + 1);
        if (e.key === 'ArrowLeft') go(current - 1);
    });

    var startX = null, startY = 0;
    hero.addEventListener('touchstart', function (e) {
        startX = e.touches.length === 1 ? e.touches[0].clientX : null;
        startY = e.touches[0].clientY;
    }, { passive: true });
    hero.addEventListener('touchend', function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        var dy = e.changedTouches[0].clientY - startY;
        startX = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(current + (dx < 0 ? 1 : -1));
    }, { passive: true });

    document.querySelectorAll('[data-ik-go]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            setMenu(false);
            go(Number(link.getAttribute('data-ik-go')));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    /* ---------- obtener infinityKits ---------- */
    var modal = document.getElementById('ik-modal');
    document.querySelectorAll('[data-ik-get]').forEach(function (button) {
        button.addEventListener('click', function () {
            if (INFINITYKITS_URL) { window.location.href = INFINITYKITS_URL; return; }
            setMenu(false);
            // que el aviso de bienvenida no salte por encima
            var popup = document.querySelector('[data-welcome-popup]');
            if (popup) popup.remove();
            modal.showModal();
        });
    });
    modal.querySelector('.ik-modal__close').addEventListener('click', function () { modal.close(); });
    modal.addEventListener('click', function (e) {
        if (e.target !== modal) return;
        var r = modal.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) modal.close();
    });
})();
