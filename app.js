// Interactive behaviors for Himanshi Parihar Portfolio
// Senior Graphic & UI/UX Designer

// Slide list for lightbox navigation (all 60 slides)
const allSlides = [];
for (let i = 1; i <= 60; i++) {
  allSlides.push(`assets/slide_${i}.jpg`);
}

let currentSlideIndex = 0;

// Contact Email Constant
const CONTACT_EMAIL = 'himanshiparihar.design@gmail.com';

// Smooth Scrolling with filter-awareness
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    // If section is currently hidden by filter, restore all
    if (el.classList.contains('hidden')) {
      filterCategory('all', document.querySelector('.filter-btn'));
    }
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}

// Lightbox Controls
const lightboxModal = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src, alt = '') {
  currentSlideIndex = allSlides.indexOf(src);
  if (currentSlideIndex === -1) {
    currentSlideIndex = 0;
  }
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightboxModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightboxDirect() {
  lightboxModal.classList.remove('open');
  document.body.style.overflow = '';
}

function closeLightbox(e) {
  if (e.target === lightboxModal) {
    closeLightboxDirect();
  }
}

function navigateLightbox(direction, e) {
  if (e) e.stopPropagation();
  currentSlideIndex += direction;
  if (currentSlideIndex < 0) {
    currentSlideIndex = allSlides.length - 1;
  } else if (currentSlideIndex >= allSlides.length) {
    currentSlideIndex = 0;
  }
  lightboxImg.src = allSlides[currentSlideIndex];
}

// Keyboard navigation
window.addEventListener('keydown', (e) => {
  if (lightboxModal && lightboxModal.classList.contains('open')) {
    if (e.key === 'Escape') closeLightboxDirect();
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
  }
  if (drawer && drawer.classList.contains('open')) {
    if (e.key === 'Escape') closeResume();
  }
  const rishwat = document.getElementById('rishwat-popup-overlay');
  if (rishwat && rishwat.classList.contains('open')) {
    if (e.key === 'Escape') closeRishwatPopupDirect();
  }
});

// Mobile Touch Gesture & Swipe Support for Lightbox
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

if (lightboxModal) {
  lightboxModal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  lightboxModal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleLightboxSwipe();
  }, { passive: true });
}

function handleLightboxSwipe() {
  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;
  const absDiffX = Math.abs(diffX);
  const absDiffY = Math.abs(diffY);

  // Swipe threshold
  if (absDiffX > 50 && absDiffX > absDiffY) {
    if (diffX < 0) {
      // Swiped Left -> Next Slide
      navigateLightbox(1);
    } else {
      // Swiped Right -> Prev Slide
      navigateLightbox(-1);
    }
  } else if (diffY > 80 && absDiffY > absDiffX) {
    // Swiped Down -> Close Modal
    closeLightboxDirect();
  }
}

// Category Filtering (01 Logofolio, 02 Branding, 03 UI/UX, All)
function filterCategory(category, btnElement) {
  // Update active pill styling
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  if (btnElement) {
    btnElement.classList.add('active');
  }

  const sections = document.querySelectorAll('.filterable-section');

  sections.forEach(section => {
    if (category === 'all') {
      section.classList.remove('hidden');
    } else {
      if (section.classList.contains(category) || section.id === category) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    }
  });

  // Smooth scroll to relevant section
  if (category !== 'all') {
    const target = document.getElementById(category);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }
}

// Interactive TAP App Mobile Simulator Tab Switcher
function switchSimSlide(src, btnElement) {
  const simImg = document.getElementById('tap-sim-img');
  if (!simImg) return;

  // Update tabs active state
  document.querySelectorAll('.sim-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  if (btnElement) {
    btnElement.classList.add('active');
  }

  // Smooth transition
  simImg.style.opacity = '0.2';
  simImg.style.transform = 'scale(0.98)';
  setTimeout(() => {
    simImg.src = src;
    simImg.onload = () => {
      simImg.style.opacity = '1';
      simImg.style.transform = 'scale(1)';
    };
  }, 150);
}

