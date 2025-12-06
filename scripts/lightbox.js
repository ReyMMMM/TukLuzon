// lightbox.js - Image lightbox functionality for TukLuzon

class Lightbox {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.captions = [];
    this.currentPageImages = [];
    this.initializeLightbox();
  }

  // Initialize the lightbox
  initializeLightbox() {
    // Create lightbox HTML structure
    this.createLightboxHTML();
    
    // Get DOM elements
    this.lightbox = document.getElementById('image-lightbox');
    this.lightboxImg = document.getElementById('lightbox-image');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.closeBtn = document.querySelector('.lightbox-close');
    this.prevBtn = document.querySelector('.lightbox-prev');
    this.nextBtn = document.querySelector('.lightbox-next');
    
    // Add event listeners
    this.addEventListeners();
    
    // Initialize click events on all images
    this.initializeImageClicks();
  }

  // Create lightbox HTML structure
  createLightboxHTML() {
    if (document.getElementById('image-lightbox')) return;

    const lightboxHTML = `
      <div id="image-lightbox" class="lightbox">
        <span class="lightbox-close">&times;</span>
        <span class="lightbox-nav lightbox-prev">&#10094;</span>
        <span class="lightbox-nav lightbox-next">&#10095;</span>
        <div class="lightbox-content">
          <img id="lightbox-image" class="lightbox-image" src="" alt="">
          <div id="lightbox-caption" class="lightbox-caption"></div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
  }

  // Add event listeners to lightbox elements
  addEventListeners() {
    // Close lightbox on close button click
    this.closeBtn.addEventListener('click', () => this.closeLightbox());
    
    // Close lightbox when clicking outside image
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });
    
    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
        this.closeLightbox();
      }
    });
    
    // Navigation arrows
    this.prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.prevImage();
    });
    
    this.nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.nextImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      
      if (e.key === 'ArrowLeft') {
        this.prevImage();
      } else if (e.key === 'ArrowRight') {
        this.nextImage();
      }
    });
  }

  // Initialize click events on all images
  initializeImageClicks() {
    // Select all images that should be clickable
    const clickableImages = [
      '.img-box img',
      '.destination-image',
      '.destination-image-alt',
      '.gallery-container img',
      '.destination-card img:not(.icon-history):not(.icon-location)',
      '.info-button img:not(.icon-history):not(.icon-location)'
    ];
    
    // Wait a bit for dynamic content to load
    setTimeout(() => {
      this.setupImageClickEvents();
    }, 100);
  }

  // Setup click events for images (can be called multiple times for dynamic content)
  setupImageClickEvents() {
    const selectors = [
      '.gallery-container img',
      '.img-box img',
      '.destination-image',
      '.destination-image-alt',
      '.destination-card img:not(.icon-history):not(.icon-location)'
    ];
    
    selectors.forEach(selector => {
      const images = document.querySelectorAll(selector);
      images.forEach((img, index) => {
        // Check if image is inside navigation-section and skip it
        if (img.closest('.navigation-section') || img.closest('.navigation-container')) {
          return; // Skip navigation thumbnails
        }
        
        // Remove any existing click event to avoid duplicates
        img.removeEventListener('click', this.handleImageClick);
        
        // Add new click event
        img.addEventListener('click', (e) => this.handleImageClick(e, img));
      });
    });
  }

  // Handle image click
  handleImageClick(e, clickedImg) {
    e.preventDefault();
    e.stopPropagation();
    
    // Get all images on the current page (excluding navigation thumbnails)
    this.collectPageImages();
    
    // Find the clicked image index
    const clickedIndex = Array.from(this.currentPageImages).findIndex(
      pageImg => pageImg.src === clickedImg.src
    );
    
    if (clickedIndex !== -1) {
      this.openLightbox(clickedIndex);
    }
  }

  // Collect all images on the current page (excluding navigation thumbnails)
  collectPageImages() {
    const selectors = [
      '.gallery-container img',
      '.img-box img',
      '.destination-image',
      '.destination-image-alt',
      '.destination-card img:not(.icon-history):not(.icon-location)'
    ];
    
    this.currentPageImages = [];
    this.captions = [];
    
    selectors.forEach(selector => {
      const images = document.querySelectorAll(selector);
      images.forEach(img => {
        // Skip navigation thumbnails
        if (img.closest('.navigation-section') || img.closest('.navigation-container')) {
          return;
        }
        
        // Skip duplicate images
        if (!this.currentPageImages.some(existing => existing.src === img.src)) {
          this.currentPageImages.push(img);
          this.captions.push(img.alt || '');
        }
      });
    });
  }

  // Open lightbox with specific image
  openLightbox(index) {
    if (index < 0 || index >= this.currentPageImages.length) return;
    
    this.currentIndex = index;
    const image = this.currentPageImages[index];
    
    // Set image source and caption
    this.lightboxImg.src = image.src;
    this.lightboxImg.alt = image.alt;
    this.lightboxCaption.textContent = image.alt || '';
    
    // Show lightbox
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Preload adjacent images
    this.preloadAdjacentImages();
  }

  // Close lightbox
  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Clear image source to free memory
    setTimeout(() => {
      this.lightboxImg.src = '';
      this.lightboxImg.alt = '';
      this.lightboxCaption.textContent = '';
    }, 300);
  }

  // Show previous image
  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.currentPageImages.length) % this.currentPageImages.length;
    this.updateLightboxImage();
  }

  // Show next image
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.currentPageImages.length;
    this.updateLightboxImage();
  }

  // Update lightbox with current image
  updateLightboxImage() {
    const image = this.currentPageImages[this.currentIndex];
    
    // Add fade animation
    this.lightboxImg.style.opacity = '0';
    
    setTimeout(() => {
      this.lightboxImg.src = image.src;
      this.lightboxImg.alt = image.alt;
      this.lightboxCaption.textContent = image.alt || '';
      this.lightboxImg.style.opacity = '1';
      
      // Preload adjacent images
      this.preloadAdjacentImages();
    }, 200);
  }

  // Preload adjacent images for smoother navigation
  preloadAdjacentImages() {
    const preloadIndices = [
      (this.currentIndex - 1 + this.currentPageImages.length) % this.currentPageImages.length,
      (this.currentIndex + 1) % this.currentPageImages.length
    ];
    
    preloadIndices.forEach(index => {
      if (index >= 0 && index < this.currentPageImages.length) {
        const img = new Image();
        img.src = this.currentPageImages[index].src;
      }
    });
  }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.imageLightbox = new Lightbox();
});

// Hook into the gallery.js functions to re-attach click events after gallery changes
if (typeof loadGallery !== 'undefined') {
  // Store the original loadGallery function
  const originalLoadGallery = loadGallery;
  
  // Override the loadGallery function to re-attach lightbox events
  window.loadGallery = async function(galleryKey, isInitial = false) {
    // Call the original function
    const result = await originalLoadGallery.call(this, galleryKey, isInitial);
    
    // After the gallery images are updated, re-attach lightbox click events
    setTimeout(() => {
      if (window.imageLightbox) {
        window.imageLightbox.setupImageClickEvents();
      }
    }, 200); // Wait for the fade-in animation to complete
    
    return result;
  };
}

// Also hook into initGallery if it exists
if (typeof initGallery !== 'undefined') {
  const originalInitGallery = initGallery;
  window.initGallery = function() {
    originalInitGallery.apply(this, arguments);
    
    // Re-initialize lightbox for dynamically loaded gallery images
    setTimeout(() => {
      if (window.imageLightbox) {
        window.imageLightbox.setupImageClickEvents();
      }
    }, 300);
  };
}

// Monitor for gallery changes (for arrow clicks and navigation button clicks)
document.addEventListener('click', function(e) {
  // Check if arrow buttons were clicked
  if (e.target.id === 'arrowPrev' || e.target.id === 'arrowNext' || 
      e.target.closest('#arrowPrev') || e.target.closest('#arrowNext')) {
    // Wait for gallery to update, then re-attach lightbox events
    setTimeout(() => {
      if (window.imageLightbox) {
        window.imageLightbox.setupImageClickEvents();
      }
    }, 400);
  }
  
  // Check if navigation buttons were clicked
  if (e.target.closest('.navigation-button')) {
    setTimeout(() => {
      if (window.imageLightbox) {
        window.imageLightbox.setupImageClickEvents();
      }
    }, 400);
  }
});

// Also listen for keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    // Check if we're on the gallery page (has gallery container)
    if (document.querySelector('.gallery-container')) {
      setTimeout(() => {
        if (window.imageLightbox) {
          window.imageLightbox.setupImageClickEvents();
        }
      }, 400);
    }
  }
});