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

// ========================================
// PAGE TRANSITION SYSTEM
// ========================================

function transitionToOrder() {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.innerHTML = `
        <div class="transition-content">
            <div class="bubble-loader">
                <div class="bubble-animation"></div>
                <div class="bubble-animation"></div>
                <div class="bubble-animation"></div>
            </div>
            <h2>Preparing Your Order Experience...</h2>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add transition styles
    const style = document.createElement('style');
    style.textContent = `
        .page-transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #2c1810 0%, #8B4513 100%);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        .page-transition-overlay.active {
            opacity: 1;
        }
        
        .transition-content {
            text-align: center;
            color: white;
        }
        
        .bubble-loader {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 2rem;
        }
        
        .bubble-animation {
            width: 20px;
            height: 20px;
            background: #d4a574;
            border-radius: 50%;
            animation: bubbleBounce 1.4s ease-in-out infinite both;
        }
        
        .bubble-animation:nth-child(1) { animation-delay: -0.32s; }
        .bubble-animation:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes bubbleBounce {
            0%, 80%, 100% {
                transform: scale(0);
            }
            40% {
                transform: scale(1);
            }
        }
        
        .transition-content h2 {
            font-size: 1.5rem;
            opacity: 0.9;
        }
    `;
    document.head.appendChild(style);
    
    // Trigger fade in
    setTimeout(() => {
        overlay.classList.add('active');
    }, 50);
    
    // Navigate to order page after animation
    setTimeout(() => {
        window.location.href = 'order.html';
    }, 1500);
}

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

// ========================================
// PAGE TRANSITION FUNCTIONS
// ========================================
let isTransitioning = false;

function transitionToOrder() {
    if (isTransitioning) return;
    
    showTransitionOverlay(() => {
        window.location.href = 'order.html';
    });
}

function transitionToLanding() {
    if (isTransitioning) return;
    
    showTransitionOverlay(() => {
        window.location.href = 'landing.html';
    });
}

function showTransitionOverlay(callback) {
    isTransitioning = true;
    const overlay = document.getElementById('page-transition-overlay');
    
    if (overlay) {
        // Show transition overlay with fade in
        overlay.classList.add('active');
        
        // Execute callback after transition animation
        setTimeout(() => {
            if (callback) callback();
        }, 800); // Match CSS transition duration
    } else {
        // Fallback if overlay doesn't exist
        if (callback) callback();
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