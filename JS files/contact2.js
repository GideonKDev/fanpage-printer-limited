// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Contact form submission with popup
    const contactForm = document.getElementById('contactForm');
    const messagePopup = document.getElementById('messagePopup');
    const popupClose = document.querySelector('.popup-close');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showMessagePopup('Error', 'Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showMessagePopup('Error', 'Please enter a valid email address.', 'error');
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Submit to FormSubmit using fetch API
            fetch(this.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    showMessagePopup('Message Sent', 'Thank you for your message! We will get back to you within 24 hours.', 'success');
                    contactForm.reset();
                } else {
                    showMessagePopup('Error', 'There was a problem sending your message. Please try again.', 'error');
                }
            })
            .catch(error => {
                showMessagePopup('Error', 'There was a problem sending your message. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Close popup when clicking close button
    if (popupClose) {
        popupClose.addEventListener('click', function() {
            messagePopup.style.display = 'none';
        });
    }
    
    // Close popup when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === messagePopup) {
            messagePopup.style.display = 'none';
        }
    });
    
    // Function to show message popup
    function showMessagePopup(title, message, type = 'success') {
        const popupContent = messagePopup.querySelector('.popup-content');
        popupContent.querySelector('h3').textContent = title;
        popupContent.querySelector('p').textContent = message;
        
        // Set type (success/error)
        messagePopup.className = 'message-popup ' + type;
        
        // Show popup
        messagePopup.style.display = 'block';
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            messagePopup.style.display = 'none';
        }, 5000);
    }
    
    // Add animation to staff cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe staff cards
    document.querySelectorAll('.staff-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add click tracking for contact links
    document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Contact link clicked:', this.href);
            // You can add analytics tracking here
        });
    });
});