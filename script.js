// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('nav__menu--active');
        navToggle.classList.toggle('nav__toggle--active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('nav__menu--active');
            navToggle.classList.remove('nav__toggle--active');
        });
    });
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#header') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Sticky Header =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Accordion Functionality =====
const accordionHeaders = document.querySelectorAll('.accordion__header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        const accordionItem = header.closest('.accordion__item');
        const content = accordionItem.querySelector('.accordion__content');
        
        // Close all other accordions
        accordionHeaders.forEach(otherHeader => {
            if (otherHeader !== header) {
                otherHeader.setAttribute('aria-expanded', 'false');
                const otherItem = otherHeader.closest('.accordion__item');
                const otherContent = otherItem.querySelector('.accordion__content');
                otherContent.style.maxHeight = null;
            }
        });
        
        // Toggle current accordion
        if (isExpanded) {
            header.setAttribute('aria-expanded', 'false');
            content.style.maxHeight = null;
        } else {
            header.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});

// ===== Form Validation =====
const ctaForm = document.getElementById('cta-form');
const phoneInput = document.getElementById('phone');

// Indian phone number validation
function validateIndianPhone(phone) {
    // Remove all non-digit characters except +
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Patterns: +91XXXXXXXXXX, 91XXXXXXXXXX, 0XXXXXXXXXX, XXXXXXXXXX
    const patterns = [
        /^\+91[6-9]\d{9}$/,      // +91XXXXXXXXXX
        /^91[6-9]\d{9}$/,        // 91XXXXXXXXXX
        /^0[6-9]\d{9}$/,         // 0XXXXXXXXXX
        /^[6-9]\d{9}$/           // XXXXXXXXXX (10 digits starting with 6-9)
    ];
    
    return patterns.some(pattern => pattern.test(cleaned));
}

// Format phone number as user types
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
        
        // Auto-add +91 if user starts typing without it
        if (value.length > 0 && !value.startsWith('91') && !value.startsWith('0')) {
            if (value.length <= 10) {
                value = '91' + value;
            }
        }
        
        // Format: +91-XXX-XXX-XXXX
        if (value.length > 2) {
            value = '+' + value.substring(0, 2) + '-' + value.substring(2);
        }
        if (value.length > 7) {
            value = value.substring(0, 7) + '-' + value.substring(7);
        }
        if (value.length > 11) {
            value = value.substring(0, 11) + '-' + value.substring(11, 15);
        }
        
        e.target.value = value;
    });
    
    phoneInput.addEventListener('blur', (e) => {
        if (e.target.value && !validateIndianPhone(e.target.value)) {
            e.target.setCustomValidity('Please enter a valid Indian phone number (10 digits starting with 6-9)');
            e.target.classList.add('form__input--error');
        } else {
            e.target.setCustomValidity('');
            e.target.classList.remove('form__input--error');
        }
    });
    
    phoneInput.addEventListener('input', () => {
        phoneInput.classList.remove('form__input--error');
    });
}

// Form submission
if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate phone number
        const phone = phoneInput.value;
        if (!validateIndianPhone(phone)) {
            phoneInput.focus();
            phoneInput.setCustomValidity('Please enter a valid Indian phone number');
            phoneInput.reportValidity();
            return;
        }
        
        // Get form data
        const formData = {
            parentName: document.getElementById('parent-name').value,
            phone: phone,
            relationship: document.getElementById('relationship').value,
            language: document.getElementById('language').value,
            callTime: document.getElementById('call-time').value
        };
        
        // Show success message (in real app, this would send to server)
        showFormSuccess(formData);
        
        // Reset form
        ctaForm.reset();
    });
}

// Show form success message
function showFormSuccess(data) {
    const form = document.getElementById('cta-form');
    const successMessage = document.createElement('div');
    successMessage.className = 'form__success';
    successMessage.innerHTML = `
        <div style="background: #4CAF50; color: white; padding: 1.5rem; border-radius: 12px; text-align: center; margin-top: 1rem;">
            <h3 style="margin-bottom: 0.5rem; font-size: 1.5rem;">✓ Thank You!</h3>
            <p style="margin: 0;">We've received your request. Our team will call you within 24 hours to set up your free trial.</p>
            <p style="margin-top: 0.5rem; font-size: 0.9rem; opacity: 0.9;">Expected call: ${data.phone}</p>
        </div>
    `;
    
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Remove success message after 10 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 10000);
}

// ===== WhatsApp Share =====
const whatsappShareBtn = document.getElementById('whatsapp-share');

if (whatsappShareBtn) {
    whatsappShareBtn.addEventListener('click', () => {
        const text = encodeURIComponent(
            'Hi! I found this amazing service called Sakha - a digital companion for Indian seniors. ' +
            'It provides daily wellness check-ins, medicine reminders, and social companionship. ' +
            'Check it out: ' + window.location.href
        );
        const whatsappUrl = `https://wa.me/?text=${text}`;
        window.open(whatsappUrl, '_blank');
    });
}

// ===== Click-to-Call =====
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Analytics tracking could go here
        console.log('Call initiated:', link.getAttribute('href'));
    });
});

// ===== Lazy Loading Images (for future image implementation) =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Scroll Progress Indicator (Optional Enhancement) =====
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #FF6B35, #FF9933);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Uncomment to enable scroll progress bar
// createScrollProgress();

// ===== Testimonials Carousel (Optional Enhancement) =====
function initTestimonialsCarousel() {
    const testimonialsGrid = document.querySelector('.testimonials__grid');
    if (!testimonialsGrid || window.innerWidth > 767) return;
    
    let currentIndex = 0;
    const testimonials = Array.from(testimonialsGrid.children);
    const total = testimonials.length;
    
    // Hide all except first
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });
    
    // Auto-rotate every 5 seconds
    setInterval(() => {
        testimonials[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % total;
        testimonials[currentIndex].style.display = 'block';
    }, 5000);
}

// Uncomment to enable testimonials carousel on mobile
// initTestimonialsCarousel();

// ===== Form Field Focus Enhancement =====
document.querySelectorAll('.form__input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('form__group--focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('form__group--focused');
        }
    });
    
    // Check if field has value on load
    if (input.value) {
        input.parentElement.classList.add('form__group--focused');
    }
});

// ===== Accessibility: Skip to Main Content =====
const skipLink = document.createElement('a');
skipLink.href = '#hero';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #FF6B35;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10001;
`;
skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});
skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ===== Performance: Debounce Scroll Events =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    // Scroll-based animations or tracking can go here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ===== Console Welcome Message =====
console.log('%c❤️ Welcome to Sakha!', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%cआपका साथी • Your Companion', 'color: #FF9933; font-size: 14px;');

