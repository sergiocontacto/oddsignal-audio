// ========================================
// IMAGE GALLERY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Gallery functionality
    const galleryDots = document.querySelectorAll('.gallery-dot');
    const showcaseImages = document.querySelectorAll('.showcase-image');

    galleryDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = this.getAttribute('data-slide');

            // Update images
            showcaseImages.forEach(img => img.classList.remove('active'));
            showcaseImages[slideIndex].classList.add('active');

            // Update dots
            galleryDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const activeImage = document.querySelector('.showcase-image.active');
        if (!activeImage) return;

        const currentIndex = Array.from(showcaseImages).indexOf(activeImage);
        let nextIndex;

        if (e.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % showcaseImages.length;
            galleryDots[nextIndex].click();
        } else if (e.key === 'ArrowLeft') {
            nextIndex = (currentIndex - 1 + showcaseImages.length) % showcaseImages.length;
            galleryDots[nextIndex].click();
        }
    });
});

// ========================================
// NAVIGATION ACTIVE STATE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Add fade-in animation on load
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s both`;
    });
});

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// OBSERVER FOR FADE-IN ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .value-card, .about-content').forEach(el => {
    observer.observe(el);
});

// ========================================
// EMAIL LINK HANDLING
// ========================================

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Allow default behavior
        return true;
    });
});

// ========================================
// BUTTON DOWNLOAD ACTION
// ========================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('DOWNLOAD')) {
            // Could trigger download or navigation
            // For now, just provide feedback
            console.log('Download initiated for:', this.closest('.product-card')?.querySelector('.product-name')?.textContent);
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

let lastScrollPosition = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScrollPosition = currentScrollPosition;
});

// ========================================
// LANGUAGE SELECTOR
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function(e) {
            I18n.setLanguage(e.target.value);
        });
    }
});