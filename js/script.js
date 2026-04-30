// ─── GSAP + ScrollTrigger ───────────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ─── Detecta Mobile ─────────────────────────────────────────
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                 window.innerWidth < 768 || 
                 ('ontouchstart' in window) || 
                 (navigator.maxTouchPoints > 0);

// ─── Lenis Smooth Scroll (apenas desktop) ────────────────────
let lenis = null;

if (!isMobile) {
    lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
}

// ─── Preloader ───────────────────────────────────────────────
const preloaderEl = document.getElementById('preloader');
const percentEl   = document.getElementById('preloaderPercent');

let progress = 0;
const ticker = setInterval(() => {
    progress = Math.min(progress + Math.random() * 12, 99);
    if (percentEl) percentEl.textContent = Math.floor(progress) + '%';
}, 80);

gsap.to('.loader-bar', {
    width: '100%',
    duration: 2,
    ease: 'power2.inOut',
    onComplete: () => {
        clearInterval(ticker);
        if (percentEl) percentEl.textContent = '100%';
        gsap.to(preloaderEl, {
            opacity: 0,
            duration: 0.7,
            delay: 0.2,
            onComplete: () => {
                preloaderEl.style.display = 'none';
                initSite();
            }
        });
    }
});

// ─── Site Init ───────────────────────────────────────────────
function initSite() {
    initNav();
    initLogoBlue();
    initCursor();
    initHeroCanvas();
    initHeroAnimations();
    initScrollAnimations();
    initMagnetic();
    initTilt();
    initMarquee();
    initHamburger();
    initMobileButtons();
}

// ─── Logo fica azul conforme o scroll ────────────────────────
function initLogoBlue() {
    const logo = document.querySelector('.main-nav .logo-icon img');
    if (!logo) return;

    gsap.fromTo(logo,
        {
            filter: 'hue-rotate(0deg) saturate(1) brightness(1) drop-shadow(0 0 0px rgba(106,168,200,0))',
        },
        {
            filter: 'hue-rotate(28deg) saturate(5) brightness(1.4) drop-shadow(0 0 18px rgba(106,168,200,0.9))',
            ease: 'none',
            scrollTrigger: {
                start: 'top top',
                end: 'bottom bottom',
                scrub: 2,
            }
        }
    );
}

// ─── Nav ─────────────────────────────────────────────────────
function initNav() {
    const nav = document.querySelector('.main-nav');

    // Reveal nav
    gsap.to(nav, { opacity: 1, duration: 0.8, ease: 'power2.out' });

    // Compact on scroll
    ScrollTrigger.create({
        start: 'top -60',
        onUpdate: self => {
            nav.classList.toggle('scrolled', self.scroll() > 60);
        }
    });

    // Scroll progress bar
    gsap.to('#scrollIndicator', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            scrub: 0,
            start: 'top top',
            end: 'bottom bottom',
        }
    });
}

// ─── Custom Cursor ───────────────────────────────────────────
function initCursor() {
    // Desativa cursor customizado em mobile
    if (isMobile) {
        const ring = document.getElementById('cursorRing');
        const dot  = document.getElementById('cursorDot');
        if (ring) ring.style.display = 'none';
        if (dot) dot.style.display = 'none';
        return;
    }

    const ring = document.getElementById('cursorRing');
    const dot  = document.getElementById('cursorDot');
    if (!ring || !dot) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        gsap.to(dot, { x: mx, y: my, duration: 0.06, ease: 'none' });
    });

    (function animateRing() {
        rx += (mx - rx) * 0.1;
        ry += (my - ry) * 0.1;
        gsap.set(ring, { x: rx, y: ry });
        requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll('a, button, .service-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(ring, { scale: 2.5, opacity: 0.4, duration: 0.35, ease: 'power2.out' });
            gsap.to(dot,  { scale: 0,   duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: 'power2.out' });
            gsap.to(dot,  { scale: 1, duration: 0.3 });
        });
    });
}

