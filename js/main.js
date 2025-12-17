window.TransLamps = window.TransLamps || {};
window.TransLamps.utils = window.TransLamps.utils || {};
window.TransLamps.projects = window.TransLamps.projects || {};

window.TransLamps.utils = {
    hideLoading: function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                loadingScreen.style.display = 'none';
            }, 700);
        }
    },

    openBuyModal: function(productName) {
        const modal = document.getElementById('buyModal') || document.getElementById('modal-buy');
        const productInput = document.getElementById('product');
        if (modal && productInput) {
            productInput.value = productName;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    },

    closeModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },

    handleBuyForm: function(event) {
        event.preventDefault();
        const form = event.target;
        const name = form.querySelector('[name="name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();

        if (!name || !email) {
            alert('Пожалуйста, заполните обязательные поля.');
            return;
        }

        alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
        form.reset();

        const modal = form.closest('.modal') || form.closest('[id*="modal"]');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },

    handleContactForm: function(event) {
        event.preventDefault();
        const form = event.target;
        const name = form.querySelector('[name="name"]').value.trim();
        const email = form.querySelector('[name="email"]').value.trim();
        const message = form.querySelector('[name="message"]').value.trim();

        if (!name || !email || !message) {
            alert('Пожалуйста, заполните обязательные поля.');
            return;
        }

        alert('Ваше сообщение отправлено! Мы свяжемся с вами в течение рабочего дня.');
        form.reset();
    },

    filterCatalog: function(filter) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
            }
        });

        document.querySelectorAll('[data-category-section]').forEach(section => {
            if (filter === 'all' || section.getAttribute('data-category-section') === filter) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });

        document.querySelectorAll('.product-card[data-category]').forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    window.TransLamps.utils.hideLoading();

    document.querySelectorAll('[data-buy]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.getAttribute('data-buy') || this.getAttribute('data-product');
            window.TransLamps.utils.openBuyModal(productName);
        });
    });

    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.getAttribute('data-product');
            window.TransLamps.utils.openBuyModal(productName);
        });
    });

    document.querySelectorAll('.close, .btn-close, [data-bs-dismiss="modal"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal') || this.closest('[id*="modal"]');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    document.querySelectorAll('.modal, [id*="modal"]').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    const buyForm = document.getElementById('buy-form');
    if (buyForm) {
        buyForm.addEventListener('submit', window.TransLamps.utils.handleBuyForm);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', window.TransLamps.utils.handleContactForm);
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            window.TransLamps.utils.filterCatalog(filter);
        });
    });

    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const icon = this.querySelector('span:last-child');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            document.querySelectorAll('.faq-header').forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    const otherIcon = otherHeader.querySelector('span:last-child');
                    if (otherIcon) otherIcon.textContent = '+';
                }
            });
            if (icon) {
                icon.textContent = isExpanded ? '+' : '−';
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            const isVisible = mobileNav.style.display === 'flex';
            if (isVisible) {
                mobileNav.style.display = 'none';
                mobileMenuToggle.innerHTML = '☰ Меню';
                mobileMenuToggle.setAttribute('aria-label', 'Открыть меню');
            } else {
                mobileNav.style.display = 'flex';
                mobileMenuToggle.innerHTML = '✕ Закрыть';
                mobileMenuToggle.setAttribute('aria-label', 'Закрыть меню');
            }
        });

        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.style.display = 'none';
                mobileMenuToggle.innerHTML = '☰ Меню';
                mobileMenuToggle.setAttribute('aria-label', 'Открыть меню');
            });
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 992) {
                mobileNav.style.display = 'none';
                mobileMenuToggle.innerHTML = '☰ Меню';
                mobileMenuToggle.setAttribute('aria-label', 'Открыть меню');
            }
        });
    }
});

window.closeModal = function(modalId) {
    window.TransLamps.utils.closeModal(modalId || 'buyModal');
};

window.openBuyModal = function(productName) {
    window.TransLamps.utils.openBuyModal(productName);
};