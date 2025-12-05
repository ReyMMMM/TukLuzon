      // Wait for the DOM to be fully loaded
      document.addEventListener("DOMContentLoaded", function () {
        // Function to check if an element is in the viewport
        // Now triggers when ANY part of element enters viewport
        function isInViewport(element) {
          const rect = element.getBoundingClientRect();
          return (
            rect.top <=
              (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
          );
        }

        // Function to handle scroll animations
        function handleScrollAnimations() {
          // Get all elements that should animate on scroll
          const animatedElements =
            document.querySelectorAll(".animate-on-scroll");

          animatedElements.forEach((element) => {
            if (isInViewport(element)) {
              // Add visible class without delay
              element.classList.add("visible");
            }
          });
        }

        // Function to initialize animation elements
        function initAnimations() {
          // Select all content elements inside sections (but not the section tags themselves)
          // Also exclude .hero-background
          const selectors = [
            // Destination sections content
            ".destination-section .container > *",
            ".destination-grid",
            ".destination-grid-2",
            ".destination-grid-3",
            ".destination-grid-4",
            ".destination-card",
            ".destination-card-alt",
            ".info-button",
            ".facts-grid",
            ".facts-grid-2",
            ".fact-item",
            ".fact-item-alt",
            ".destination-content",
            ".destination-image",
            ".destination-image-alt",

            // Navigation section content
            ".navigation-container",
            ".navigation-button",
            ".navigation-motivation",

            // Subscribe section content
            ".subscribe-header",
            ".subscribe-title",
            ".subscribe-subtitle",
            ".subscribe-text",
            ".subscribe-form",
            ".email-input",
            ".subscribe-btn",
          ];

          // Add animation classes to all matching elements
          selectors.forEach((selector) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
              // Skip if element is a section tag or inside hero-background
              if (
                !element.classList.contains("hero-background") &&
                !element.classList.contains("destination-section") &&
                !element.classList.contains("navigation-section") &&
                !element.classList.contains("subscribe-section") &&
                !element.classList.contains("hero-section") &&
                !element.closest(".hero-background") &&
                !element.closest(".hero-section")
              ) {
                element.classList.add("animate-on-scroll");

                // Add staggered delay based on element position
                const delayClass = `delay-${(index % 4) + 1}`;
                if (!element.classList.contains(delayClass)) {
                  element.classList.add(delayClass);
                }
              }
            });
          });

          // Also add animation to specific important elements
          const importantElements = [
            ".section-title",
            ".section-subtitle",
            ".destination-name",
            ".hero-box-start",
            ".cta-button",
            ".button-text",
            ".fact-number",
            ".fact-text",
            ".destination-description",
          ];

          importantElements.forEach((selector) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
              if (!element.classList.contains("animate-on-scroll")) {
                element.classList.add("animate-on-scroll");
                element.classList.add(`delay-${(index % 3) + 1}`);
              }
            });
          });

          // Trigger initial check - this will animate elements already in view
          handleScrollAnimations();
        }

        // Initialize animations when page loads
        initAnimations();

        // Add scroll event listener with throttling for performance
        let ticking = false;
        window.addEventListener("scroll", function () {
          if (!ticking) {
            window.requestAnimationFrame(function () {
              handleScrollAnimations();
              ticking = false;
            });
            ticking = true;
          }
        });

        // Also check on resize
        window.addEventListener("resize", handleScrollAnimations);

        // Check once more after a short delay to catch any missed elements
        setTimeout(handleScrollAnimations, 500);
      });