/**
 * Sacha's Taste - Main Behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animation Observer (Reveal on Scroll)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .stagger-reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Scroll Progress Bar
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    // 3. Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Mobile/Mega Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const closeMenu = document.querySelector('.close-menu');

    if (hamburger && menuOverlay) {
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        };

        hamburger.addEventListener('click', toggleMenu);
        if (closeMenu) closeMenu.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        menuOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // 5. Hero Parallax Effect (Professional & Subtle)
    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
        
        const ceoImg = document.querySelector('.hero-ceo-img');
        const foodImg = document.querySelector('.hero-food-img');
        
        if (ceoImg) ceoImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
        if (foodImg) foodImg.style.transform = `translate(${-moveX * 2}px, ${-moveY * 2}px) rotate(5deg)`;
    });

    // 6. Smooth Scroll for all Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 7. Order Now Logic
    document.querySelectorAll('a[href="#order-now"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const originalText = btn.innerText;
            btn.innerText = "OPENING INSTAGRAM...";
            
            setTimeout(() => {
                btn.innerText = originalText;
                window.open('https://www.instagram.com/sachas_taste/', '_blank');
            }, 800);
        });
    });

    // 8. Background Morph Logic (Professional Palette)
    const sections = document.querySelectorAll('section');
    const body = document.body;

    const morphObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const sectionColors = {
                    'hero': '#121212',
                    'delivery': '#e67e22',
                    'story': '#e67e22',
                    'menu': '#e67e22',
                    'discover': '#ffffff',
                    'process': '#ffffff',
                    'opening-times': '#ffffff',
                    'find-us': '#121212',
                    'gallery': '#121212',
                    'team': '#ffffff'
                };
                
                if (sectionColors[id]) {
                    body.style.backgroundColor = sectionColors[id];
                }
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(s => morphObserver.observe(s));
});
