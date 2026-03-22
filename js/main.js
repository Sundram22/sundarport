/* ============================================
   SUNDRAM TIWARI — PORTFOLIO JS V2
   ALL FEATURES:
   - Loading Screen
   - Particle Background
   - Custom Cursor
   - Typing Effect
   - Dark/Light Mode
   - Scroll Progress Bar
   - Back to Top
   - Skill Filter
   - Project Filter
   - Testimonials Slider
   - Counter Animation
   - Proficiency Bars
   - Scroll Reveal
   - Nav Scroll Effect
   - Google Sheets Form
   ============================================ */

/* ══════════════════════════════════════════
   1. LOADING SCREEN
══════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 2200);
});
document.body.style.overflow = 'hidden';


/* ══════════════════════════════════════════
   2. PARTICLE BACKGROUND
══════════════════════════════════════════ */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.7 ? '#7b5cf0' : '#00f5c8';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 120; i++) particles.push(new Particle());
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = '#00f5c8';
        ctx.globalAlpha = (1 - dist / 100) * 0.08;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  animationId = requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


/* ══════════════════════════════════════════
   3. CUSTOM CURSOR
══════════════════════════════════════════ */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .skill-card, .project-card, .fact-row, .service-card, .testimonial-card, .tech-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px'; cursor.style.height = '20px';
    cursorRing.style.width = '60px'; cursorRing.style.height = '60px';
    cursorRing.style.borderColor = 'var(--accent2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px'; cursor.style.height = '12px';
    cursorRing.style.width = '40px'; cursorRing.style.height = '40px';
    cursorRing.style.borderColor = 'var(--accent)';
  });
});


/* ══════════════════════════════════════════
   4. TYPING EFFECT
══════════════════════════════════════════ */
const typingTexts = [
  'Data Scientist & ML Engineer',
  'Deep Learning Specialist',
  'NLP & LLM Expert',
  'Data Visualization Pro',
  'MLOps & Cloud Engineer'
];
let tIndex = 0, cIndex = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
  if (!typingEl) return;
  const current = typingTexts[tIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, cIndex - 1);
    cIndex--;
  } else {
    typingEl.textContent = current.substring(0, cIndex + 1);
    cIndex++;
  }
  if (!isDeleting && cIndex === current.length) {
    setTimeout(() => { isDeleting = true; }, 2000);
  } else if (isDeleting && cIndex === 0) {
    isDeleting = false;
    tIndex = (tIndex + 1) % typingTexts.length;
  }
  setTimeout(typeEffect, isDeleting ? 50 : 90);
}
setTimeout(typeEffect, 2500);


/* ══════════════════════════════════════════
   5. DARK / LIGHT MODE
══════════════════════════════════════════ */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  isDark = false;
  document.documentElement.setAttribute('data-theme', 'light');
  themeIcon.textContent = '☀️';
}


/* ══════════════════════════════════════════
   6. SCROLL PROGRESS BAR
══════════════════════════════════════════ */
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight;
  const pct = (window.scrollY / total) * 100;
  scrollProgress.style.width = pct + '%';
});


/* ══════════════════════════════════════════
   7. BACK TO TOP
══════════════════════════════════════════ */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ══════════════════════════════════════════
   8. NAV SCROLL EFFECT + ACTIVE LINKS
══════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
const navAnchors = document.querySelectorAll('.nav-links a');
const allSections = document.querySelectorAll('section[id], div[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  let current = '';
  allSections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navAnchors.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});


/* ══════════════════════════════════════════
   9. MOBILE NAV
══════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));


/* ══════════════════════════════════════════
   10. SCROLL REVEAL
══════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));


/* ══════════════════════════════════════════
   11. COUNTER ANIMATION
══════════════════════════════════════════ */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(num => {
        const target = parseInt(num.dataset.target);
        let current = 0;
        const timer = setInterval(() => {
          current += target / 50;
          if (current >= target) { current = target; clearInterval(timer); }
          num.textContent = Math.floor(current) + '+';
        }, 30);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stats-bar').forEach(el => counterObserver.observe(el));


/* ══════════════════════════════════════════
   12. PROFICIENCY BARS
══════════════════════════════════════════ */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.prof-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.prof-grid').forEach(el => barObserver.observe(el));


/* ══════════════════════════════════════════
   13. SKILL FILTER BUTTONS
══════════════════════════════════════════ */
document.querySelectorAll('[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.skill-card[data-category]').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


/* ══════════════════════════════════════════
   14. PROJECT FILTER BUTTONS
══════════════════════════════════════════ */
document.querySelectorAll('[data-pfilter]').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.pfilter;
    document.querySelectorAll('[data-pfilter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.project-card[data-ptag]').forEach(card => {
      const tags = card.dataset.ptag || '';
      if (filter === 'all' || tags.includes(filter)) {
        card.classList.remove('hidden-p');
      } else {
        card.classList.add('hidden-p');
      }
    });
  });
});


/* ══════════════════════════════════════════
   15. TESTIMONIALS SLIDER
══════════════════════════════════════════ */
const track = document.getElementById('testimonialsTrack');
const dotsContainer = document.getElementById('sliderDots');
const cards = track ? track.querySelectorAll('.testimonial-card') : [];
let currentSlide = 0;

if (cards.length > 0) {
  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(n) {
    currentSlide = (n + cards.length) % cards.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  document.getElementById('prevBtn').addEventListener('click', () => goToSlide(currentSlide - 1));
  document.getElementById('nextBtn').addEventListener('click', () => goToSlide(currentSlide + 1));

  // Auto slide
  setInterval(() => goToSlide(currentSlide + 1), 5000);
}


/* ══════════════════════════════════════════
   16. CONTACT FORM → GOOGLE SHEETS
══════════════════════════════════════════ */
// ⚠️ APNA GOOGLE APPS SCRIPT URL YAHAN DAALO
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwLf4uP-QpvgTfM30aeZa68RXtCuKbkC83CuHu59sUzW--ZNkFJ9OnK4OcvLOVM5v2qHA/exec';

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const form = e.target;

  btn.textContent = 'Sending...';
  btn.disabled = true;
  document.getElementById('form-status').style.display = 'none';

  const data = {
    name:      form.name.value,
    email:     form.email.value,
    subject:   form.subject.value,
    message:   form.message.value,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  };

  try {
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      await new Promise(r => setTimeout(r, 1000));
      showStatus('success', '✓ Demo mode — apna Google Script URL daalo main.js mein!');
      form.reset();
    } else {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      showStatus('success', '✓ Message bhej diya! Sundram jaldi reply karega. 🚀');
      form.reset();
    }
  } catch (err) {
    showStatus('error', '✗ Network error. Seedha WhatsApp karo ya email karo!');
  }

  btn.textContent = 'Send Message →';
  btn.disabled = false;
});

function showStatus(type, message) {
  const status = document.getElementById('form-status');
  status.style.display = 'block';
  status.className = type;
  status.textContent = message;
  setTimeout(() => { status.style.display = 'none'; }, 7000);
}