// Interactive Bloomcare Botanical Camera AI Scanner
let scanCompleted = false;
function runPlantScan() {
  const triggerBtn = document.getElementById('scan-trigger-btn');
  const resultBox = document.getElementById('scan-result-box');
  if (!triggerBtn || !resultBox) return;

  if (scanCompleted) {
    // Toggle result box if already scanned
    resultBox.classList.toggle('active');
    return;
  }

  // Set scanning state
  triggerBtn.disabled = true;
  triggerBtn.innerHTML = `
    <span class="scan-spinner"></span>
    <span>Analyzing Monstera foliage...</span>
  `;

  setTimeout(() => {
    triggerBtn.disabled = false;
    scanCompleted = true;
    resultBox.classList.add('active');
    triggerBtn.innerHTML = `
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
      <span>Scan Complete (Monstera Deliciosa)</span>
    `;
    showToast('🌿 AI Diagnosis Complete: Needs filtered light & care');
  }, 1000);
}

// Resume Drawer Controls
const drawer = document.getElementById('resume-drawer');
const overlay = document.getElementById('drawer-overlay');

function openResume() {
  if (drawer && overlay) {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeResume() {
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Toast Feedback Notification
const toast = document.getElementById('toast');
let toastTimer = null;

function showToast(msg) {
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Copy color hex code to clipboard
function copyHex(hex) {
  navigator.clipboard.writeText(hex).then(() => {
    showToast(`Copied token ${hex} to clipboard!`);
  }).catch(() => {
    showToast(`Color token: ${hex}`);
  });
}

// Copy contact email
function copyContactEmail() {
  navigator.clipboard.writeText(CONTACT_EMAIL).then(() => {
    showToast(`Copied ${CONTACT_EMAIL} to clipboard!`);
  }).catch(() => {
    showToast(`Contact: ${CONTACT_EMAIL}`);
  });
}

// ==========================================================================
// CUTE "RISHWAT" POPUP SYSTEM
// ==========================================================================

// Web Audio API Gentle Chimes (zero external assets needed)
function playCuteChime(type = 'pop') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    if (type === 'pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } else if (type === 'success') {
      // 3-tone cheerful arpeggio (C5 -> E5 -> G5)
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.14, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
      });
    }
  } catch (err) {
    // Silent fail if AudioContext is blocked
  }
}

const rishwatOverlay = document.getElementById('rishwat-popup-overlay');
const rishwatSuccessState = document.getElementById('rishwat-success-state');

function triggerRishwat(e, destination = 'other page') {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (!rishwatOverlay) return;

  if (rishwatSuccessState) {
    rishwatSuccessState.classList.remove('active');
  }

  rishwatOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  playCuteChime('pop');
}

