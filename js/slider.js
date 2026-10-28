// ================================================================
// ELINGA'S BUZZY HUB — IMAGE SLIDER & 3D CLAYMORPHIC ICON DOCK
// ================================================================

const featureDirectory = {
  campus: {
    src: 'images/preschool-campus-facade.jpg',
    title: "Elinga's Buzzy Hub · Madipakkam Campus",
    sub: 'MADIPAKKAM, CHENNAI · RICE-FLOUR KOLAM ENTRANCE · TROPICAL PALMS',
    alt: "Elinga's Buzzy Hub Madipakkam Chennai campus with traditional Kolam and coconut palms"
  },
  playschool: {
    src: 'images/feature-play-school.jpg',
    title: '🏫 Play School & Sensory Learning',
    sub: 'WOODEN ALPHABET BLOCKS · TAMIL & ENGLISH PHONICS · JOYFUL CIRCLES',
    alt: 'Happy South Indian toddlers exploring wooden blocks and animal puzzles'
  },
  daycare: {
    src: 'images/feature-day-care.jpg',
    title: '☀️ Loving Day Care & Creche',
    sub: 'COZY COT NURSERIES · TENDER CHENNAI CAREGIVERS · HOME AWAY FROM HOME',
    alt: 'South Indian toddlers sleeping peacefully with pastel cotton quilts'
  },
  safety: {
    src: 'images/feature-safe-environment.jpg',
    title: '🛡️ 100% Certified Child Safety',
    sub: 'PADDED FOAM ARENA · TAMIL ALPHABET CHARTS · CHILDPROOF ACCESS',
    alt: 'Safe childproof classroom with South Indian teacher and students'
  },
  activities: {
    src: 'images/feature-fun-activities.jpg',
    title: '🎨 Creative Arts & Fun Activities',
    sub: 'TACTILE CLAY MODELING · FESTIVAL CRAFTS · PONGAL & DIWALI ATELIERS',
    alt: 'South Indian children celebrating creative arts and festival crafts'
  },
  meals: {
    src: 'images/feature-healthy-meals.jpg',
    title: '🥣 Wholesome & Nutritious Meals',
    sub: 'WARM MINI IDLIS · FRESH PAPAYA & POMEGRANATE · STEEL THALI SETS',
    alt: 'South Indian toddlers enjoying warm mini idlis and fresh fruits'
  },
  teachers: {
    src: 'images/feature-caring-teachers.jpg',
    title: '💖 Caring & Certified Educators',
    sub: '1:5 LOW CARE RATIO · MADIPAKKAM FACULTY · TENDER STORYBOOK CIRCLES',
    alt: 'Warm South Indian preschool teacher in pastel cotton attire reading with children'
  }
};

const featureKeys = ['campus', 'playschool', 'daycare', 'safety', 'activities', 'meals', 'teachers'];
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
