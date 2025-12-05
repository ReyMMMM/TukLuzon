// page-transition.js - Smooth fade transition with header visibility

document.addEventListener('DOMContentLoaded', function() {
  // Create transition overlay
  const overlay = document.createElement('div');
  overlay.className = 'transition-overlay';
  document.body.appendChild(overlay);
  
  // Find main content area (or create one if doesn't exist)
  let mainContent = document.querySelector('.main-content') || 
                    document.querySelector('main') ||
                    document.querySelector('.container') ||
                    document.querySelector('section:not(.header)') ||
                    document.body;
  
  // If no main content element found, wrap everything except header
  if (mainContent === document.body) {
    const header = document.querySelector('.header');
    const allChildren = Array.from(document.body.children);
    
    // Create wrapper for non-header content
    const wrapper = document.createElement('div');
    wrapper.className = 'main-content';
    
    // Move all non-header elements into wrapper
    allChildren.forEach(child => {
      if (child !== header && child !== overlay) {
        wrapper.appendChild(child);
      }
    });
    
    // Add wrapper to body
    document.body.appendChild(wrapper);
    mainContent = wrapper;
  }
  
  // Add page-load class for initial fade in
  mainContent.classList.add('page-load');
  
  // Handle navigation clicks
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Skip if no href, anchor links, external links, or special protocols
    if (!href || 
        href.startsWith('#') || 
        href.startsWith('javascript:') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        (href.startsWith('http') && !href.includes(window.location.hostname))) {
      return;
    }
    
    // Skip if clicking on current page
    const currentPath = window.location.pathname;
    const isIndexPage = currentPath.endsWith('/') || currentPath.endsWith('index.html');
    const isTargetIndex = href === 'index.html' || href === './' || href === '/';
    
    if ((isIndexPage && isTargetIndex) || 
        (!isIndexPage && currentPath.includes(href.replace('./', '')))) {
      return;
    }
    
    e.preventDefault();
    
    // Start transition - FADE OUT
    document.body.classList.add('transitioning');
    mainContent.style.opacity = '0';
    
    // Show overlay after content starts fading
    setTimeout(() => {
      overlay.classList.add('active');
    }, 150);
    
    // Navigate after fade out completes
    setTimeout(() => {
      window.location.href = href;
    }, 400);
  });
  
  // Handle page load - FADE IN
  function handlePageLoad() {
    // Hide overlay immediately
    overlay.classList.remove('active');
    
    // Remove transitioning class
    setTimeout(() => {
      document.body.classList.remove('transitioning');
      
      // Fade in content
      if (mainContent) {
        mainContent.style.opacity = '1';
        mainContent.classList.add('page-load');
        
        // Remove animation class after it completes
        setTimeout(() => {
          mainContent.classList.remove('page-load');
        }, 500);
      }
    }, 50);
  }
  
  // Handle initial load
  if (document.readyState === 'complete') {
    setTimeout(handlePageLoad, 100);
  } else {
    window.addEventListener('load', function() {
      setTimeout(handlePageLoad, 100);
    });
  }
  
  // Handle browser back/forward
  window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      handlePageLoad();
    }
  });
  
  console.log('Page transitions enabled - Smooth fade with persistent header');
});