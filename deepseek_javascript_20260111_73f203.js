// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Initialize animations after preloader
        initAnimations();
        initScrollAnimations();
        initSkillAnimations();
        initFormAnimations();
        initCursor();
        initScrollProgress();
    }, 1500);
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
    
    // Current Year in Footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    };
    
    // Initialize when stats are in view
    const observerStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observerStats.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelector('.hero-stats') && observerStats.observe(document.querySelector('.hero-stats'));
});

// Initialize animations
function initAnimations() {
    // Add fade-in animation to hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta, .hero-stats');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${0.3 + index * 0.3}s`;
        el.classList.add('fade-in');
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe cards
    document.querySelectorAll('.skill-card, .service-card, .timeline-item').forEach(card => {
        observer.observe(card);
    });
}

// Initialize skill animations
function initSkillAnimations() {
    const observerSkills = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill) {
                    const width = progressFill.getAttribute('data-width');
                    progressFill.style.width = `${width}%`;
                    
                    // Animate percentage number
                    const percentElement = entry.target.querySelector('.progress-percent');
                    if (percentElement) {
                        let current = 0;
                        const target = parseInt(width);
                        const duration = 1500;
                        const step = target / (duration / 16);
                        
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            percentElement.textContent = `${Math.floor(current)}%`;
                        }, 16);
                    }
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skill-card').forEach(card => {
        observerSkills.observe(card);
    });
}

// Initialize form animations
function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        // Remove focus effect
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check on load if already has value
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the form data to a server
            // For now, we'll just show an alert
            alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
            
            // Reset form
            contactForm.reset();
            formInputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
        });
    }
}

// Initialize custom cursor
function initCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (window.innerWidth > 768) {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
        
        window.addEventListener('mousemove', (e) => {
            // Position dot
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            
            // Position outline with delay
            setTimeout(() => {
                cursorOutline.style.left = `${e.clientX}px`;
                cursorOutline.style.top = `${e.clientY}px`;
            }, 50);
            
            // Hover effects
            const hoverElements = document.querySelectorAll('a, button, .skill-card, .service-card');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.2)';
                    cursorOutline.style.borderColor = 'var(--accent-blue)';
                });
                
                el.addEventListener('mouseleave', () => {
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorOutline.style.borderColor = 'var(--accent-purple)';
                });
            });
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
    }
}

// Initialize scroll progress indicator
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    });
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 1s ease forwards;
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes floatCard {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(2deg);
        }
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }
    
    /* Responsive Styles */
    @media (max-width: 992px) {
        .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
        }
        
        .hero-cta {
            justify-content: center;
        }
        
        .hero-stats {
            justify-content: center;
        }
        
        .about-content {
            grid-template-columns: 1fr;
            gap: 3rem;
        }
        
        .skills-container,
        .services-container {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .contact-container {
            grid-template-columns: 1fr;
        }
    }
    
    @media (max-width: 768px) {
        h1 {
            font-size: 3rem;
        }
        
        h2 {
            font-size: 2rem;
        }
        
        .hamburger {
            display: flex;
        }
        
        .nav-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            height: 100vh;
            background: var(--secondary-dark);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: center;
            transition: 0.5s;
            z-index: 1000;
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .nav-list {
            flex-direction: column;
            align-items: center;
        }
        
        .nav-cta {
            display: none;
        }
        
        .skills-container,
        .services-container {
            grid-template-columns: 1fr;
        }
        
        .hero-cta {
            flex-direction: column;
            align-items: center;
        }
        
        .btn {
            width: 100%;
            max-width: 300px;
        }
        
        .cursor-dot,
        .cursor-outline {
            display: none;
        }
    }
    
    @media (max-width: 576px) {
        .container {
            padding: 0 1.5rem;
        }
        
        .hero {
            padding: 6rem 1rem 2rem;
        }
        
        .hero-stats {
            flex-direction: column;
            gap: 2rem;
        }
        
        .section {
            padding: 3rem 0;
        }
    }
`;
document.head.appendChild(style);
// Social media card animations
function initSocialMediaAnimations() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (event.clientX - rect.left - size/2) + 'px';
            ripple.style.top = (event.clientY - rect.top - size/2) + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Initialize social media share counts (simulated)
    updateSocialStats();
}

// Update social media stats (simulated for demo)
function updateSocialStats() {
    const stats = {
        facebook: 850,
        linkedin: 420,
        instagram: 1200
    };
    
    setTimeout(() => {
        document.querySelectorAll('.social-card').forEach(card => {
            if (card.classList.contains('facebook')) {
                // Update Facebook stats
            }
            // Similar for other platforms
        });
    }, 2000);
}

// Add this to your DOMContentLoaded event listener
initSocialMediaAnimations();

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
