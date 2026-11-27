// Portada: carrusel. El menu y el boton "Obtener" estan en site.js.
(function () {
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

    // descargar el bundle abre el carrito: que el aviso de bienvenida no salte encima
    document.querySelectorAll('button[data-oe-os]').forEach(function (button) {
        button.addEventListener('click', function () {
            var popup = document.querySelector('[data-welcome-popup]');
            if (popup) popup.remove();
        });
    });

    document.querySelectorAll('[data-ik-go]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            window.ikCloseMenu();
            go(Number(link.getAttribute('data-ik-go')));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
})();