// ─── Hero Canvas — Particles ─────────────────────────────────
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    });

    const COUNT = window.innerWidth < 768 ? 40 : 80;
    const pts = Array.from({ length: COUNT }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        r:  Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        o:  Math.random() * 0.5 + 0.1,
    }));

    (function draw() {
        ctx.clearRect(0, 0, W, H);

        for (let i = 0; i < pts.length; i++) {
            const p = pts[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(106,168,200,${p.o})`;
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > W) p.dx *= -1;
            if (p.y < 0 || p.y > H) p.dy *= -1;

            for (let j = i + 1; j < pts.length; j++) {
                const q    = pts[j];
                const dist = Math.hypot(p.x - q.x, p.y - q.y);
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(106,168,200,${0.09 * (1 - dist / 130)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    })();
}

// ─── Hero Animations ─────────────────────────────────────────
function initHeroAnimations() {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo('.hero-label',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
    )
    .fromTo('.hero-title .word',
        { y: 110, rotateX: -90, opacity: 0, transformPerspective: 900 },
        { y: 0, rotateX: 0, opacity: 1, duration: 1.1, stagger: 0.14, ease: 'power4.out', transformOrigin: 'bottom center' },
        '-=0.5'
    )
    .fromTo('.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.4'
    )
    .fromTo('.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
    )
    .fromTo('.scroll-down',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.2'
    );

    // Video scale parallax
    gsap.to('.hero-video', {
        scale: 1.22,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
        }
    });

    // Hero content fade out on scroll
    gsap.to('.hero-content', {
        y: -120, opacity: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: '55% top',
            scrub: 1,
        }
    });

    // Shapes parallax
    gsap.to('.shape-1', {
        y: -180, rotate: 200, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2 }
    });
    gsap.to('.shape-2', {
        y: -120, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 3 }
    });
}

// ─── Scroll Animations ───────────────────────────────────────
function initScrollAnimations() {
    // Labels
    gsap.utils.toArray('.section-label').forEach(el => {
        gsap.to(el, {
            x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
        });
        gsap.set(el, { x: -50, opacity: 0 });
    });

    // Titles
    gsap.utils.toArray('.section-title').forEach(el => {
        gsap.fromTo(el,
            { y: 70, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%' }
            }
        );
    });

    // Service cards — stagger + 3D
    gsap.fromTo('.service-card',
        { y: 90, opacity: 0, rotateX: 12, transformPerspective: 700 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '.services-grid', start: 'top 82%' }
        }
    );

    // Developer cards
    gsap.to('.developer-card', {
        y: 0, opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.25,
        ease: 'back.out(1.6)',
        scrollTrigger: {
            trigger: '.developers-grid',
            start: 'top 82%',
        }
    });
    gsap.set('.developer-card', { y: 60, scale: 0.88 });

    // Project cards
    gsap.to('.project-card', {
        y: 0, opacity: 1,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 82%',
        }
    });
    gsap.set('.project-card', { y: 80 });

    // CTA
    gsap.fromTo('.cta-content',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.cta', start: 'top 75%' }
        }
    );
}

// ─── Magnetic Buttons ────────────────────────────────────────
function initMagnetic() {
    if (window.innerWidth < 768) return;

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r  = btn.getBoundingClientRect();
            const dx = (e.clientX - (r.left + r.width  / 2)) * 0.32;
            const dy = (e.clientY - (r.top  + r.height / 2)) * 0.32;
            gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
        });
    });
}

// ─── 3D Card Tilt ────────────────────────────────────────────
function initTilt() {
    if (window.innerWidth < 768) return;

    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width  - 0.5) * 14;
            const y = -((e.clientY - r.top) / r.height - 0.5) * 14;
            gsap.to(card, {
                rotateY: x, rotateX: y,
                transformPerspective: 900,
                duration: 0.4, ease: 'power2.out',
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0, rotateY: 0,
                duration: 0.7, ease: 'elastic.out(1, 0.5)',
            });
        });
    });
}

// ─── Marquee ─────────────────────────────────────────────────
function initMarquee() {
    const track = document.querySelector('.marquee-track');
    if (!track) return;

    track.innerHTML += track.innerHTML;

    gsap.to(track, {
        x: '-50%',
        duration: 28,
        repeat: -1,
        ease: 'none',
    });
}

// ─── Hamburger Menu ──────────────────────────────────────────
function initHamburger() {
    const hamburger   = document.getElementById('hamburger');
    const navLinks    = document.getElementById('navLinks');
    const menuBackdrop = document.getElementById('menuBackdrop');
    if (!hamburger) return;

    const open = () => {
        hamburger.classList.add('active');
        navLinks.classList.add('open');
        menuBackdrop.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    const close = () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        menuBackdrop.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', () => {
        hamburger.classList.contains('active') ? close() : open();
    });
    menuBackdrop.addEventListener('click', close);
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

// ─── Mobile Button Fix ───────────────────────────────────────
function initMobileButtons() {
    if (!isMobile) return;
    
    // Garante que todos os links com classe .btn funcionem em mobile
    document.querySelectorAll('.btn').forEach((btn) => {
        // Remove qualquer transform que possa estar interferindo
        btn.style.transform = 'none';
        btn.style.webkitTransform = 'none';
        btn.style.pointerEvents = 'auto';
        btn.style.position = 'relative';
        btn.style.zIndex = '9999';
        
        // Remove event listeners que podem estar interferindo (clona o elemento)
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        // Adiciona evento de clique direto com capture para garantir que funcione
        newBtn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                e.stopPropagation();
                
                if (this.getAttribute('target') === '_blank') {
                    window.open(href, '_blank', 'noopener,noreferrer');
                } else {
                    window.location.href = href;
                }
            }
        }, { capture: true });
        
        // Adiciona evento de toque como backup
        newBtn.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        }, { passive: true });
        
        newBtn.addEventListener('touchend', function(e) {
            this.style.opacity = '1';
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                
                if (this.getAttribute('target') === '_blank') {
                    window.open(href, '_blank', 'noopener,noreferrer');
                } else {
                    window.location.href = href;
                }
            }
        }, { passive: false });
    });
    
    // Garante que service-cards não bloqueiem cliques nos botões
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.transform = 'none';
        card.style.webkitTransform = 'none';
    });
    
    // Desabilita qualquer overlay que possa estar bloqueando
    document.querySelectorAll('.hero-overlay, .grid-overlay').forEach(overlay => {
        overlay.style.pointerEvents = 'none';
    });
}
