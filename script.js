document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggle = document.getElementById('themeToggle');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');

    // State
    let darkMode = true;
    let activeSection = 'home';

    // ==================== THEME TOGGLE ====================
    function toggleTheme() {
        darkMode = !darkMode;
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        themeToggle.textContent = darkMode ? '☀ Light' : '☾ Dark';
    }

    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀ Light';
    themeToggle.setAttribute('aria-label', 'Switch to light mode');

    themeToggle.addEventListener('click', () => {
        toggleTheme();
        themeToggle.setAttribute(
            'aria-label',
            darkMode ? 'Switch to light mode' : 'Switch to dark mode'
        );
    });

    // ==================== HAMBURGER MENU ====================
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // ==================== SCROLL HANDLING ====================
    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll to top button
        if (scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        // Active section detection
        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });

        if (current && current !== activeSection) {
            activeSection = current;
            updateActiveNav(current);
        }
    }

    window.addEventListener('scroll', handleScroll);

    // ==================== ACTIVE NAV UPDATE ====================
    function updateActiveNav(sectionId) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        mobileLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ==================== SMOOTH SCROLL ====================
    function scrollToSection(id) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Desktop nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            scrollToSection(targetId);
        });
    });

    // Mobile nav links
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            scrollToSection(targetId);
        });
    });

    // Hero buttons
    document.querySelectorAll('.btn-secondary, .btn-primary').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href.slice(1));
            }
        });
    });

    // Scroll to top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==================== PARALLAX BLOBS ====================
    document.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.blob');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 20;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // ==================== INTERSECTION OBSERVER (Animations) ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
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

    // Observe all anim-el elements
    document.querySelectorAll('.anim-el').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ==================== CONTACT FORM ====================
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        const mailtoLink = `mailto:jimisyangbo@mmciom.edu.np?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
        window.location.href = mailtoLink;
        contactForm.reset();
    });

    // ==================== KEYBOARD NAVIGATION ====================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // ==================== INITIAL SETUP ====================
    handleScroll();
    console.log('🚀 Jimi Syangbo | Medical Innovation meets Code');
});
