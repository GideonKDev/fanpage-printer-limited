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
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification function
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.form-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `form-notification form-notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 10000;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;
        
        // Close button styles
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
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

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// // Contact form submission with popup
// document.addEventListener('DOMContentLoaded', function() {
//     const contactForm = document.getElementById('contactForm');
//     const messagePopup = document.getElementById('messagePopup');
//     const popupClose = document.querySelector('.popup-close');
    
//     if (contactForm) {
//         contactForm.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             // Get form data
//             const formData = new FormData(this);
//             const submitBtn = this.querySelector('button[type="submit"]');
//             const originalText = submitBtn.innerHTML;
            
//             // Show loading state
//             submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
//             submitBtn.disabled = true;
            
//             // Simulate form submission (replace with actual fetch if needed)
//             setTimeout(() => {
//                 // Show success message
//                 showMessagePopup('Message Sent', 'Thank you for your message! We will get back to you within 24 hours.', 'success');
                
//                 // Reset form
//                 contactForm.reset();
                
//                 // Restore button
//                 submitBtn.innerHTML = originalText;
//                 submitBtn.disabled = false;
                
//                 // Actually submit the form to FormSubmit
//                 // Uncomment the line below to enable actual form submission
//                 // contactForm.submit();
                
//             }, 1500);
//         });
//     }
    
//     // Close popup when clicking close button
//     if (popupClose) {
//         popupClose.addEventListener('click', function() {
//             messagePopup.style.display = 'none';
//         });
//     }
    
//     // Close popup when clicking outside
//     window.addEventListener('click', function(e) {
//         if (e.target === messagePopup) {
//             messagePopup.style.display = 'none';
//         }
//     });
    
//     // Function to show message popup
//     function showMessagePopup(title, message, type = 'success') {
//         const popupContent = messagePopup.querySelector('.popup-content');
//         popupContent.querySelector('h3').textContent = title;
//         popupContent.querySelector('p').textContent = message;
        
//         // Set type (success/error)
//         messagePopup.className = 'message-popup ' + type;
        
//         // Show popup
//         messagePopup.style.display = 'block';
        
//         // Auto hide after 5 seconds
//         setTimeout(() => {
//             messagePopup.style.display = 'none';
//         }, 5000);
//     }
// });