function closeRishwatPopupDirect() {
  if (rishwatOverlay) {
    rishwatOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function closeRishwatPopup(e) {
  if (e.target === rishwatOverlay) {
    closeRishwatPopupDirect();
  }
}

function payRishwat(bribeType) {
  playCuteChime('success');
  if (rishwatSuccessState) {
    const desc = rishwatSuccessState.querySelector('.success-desc');
    if (bribeType === 'chai') {
      if (desc) desc.innerHTML = 'Waah! Ek kadak cutting chai sponsor karne ke liye shukriya! ☕😋<br/>Himanshi ji khush hui, par filhal yahi portfolio ghoom lo! 🥳';
      showToast('☕ Rishwat (Chai) Accepted! Himanshi ji is happy! 🥳');
    } else {
      if (desc) desc.innerHTML = 'Garam samosa with teekhi & meethi chutney received! 🥟✨<br/>VIP clearance granted, portfolio maze se enjoy karo! 🥳';
      showToast('🥟 Rishwat (Samosa) Accepted! VIP Pass unlocked! 🥳');
    }
    rishwatSuccessState.classList.add('active');
  }

  setTimeout(() => {
    closeRishwatPopupDirect();
  }, 2600);
}

// Global click interceptor for any links or elements attempting to go to other page
document.addEventListener('click', (e) => {
  const targetLink = e.target.closest('a[href^="http"], a[target="_blank"], .rishwat-trigger, .external-link');
  if (targetLink) {
    e.preventDefault();
    e.stopPropagation();
    const destination = targetLink.getAttribute('href') || targetLink.innerText || 'other page';
    triggerRishwat(e, destination);
  }
});

// ==========================================================================
// 🔤 HERO TITLE — ANIMATED FONT CYCLING
// ==========================================================================
const fontCycleList = [
  { font: '"Playfair Display", serif',       label: 'Playfair Display' },
  { font: '"JetBrains Mono", monospace',     label: 'JetBrains Mono' },
  { font: '"Georgia", serif',                label: 'Georgia' },
  { font: '"Courier New", monospace',        label: 'Courier New' },
  { font: '"Trebuchet MS", sans-serif',      label: 'Trebuchet MS' },
  { font: '"Inter", sans-serif',             label: 'Inter' },
];
let fontCycleIdx = 0;
const portfolioTitle = document.getElementById('portfolio-title');

function cycleFontStep() {
  if (!portfolioTitle) return;
  fontCycleIdx = (fontCycleIdx + 1) % fontCycleList.length;
  const next = fontCycleList[fontCycleIdx];
  // flash out
  portfolioTitle.style.transition = 'opacity 0.18s ease, transform 0.18s ease';
  portfolioTitle.style.opacity = '0';
  portfolioTitle.style.transform = 'scale(0.94) translateY(6px)';
  setTimeout(() => {
    portfolioTitle.style.fontFamily = next.font;
    portfolioTitle.style.opacity = '1';
    portfolioTitle.style.transform = 'scale(1) translateY(0)';
  }, 200);
}

// Start cycling every 1.6 seconds after 1s delay
let fontCycleInterval = null;
window.addEventListener('load', () => {
  setTimeout(() => {
    fontCycleInterval = setInterval(cycleFontStep, 1600);
    // Stop after 10 cycles so it doesn't distract forever
    setTimeout(() => {
      clearInterval(fontCycleInterval);
      // Settle back to default
      if (portfolioTitle) {
        portfolioTitle.style.transition = 'opacity 0.4s ease, transform 0.4s ease, font-family 0s';
        portfolioTitle.style.opacity = '0';
        setTimeout(() => {
          portfolioTitle.style.fontFamily = '"Playfair Display", serif';
          portfolioTitle.style.opacity = '1';
          portfolioTitle.style.transform = 'scale(1)';
        }, 420);
      }
    }, 1600 * 10 + 1200);
  }, 1000);
});

// ==========================================================================
// 🎨 TEPI POPUP — fires once when Branding Systems section enters viewport
// ==========================================================================
let tepiShown = false;

function closeTepiPopup(e) {
  if (e && e.target !== document.getElementById('tepi-popup-overlay')) return;
  closeTepiPopupDirect();
}

function closeTepiPopupDirect() {
  const overlay = document.getElementById('tepi-popup-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function showTepiPopup() {
  if (tepiShown) return;
  tepiShown = true;
  playCuteChime('pop');
  const overlay = document.getElementById('tepi-popup-overlay');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Auto-dismiss after 6s
    setTimeout(() => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }, 6000);
  }
}

// Intersection Observer — trigger tepi when branding section is 40% visible
const brandingSection = document.getElementById('branding');
if (brandingSection) {
  const tepiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !tepiShown) {
        showTepiPopup();
      }
    });
  }, { threshold: 0.4 });
  tepiObserver.observe(brandingSection);
}

// ==========================================================================
// ✨ CURSOR GLOW TRAIL
// ==========================================================================
(function initCursorTrail() {
  const canvas = document.getElementById('cursor-trail');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  const particles = [];
  let mx = -999, my = -999;

  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: mx + (Math.random() - 0.5) * 10,
        y: my + (Math.random() - 0.5) * 10,
        r: Math.random() * 6 + 2,
        alpha: 0.7 + Math.random() * 0.3,
        hue: Math.random() * 60 + 200, // blue-purple range
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2 - 0.5,
      });
    }
  });

  function animateTrail() {
    ctx.clearRect(0, 0, W, H);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.r *= 0.94;
      p.alpha *= 0.88;
      if (p.alpha < 0.02 || p.r < 0.3) {
        particles.splice(i, 1);
        continue;
      }
      ctx.beginPath();
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      grad.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${p.alpha})`);
      grad.addColorStop(1, `hsla(${p.hue}, 80%, 70%, 0)`);
      ctx.fillStyle = grad;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
})();

// ==========================================================================
// 🌊 SCROLL-REVEAL — Fade-in sections on scroll
// ==========================================================================
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.case-study-card, .logo-card, .metric-box, .slide-img-box');
  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));
})();
