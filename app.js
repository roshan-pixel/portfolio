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
