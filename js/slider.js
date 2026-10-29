// ================================================================
// ELINGA'S BUZZY HUB — IMAGE SLIDER & 3D CLAYMORPHIC ICON DOCK
// ================================================================

const featureDirectory = {
  campus: {
    src: 'images/preschool-campus-facade.jpg',
    title: "Elingas Buzzy Hub · Madipakkam Campus (9 AM - 9 PM)",
    sub: 'MADIPAKKAM, CHENNAI · WWW.ELINGASBUZZYHUB.IN · CHILD-SAFE ATELIER',
    alt: "Elingas Buzzy Hub Madipakkam Chennai campus entrance and play hub"
  },
  playschool: {
    src: 'images/feature-play-school.jpg',
    title: '🏰 Play Area · Hourly Pay-As-You-Go (Starts ₹69/hr)',
    sub: '9:00 AM – 9:00 PM · PADDED FOAM ARENA & SOFT BALL PITS · HOURLY ACCESS',
    alt: 'Joyful toddlers playing with tactile toys and building blocks in safe play area'
  },
  indoor: {
    src: 'images/feature-safe-environment.jpg',
    title: '🎯 Indoor Games · 365 Days a Year (Pre-Booking Basis)',
    sub: 'OPEN 365 DAYS · ANY TIME ON PRE-BOOKING · PRIVATE FAMILY SLOTS',
    alt: 'Kids engaged in interactive games and educational activities in a secure hall'
  },
  daycare: {
    src: 'images/feature-day-care.jpg',
    title: '🍼 Day Care & Personal Diary (Starts ₹150 · 6 Mos - 10 Yrs)',
    sub: '9:00 AM – 7:00 PM · DEDICATED CARETAKER · WATER & SLEEP TRACKER DIARY',
    alt: 'Caring caretaker tending to resting toddlers in peaceful nursery'
  },
  meals: {
    src: 'images/feature-healthy-meals.jpg',
    title: '🥣 Day Care Healthy Foods & Nutritious Snacks',
    sub: 'FRESH FRUIT BOWLS · STEAMED IDLIS · HYGIENIC CHILD-SAFE NUTRITION',
    alt: 'South Indian toddlers enjoying warm mini idlis and fresh wholesome fruits'
  },
  parties: {
    src: 'images/kinder-brighter-world.jpg',
    title: '🎂 Birthday Parties & Events (Mini AC Hall, Food & Gifts)',
    sub: 'ANY TIME BY BOOKING · COZY AC PARTY HALL · FOOD & RETURN GIFTS INCLUDED',
    alt: 'Festive celebration hall for children birthday parties and family events'
  },
  teachers: {
    src: 'images/feature-caring-teachers.jpg',
    title: '💖 Dedicated Caretakers & Mentors (1:5 Ratio)',
    sub: '1:5 LOW CARE RATIO · MADIPAKKAM EDUCATORS · PERSONAL DIARY DISPATCH',
    alt: 'Warm educator mentoring little children with care and storybooks'
  }
};

const featureKeys = ['campus', 'playschool', 'indoor', 'daycare', 'meals', 'parties', 'teachers'];
let currentFeatureIndex = 0;
let slideInterval = null;

// Core Synchronized Feature Selection Handler
function triggerFeatureSelect(featureKey) {
  const data = featureDirectory[featureKey];
  if (!data) return;

  currentFeatureIndex = featureKeys.indexOf(featureKey);
  if (currentFeatureIndex === -1) currentFeatureIndex = 0;

  const mainImg = document.getElementById('mainHeroImg');
  const titleEl = document.getElementById('facadeTitle');

  if (mainImg) {
    mainImg.style.opacity = '0.25';
    mainImg.style.transform = 'scale(0.98)';
    setTimeout(() => {
      mainImg.src = data.src;
      mainImg.alt = data.alt;
      if (titleEl) titleEl.textContent = data.title;
      mainImg.style.opacity = '1';
      mainImg.style.transform = 'scale(1)';
    }, 160);
  }

  // Synchronize and highlight matching icon-only button sitting on top of images
  document.querySelectorAll('.feat-overlay-btn').forEach(btn => {
    if (btn.getAttribute('data-feature') === featureKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function slideFeatureNext() {
  currentFeatureIndex = (currentFeatureIndex + 1) % featureKeys.length;
  triggerFeatureSelect(featureKeys[currentFeatureIndex]);
}

function slideFeaturePrev() {
  currentFeatureIndex = (currentFeatureIndex - 1 + featureKeys.length) % featureKeys.length;
  triggerFeatureSelect(featureKeys[currentFeatureIndex]);
}

// Bind clicks for the floating icon-only overlay dock on top of the image
document.querySelectorAll('.feat-overlay-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const feat = btn.getAttribute('data-feature');
    triggerFeatureSelect(feat);
    resetAutoSlide();
  });
});

// Auto-advance sliding images every 6 seconds, pausing on hover
function startAutoSlide() {
  slideInterval = setInterval(() => {
    slideFeatureNext();
  }, 6000);
}

function resetAutoSlide() {
  if (slideInterval) clearInterval(slideInterval);
  startAutoSlide();
}

const heroFacadeCard = document.querySelector('.hero-facade-card');
if (heroFacadeCard) {
  heroFacadeCard.addEventListener('mouseenter', () => {
    if (slideInterval) clearInterval(slideInterval);
  });
  heroFacadeCard.addEventListener('mouseleave', () => {
    startAutoSlide();
  });
}

// Start auto slide
startAutoSlide();
