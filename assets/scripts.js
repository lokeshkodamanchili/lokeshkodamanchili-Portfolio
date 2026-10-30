/* ============================================
   Satya K - Lead Engineer
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    // Prevent auto-scroll/jump on refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // ============================================
    // -1. TOUCH DETECTION
    // ============================================
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    if (isTouch) {
        document.body.classList.add('is-touch');
    }

    // ============================================
    // 0. LOGO NUMBER COUNTER REVOLVE EFFECT
    // ============================================
    const logoLink = document.querySelector('.nav-logo a');
    if (logoLink) {
        const originalText = "I'M LOKESH";
        const digits = "0123456789";
        let logoInterval = null;

        logoLink.addEventListener('mouseenter', () => {
            if (logoInterval) clearInterval(logoInterval);
            let iterations = 0;
            logoInterval = setInterval(() => {
                logoLink.innerHTML = originalText.split("")
                    .map((char, index) => {
                        if (index < iterations || char === " ") return char;
                        const randomDigit = digits[Math.floor(Math.random() * 10)];
                        return `<span class="logo-digit">${randomDigit}</span>`;
                    })
                    .join("");

                if (iterations >= originalText.length) {
                    clearInterval(logoInterval);
                    logoLink.innerText = originalText;
                }
                iterations += 1 / 3;
            }, 30);
        });

        logoLink.addEventListener('mouseleave', () => {
            if (logoInterval) clearInterval(logoInterval);
            logoLink.innerText = originalText;
        });
    }


    // ============================================
    // 0b. VANTA FOG BACKGROUND
    // ============================================
    let vantaEffect = null;
    function initVanta(theme = 'dark') {
        if (typeof VANTA !== 'undefined') {
            if (vantaEffect) vantaEffect.destroy();

            if (theme === 'dark') {
                vantaEffect = VANTA.FOG({
                    el: '#home',
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    highlightColor: 0x3a1200,
                    midtoneColor: 0x1a0800,
                    lowlightColor: 0x000000,
                    baseColor: 0x000000,
                    blurFactor: 0.95,
                    speed: 2.90,
                    zoom: 1.60,
                });
            } else {
                vantaEffect = VANTA.FOG({
                    el: '#home',
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    highlightColor: 0xe88a2d,
                    midtoneColor: 0xffffff,
                    lowlightColor: 0xea9300,
                    baseColor: 0xffebeb,
                    blurFactor: 0.56,
                    speed: 1.7,
                    zoom: 0.8,
                });
            }
        }
    }

    // ============================================
    // 0c. THEME MANAGEMENT (LIGHT/DARK MODE)
    // ============================================
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    // Default to 'dark' unless 'light' is explicitly saved
    // Supporting system preferences as a fallback
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const currentTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');

    if (currentTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        try { initVanta('light'); } catch (e) { console.info('Static background active'); }
    } else {
        document.documentElement.classList.remove('light-mode');
        try { initVanta('dark'); } catch (e) { console.info('Static background active'); }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.documentElement.classList.toggle('light-mode');
            const newTheme = isLight ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            try { initVanta(newTheme); } catch(e) { console.info('Static background active'); }
        });
    }

    // ============================================
    // 1. LENIS SMOOTH SCROLL INITIALIZATION
    // ============================================
    const lenis = typeof Lenis !== "undefined" ? new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        orientation: 'vertical',
    }) : {raf(){},on(){},scrollTo(el){el.scrollIntoView({behavior:'smooth'});}};

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                lenis.scrollTo(target, { duration: 1.5 });
            }
        });
    });

    // ============================================
    // 2. CUSTOM CURSOR WITH LAG (GSAP)
    // ============================================
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');
    const heroText = document.querySelector('.massive-text');

    // QuickSetter for performance
    const xTo = gsap.quickTo(cursor, "left", { duration: 0.1, ease: "power3" }),
        yTo = gsap.quickTo(cursor, "top", { duration: 0.1, ease: "power3" });

    const blurXTo = gsap.quickTo(cursorBlur, "left", { duration: 0.4, ease: "power2" }),
        blurYTo = gsap.quickTo(cursorBlur, "top", { duration: 0.4, ease: "power2" });

    window.addEventListener("mousemove", e => {
        if (isTouch) return;
        xTo(e.clientX);
        yTo(e.clientY);
        blurXTo(e.clientX);
        blurYTo(e.clientY);


    });

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, .timeline-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!el.classList.contains('resume-no-expand')) {
                gsap.to(cursor, { scale: 4, backgroundColor: 'rgba(255, 92, 0, 0.2)', duration: 0.3 });
                gsap.to(cursorBlur, { scale: 1.5, opacity: 0.3, duration: 0.3 });
            }
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, backgroundColor: '#FF5C00', duration: 0.3 });
            gsap.to(cursorBlur, { scale: 1, opacity: 1, duration: 0.3 });
        });
    });



    // ============================================
    // 3. HERO REVEAL MOUSE INTERACTION
    // ============================================
    const heroSection = document.querySelector('.hero');
    const heroLayers = document.querySelector('.hero-layers-wrapper');
    const revealLayer = document.querySelector('.reveal-layer');
    const mainLayer = document.querySelector('.main-layer');

    if (heroSection && heroLayers && revealLayer && mainLayer) {
        heroSection.addEventListener('mousemove', (e) => {
            if (isTouch) return;
            const rect = heroLayers.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;

            [revealLayer, mainLayer].forEach(layer => {
                layer.style.setProperty('--mask-size', '200px');
                layer.style.setProperty('--mask-pos-x', relX + 'px');
                layer.style.setProperty('--mask-pos-y', relY + 'px');
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            [revealLayer, mainLayer].forEach(el => {
                el.style.setProperty('--mask-size', '0px');
            });
        });

        // Initialize mask-size for touch (hidden)
        if (isTouch) {
            revealLayer.style.setProperty('--mask-size', '0px');
            mainLayer.style.setProperty('--mask-size', '0px');
            mainLayer.style.setProperty('-webkit-mask-image', 'none');
            mainLayer.style.setProperty('mask-image', 'none');
        }
    }

    // ============================================
    // 0.5 MOBILE NAVIGATION TOGGLE
    // ============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('nav-open');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('nav-open') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('nav-open');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // 4. SCROLL ANIMATIONS (GSAP + ScrollTrigger)
    // ============================================
    gsap.registerPlugin(ScrollTrigger);

    // Fade in sections (excluding hero section)
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // About pillars stagger
    gsap.from('.about-pillar', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 70%'
        }
    });

    // Timeline items reveal
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        gsap.from(item, {
            x: -50,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: 'top 90%'
            }
        });
    });

    // ============================================
    // 5. EXPERIENCE SECTION (Expand/Collapse + Scroll Reveal)
    // ============================================

    // Expand/Collapse toggle for experience details (GSAP animated)
    window.toggleExp = function (btn) {
        const details = btn.previousElementSibling;
        const isExpanded = btn.classList.contains('active');

        if (isExpanded) {
            // Collapse
            gsap.to(details, {
                height: 0,
                duration: 0.4,
                ease: 'power2.inOut',
                onComplete: () => {
                    details.querySelectorAll('li, .exp-env').forEach(el => {
                        el.style.opacity = '';
                        el.style.transform = '';
                    });
                }
            });
            btn.innerHTML = 'Read More <i class="fas fa-chevron-down"></i>';
            btn.classList.remove('active');
        } else {
            // Expand: measure full height first, then animate to that exact value
            details.style.height = 'auto';
            const fullHeight = details.scrollHeight + 'px';
            details.style.height = '0';

            const items = details.querySelectorAll('li, .exp-env');
            gsap.set(items, { opacity: 0, y: 15 });

            gsap.to(details, {
                height: fullHeight,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    details.style.height = 'auto'; // Reset to auto after animation completes
                    gsap.to(items, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        stagger: 0.05,
                        ease: 'power2.out'
                    });
                }
            });
            btn.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
            btn.classList.add('active');
        }
    };

    // Animate experience cards on scroll
    gsap.utils.toArray('.exp-entry').forEach((entry, i) => {
        gsap.from(entry, {
            opacity: 0,
            x: -30,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: entry,
                start: 'top 85%',
            }
        });
    });

    // Counter scramble effect for company names (same as hero name)
    function scrambleText(element) {
        const originalText = element.dataset.text || element.innerText;
        element.dataset.text = originalText;
        const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let iterations = 0;

        const interval = setInterval(() => {
            element.innerHTML = originalText.split("")
                .map((char, index) => {
                    if (index < iterations || char === " ") return char;
                    const randomChar = digits[Math.floor(Math.random() * digits.length)];
                    return `<span style="color:var(--accent);opacity:0.6">${randomChar}</span>`;
                })
                .join("");

            if (iterations >= originalText.length) {
                clearInterval(interval);
                element.innerText = originalText;
            }
            iterations += 1 / 2;
        }, 35);
    }

    // Trigger on scroll + hover for company names
    document.querySelectorAll('.company-name').forEach(name => {
        // On scroll into view
        ScrollTrigger.create({
            trigger: name,
            start: 'top 85%',
            onEnter: () => scrambleText(name),
            once: true
        });

        // On hover
        name.addEventListener('mouseenter', () => scrambleText(name));
    });

    // ============================================
    // 6. SKEWMORPHIC TILT FOR PROJECTS
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

    // 7. SKILLS REVEAL (Removed per user request - staying static for visibility)

    // Contact Section Glow Effect
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.addEventListener('mousemove', (e) => {
            const rect = contactSection.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            contactSection.style.setProperty('--contact-x', `${x}%`);
            contactSection.style.setProperty('--contact-y', `${y}%`);
        });
    }

    // ============================================
    // Experience Section Metric Counters
    // Uses direct getBoundingClientRect check to handle the case where
    // elements are already in-view on page load (mobile DevTools, etc.)
    // ============================================
    const counters = document.querySelectorAll('.counter');

    const animateCounter = (counter) => {
        if (counter.classList.contains('animated')) return;
        counter.classList.add('animated');
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const startTime = performance.now();
        const update = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            counter.innerText = Math.floor(ease * target);
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };
        requestAnimationFrame(update);
    };

    const checkCounters = () => {
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            if (inView) animateCounter(counter);
        });
    };

    // Check immediately on load (handles case where element is already visible)
    checkCounters();
    // Also check on every scroll
    window.addEventListener('scroll', checkCounters, { passive: true });

    // Magnetic Tilt for Interactive Cards (Bento, Projects, Experience, Recommendations)
    const interactiveCards = document.querySelectorAll('.bento-item, .proj-card, .exp-card, .reco-main');
    interactiveCards.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 1024 || document.body.classList.contains('is-touch')) return; // Strict mobile bypass for click-absorption
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            gsap.to(item, {
                duration: 0.5,
                rotateY: x * 10,
                rotateX: -y * 10,
                transformPerspective: 1000,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.5,
                rotateY: 0,
                rotateX: 0,
                ease: 'power2.out',
                overwrite: 'auto'
            });
        });
    });

    // Magnetic Interaction for Buttons & Links
    const magneticElements = document.querySelectorAll('.resume-btn, .hero-resume-link, .exp-toggle');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 1024 || document.body.classList.contains('is-touch')) return; // Strict mobile bypass for click-absorption
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (e.clientX - (left + width / 2)) * 0.35;
            const y = (e.clientY - (top + height / 2)) * 0.35;

            gsap.to(el, {
                duration: 0.4,
                x: x,
                y: y,
                ease: 'power2.out'
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                duration: 0.4,
                x: 0,
                y: 0,
                ease: 'power2.out'
            });
        });
    });

    console.log('%c✓ Portfolio Motion System Initialized', 'color: #FF5C00; font-weight: bold;');
});
