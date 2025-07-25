document.addEventListener('DOMContentLoaded', function() {
    
    // --- Typing Animation for Hero Section ---
    if (document.getElementById('typing-animation')) {
        var options = {
            strings: ['Full-Stack Developer', 'WordPress Expert', 'React Enthusiast', 'JavaScript Developer', 'Web Designer'],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        };
        var typed = new Typed('#typing-animation', options);
    }

    // --- Mobile Menu Logic ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('#mobile-menu a');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle hamburger icon
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- Smooth Scrolling for Navigation Links ---
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Active Navigation Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('nav a[href^="#"]');

    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // --- Scroll-triggered Fade-in Animation for Sections ---
    const animatedElements = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Skill Items Animation on Scroll ---
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.9)';
        item.style.transition = 'all 0.6s ease';
        skillObserver.observe(item);
    });

    // --- Project Cards Animation ---
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1
    });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.8s ease';
        projectObserver.observe(card);
    });

    // --- Automatic "Floating Constellation" Background Animation ---
    const canvas = document.getElementById('background-animation');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    let particlesArray = [];

    // Particle class
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        // Method to draw individual particle
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(173, 216, 230, ${this.opacity})`;
            ctx.fill();
        }

        // Check particle position, move particle
        update() {
            // Reverse direction if particle hits edge of canvas
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Move particle
            this.x += this.directionX;
            this.y += this.directionY;

            // Slight opacity variation for twinkling effect
            this.opacity += (Math.random() - 0.5) * 0.02;
            this.opacity = Math.max(0.1, Math.min(0.8, this.opacity));

            // Draw particle at its new position
            this.draw();
        }
    }

    // Create particle array
    function init() {
        particlesArray = [];
        // Adjust number of particles based on screen size
        let numberOfParticles = Math.floor((canvas.height * canvas.width) / 9000);
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 3) + 1;
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(173, 216, 230, 0.5)';
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Function to draw lines between nearby particles
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                             + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                // Check if distance is within the connection range
                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    // Calculate opacity based on distance
                    opacityValue = 1 - (distance/20000);
                    ctx.strokeStyle = `rgba(173, 216, 230, ${opacityValue})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Main animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    // Mouse interaction with particles
    let mouse = {
        x: null,
        y: null,
        radius: (canvas.height/80) * (canvas.width/80)
    };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseout', function() {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    // Enhanced connect function with mouse interaction
    function connectWithMouse() {
        for (let i = 0; i < particlesArray.length; i++) {
            let distance = ((mouse.x - particlesArray[i].x) * (mouse.x - particlesArray[i].x))
                         + ((mouse.y - particlesArray[i].y) * (mouse.y - particlesArray[i].y));
            
            if (distance < mouse.radius) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(34, 211, 238, 0.6)';
                ctx.lineWidth = 2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }

    // Updated animation loop with mouse interaction
    function animateWithMouse() {
        requestAnimationFrame(animateWithMouse);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
        
        if (mouse.x !== undefined && mouse.y !== undefined) {
            connectWithMouse();
        }
    }

    // Resize event listener to re-initialize particles on window resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        init();
    });

    // --- Header Background Blur on Scroll ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(17, 24, 39, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(17, 24, 39, 0.6)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // --- Scroll to Top Button ---
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #22d3ee, #0891b2);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(34, 211, 238, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Initialize Everything ---
    init();
    animateWithMouse();
    updateActiveNavLink();

    // --- Loading Animation ---
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // --- Form Validation (if contact form exists) ---
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            if (name && email && message) {
                // Here you would typically send the form data to a server
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // --- Performance Optimization ---
    let ticking = false;
    
    function updateOnScroll() {
        updateActiveNavLink();
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // --- Console Welcome Message ---
    console.log('%c👋 Welcome to Imran Hossain\'s Portfolio!', 'color: #22d3ee; font-size: 16px; font-weight: bold;');
    console.log('%cInterested in the code? Check out my GitHub!', 'color: #67e8f9; font-size: 14px;');
});

// --- Utility Functions ---

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        if (isInViewport(reveal)) {
            reveal.classList.add('active');
        }
    });
}

// Initialize reveal animations
window.addEventListener('scroll', throttle(revealOnScroll, 100));
