// ================================================================
// ELINGA'S BUZZY HUB — 3D INTERACTIVE STORYBOOK / FLIPBOOK CONTROLLER
// ================================================================

const bookPages = [
  { feature: 'campus', title: '📖 Storybook: Campus Entrance' },
  { feature: 'playschool', title: '🏰 Storybook: Play Area (₹69/hr)' },
  { feature: 'indoor', title: '🎯 Storybook: Indoor Games (365 Days)' },
  { feature: 'daycare', title: '🍼 Storybook: Day Care & Personal Diary' },
  { feature: 'meals', title: '🥣 Storybook: Healthy Foods & Nutrition' },
  { feature: 'parties', title: '🎂 Storybook: Birthday Parties & AC Hall' },
  { feature: 'teachers', title: '💖 Storybook: Dedicated Mentors (1:5)' }
];

let currentBookPage = 0;
const totalBookPages = bookPages.length;
let bookAutoTimer = null;

// Flip to a specific page index (0 to totalBookPages - 1)
function flipToPage(targetPageIndex) {
  if (targetPageIndex < 0) targetPageIndex = 0;
  if (targetPageIndex >= totalBookPages) targetPageIndex = totalBookPages - 1;

  currentBookPage = targetPageIndex;

  const pages = document.querySelectorAll('.flipbook-page');
  pages.forEach((page) => {
    const pageNum = parseInt(page.getAttribute('data-page'), 10);
    if (pageNum < targetPageIndex) {
      // Pages before the target are flipped over to the left
      page.classList.add('flipped');
    } else {
      // Current and subsequent pages remain facing forward
      page.classList.remove('flipped');
    }
  });

  // Update Chapter Title Indicator
  const titleEl = document.getElementById('facadeTitle');
  if (titleEl && bookPages[currentBookPage]) {
    titleEl.textContent = bookPages[currentBookPage].title;
  }

  // Update Active State on Chapter Bookmark Navigation Dock
  const currentFeature = bookPages[currentBookPage].feature;
  document.querySelectorAll('.feat-overlay-btn').forEach((btn) => {
    if (btn.getAttribute('data-feature') === currentFeature) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Flip forward one page
function flipNextPage() {
  if (currentBookPage < totalBookPages - 1) {
    flipToPage(currentBookPage + 1);
  } else {
    // Loop back to beginning of storybook
    flipToPage(0);
  }
}

// Flip backward one page
function flipPrevPage() {
  if (currentBookPage > 0) {
    flipToPage(currentBookPage - 1);
  } else {
    // Jump to the final page
    flipToPage(totalBookPages - 1);
  }
}

// Handle tap / click anywhere on the book container
function handleBookClick(event) {
  // If user clicked a chapter button or navigation arrow, don't trigger book body flip
  if (event.target.closest('.feat-overlay-btn') || event.target.closest('.gallery-nav-arrow') || event.target.closest('.turn-hint')) {
    return;
  }

  const rect = event.currentTarget.getBoundingClientRect();
  const clickX = event.clientX - rect.left;

  // Clicking on the right 60% of the book flips forward; clicking left 40% flips back
  if (clickX > rect.width * 0.4) {
    flipNextPage();
  } else {
    flipPrevPage();
  }
}

// Compatibility helper so external buttons (e.g. from service cards or garden) can open the book to a feature
function triggerFeatureSelect(featureKey) {
  const targetIndex = bookPages.findIndex(p => p.feature === featureKey);
  if (targetIndex !== -1) {
    flipToPage(targetIndex);
    // Smoothly scroll to the book if not currently in view
    const bookEl = document.getElementById('buzzyFlipbook');
    if (bookEl) {
      bookEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// Touch swipe gesture support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

const flipbookElement = document.getElementById('buzzyFlipbook');
if (flipbookElement) {
  flipbookElement.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  flipbookElement.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleBookSwipe();
  }, { passive: true });
}

function handleBookSwipe() {
  const swipeDistance = touchStartX - touchEndX;
  // Swipe left: turn forward (minimum 40px threshold)
  if (swipeDistance > 40) {
    flipNextPage();
  } 
  // Swipe right: turn backward
  else if (swipeDistance < -40) {
    flipPrevPage();
  }
}

// Gentle ambient auto-turn every 7 seconds, pausing when user hovers or interacts
function startBookAutoTurn() {
  bookAutoTimer = setInterval(() => {
    flipNextPage();
  }, 7000);
}

function stopBookAutoTurn() {
  if (bookAutoTimer) clearInterval(bookAutoTimer);
}

const bookCard = document.querySelector('.hero-flipbook-card');
if (bookCard) {
  bookCard.addEventListener('mouseenter', stopBookAutoTurn);
  bookCard.addEventListener('mouseleave', startBookAutoTurn);
  bookCard.addEventListener('touchstart', stopBookAutoTurn, { passive: true });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  flipToPage(0);
  startBookAutoTurn();
});
