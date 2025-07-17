// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to navigation links based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section, .hero');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
});

// Function to scroll to order section (called by main CTA button)
function scrollToOrder() {
    // Since there's no specific order section, we'll scroll to the menu
    const menuSection = document.querySelector('#menu');
    if (menuSection) {
        const offsetTop = menuSection.offsetTop - 70;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button, .sticky-order-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a ripple effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Show/hide sticky order button based on scroll position
    const stickyOrderBtn = document.querySelector('.sticky-order');
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        
        if (window.pageYOffset > heroBottom - 200) {
            stickyOrderBtn.style.opacity = '1';
            stickyOrderBtn.style.visibility = 'visible';
        } else {
            stickyOrderBtn.style.opacity = '0';
            stickyOrderBtn.style.visibility = 'hidden';
        }
    });
    
    // Initially hide the sticky button
    stickyOrderBtn.style.opacity = '0';
    stickyOrderBtn.style.visibility = 'hidden';
    stickyOrderBtn.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
});

// Add some fun animations when elements come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature, .menu-item, .location');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);