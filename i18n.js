window.I18n = {
    currentLang: localStorage.getItem('selectedLang') || 'en',

    translations: {
        en: {
            nav_home: "HOME",
            nav_products: "PRODUCTS",
            nav_about: "ABOUT",
            nav_contact: "CONTACT",
            get_free_beta: "Get Free Beta",
            download_beta: "Download Beta"
        },
        es: {
            nav_home: "INICIO",
            nav_products: "PRODUCTOS",
            nav_about: "ACERCA DE",
            nav_contact: "CONTACTO",
            get_free_beta: "Obtener Beta Gratis",
            download_beta: "Descargar Beta"
        },
        fr: {
            nav_home: "ACCUEIL",
            nav_products: "PRODUITS",
            nav_about: "À PROPOS",
            nav_contact: "CONTACT",
            get_free_beta: "Obtenir la Bêta Gratuite",
            download_beta: "Télécharger la Bêta"
        },
        de: {
            nav_home: "STARTSEITE",
            nav_products: "PRODUKTE",
            nav_about: "ÜBER UNS",
            nav_contact: "KONTAKT",
            get_free_beta: "Kostenlose Beta Erhalten",
            download_beta: "Beta Herunterladen"
        },
        it: {
            nav_home: "HOME",
            nav_products: "PRODOTTI",
            nav_about: "CHI SIAMO",
            nav_contact: "CONTATTI",
            get_free_beta: "Ottieni Beta Gratuita",
            download_beta: "Scarica Beta"
        }
    },

    t: function(key) {
        return this.translations[this.currentLang][key] || key;
    },

    update: function() {
        // Update navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            const keys = ['nav_home', 'nav_products', 'nav_about', 'nav_contact'];
            if (keys[index]) {
                link.textContent = this.t(keys[index]);
            }
        });

        // Update buttons in HOME
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        buttons.forEach(btn => {
            if (btn.textContent.toLowerCase().includes('beta')) {
                if (btn.classList.contains('btn-primary')) {
                    btn.textContent = this.t('get_free_beta');
                } else {
                    btn.textContent = this.t('download_beta');
                }
            }
        });

        // Update language selector
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.value = this.currentLang;
        }
    },

    setLanguage: function(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('selectedLang', lang);
            this.update();
        }
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    I18n.update();

    const selector = document.getElementById('language-selector');
    if (selector) {
        selector.addEventListener('change', function(e) {
            I18n.setLanguage(e.target.value);
        });
    }
});
