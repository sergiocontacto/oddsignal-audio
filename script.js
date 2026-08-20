// ========================================
// SCROLL-DRIVEN ANIMATIONS & PARALLAX
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect on hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }

    // Scroll animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card, .product-card, .value-card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(el);
    });

    // Mouse move effect for 3D perspective
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        document.addEventListener('mousemove', (e) => {
            const rect = heroImage.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            heroImage.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
        });

        document.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }
});

// ========================================
// NAVIGATION ACTIVE STATE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
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
// CUSTOM CURSOR
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Enhance button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><circle cx=%2210%22 cy=%2210%22 r=%223%22 fill=%22%23d44427%22/><circle cx=%2210%22 cy=%2210%22 r=%228%22 fill=%22none%22 stroke=%22%23d44427%22 stroke-width=%221%22 opacity=%220.7%22/></svg>") 10 10, auto';
        });

        btn.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><circle cx=%2210%22 cy=%2210%22 r=%223%22 fill=%22%23c43216%22/><circle cx=%2210%22 cy=%2210%22 r=%228%22 fill=%22none%22 stroke=%22%23c43216%22 stroke-width=%221%22 opacity=%220.5%22/></svg>") 10 10, auto';
        });
    });

    // Hover effects on links
    const links = document.querySelectorAll('a:not(.btn)');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><circle cx=%2210%22 cy=%2210%22 r=%223%22 fill=%22%23d44427%22/></svg>") 10 10, auto';
        });

        link.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><circle cx=%2210%22 cy=%2210%22 r=%223%22 fill=%22%23c43216%22/><circle cx=%2210%22 cy=%2210%22 r=%228%22 fill=%22none%22 stroke=%22%23c43216%22 stroke-width=%221%22 opacity=%220.5%22/></svg>") 10 10, auto';
        });
    });
});

// ========================================
// PAGE LOAD ANIMATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// FORM HANDLING (Contact)
// ========================================

if (document.getElementById('contact-form')) {
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);

        // Simple validation
        if (!formData.get('name') || !formData.get('email') || !formData.get('message')) {
            alert('Please fill in all fields');
            return;
        }

        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}
