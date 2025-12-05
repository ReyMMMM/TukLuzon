const galleryData = {
        hundredIslands: {
          title: "HUNDRED ISLANDS",
          images: [
            "images/hundredislands/hundredislands1.png",
            "images/hundredislands/hundredislands2.png",
            "images/hundredislands/hundredislands3.png",
            "images/hundredislands/hundredislands4.png",
            "images/hundredislands/hundredislands5.png",
            "images/hundredislands/hundredislands6.png",
          ],
          altText: "Hundred Islands",
        },
        mtPulag: {
          title: "MT. PULAG",
          images: [
            "images/mtpulag/mtpulag1.png",
            "images/mtpulag/mtpulag2.png",
            "images/mtpulag/mtpulag3.png",
            "images/mtpulag/mtpulag4.png",
            "images/mtpulag/mtpulag5.png",
            "images/mtpulag/mtpulag6.png",
          ],
          altText: "Mt. Pulag",
        },
        sumaguingCave: {
          title: "SAGADA SUMAGUING CAVE",
          images: [
            "images/sumaguingcave/sumaguing1.png",
            "images/sumaguingcave/sumaguing2.png",
            "images/sumaguingcave/sumaguing3.png",
            "images/sumaguingcave/sumaguing4.png",
            "images/sumaguingcave/sumaguing5.png",
            "images/sumaguingcave/sumaguing6.png",
          ],
          altText: "Sagada Sumaguing Cave",
        },
        vigan: {
          title: "VIGAN",
          images: [
            "images/vigan/vigan1.png",
            "images/vigan/vigan2.png",
            "images/vigan/vigan3.png",
            "images/vigan/vigan4.png",
            "images/vigan/vigan5.png",
            "images/vigan/vigan6.png",
          ],
          altText: "Vigan",
        },
      };

      let currentGallery = "hundredIslands";
      let isTransitioning = false;
      const galleryKeys = Object.keys(galleryData);
      let currentIndex = 0;

      // DOM elements
      const locationTitle = document.querySelector(".location-title");
      const galleryContainer = document.querySelector(".gallery-container");
      const navigationButtons = document.querySelectorAll(".navigation-button");
      const arrowPrev = document.getElementById("arrowPrev");
      const arrowNext = document.getElementById("arrowNext");

      // Initialize
      function initGallery() {
        loadGallery(currentGallery, true);
        currentIndex = galleryKeys.indexOf(currentGallery);
        setActiveNavigationButton(currentIndex);

        // Add event listeners
        navigationButtons.forEach((button, index) => {
          button.addEventListener("click", () => {
            if (!isTransitioning) navigateToGallery(galleryKeys[index]);
          });
        });

        arrowPrev.addEventListener("click", () => {
          if (!isTransitioning) navigateToPrev();
        });

        arrowNext.addEventListener("click", () => {
          if (!isTransitioning) navigateToNext();
        });

        document.addEventListener("keydown", (e) => {
          if (!isTransitioning) {
            if (e.key === "ArrowLeft") navigateToPrev();
            else if (e.key === "ArrowRight") navigateToNext();
          }
        });
      }

      // Load gallery with clean fade out/in
      async function loadGallery(galleryKey, isInitial = false) {
        if (isTransitioning) return;
        isTransitioning = true;

        const gallery = galleryData[galleryKey];

        // STEP 1: Fade out current content (if not initial)
        if (!isInitial) {
          // Remove show classes to trigger fade out
          locationTitle.classList.remove("show");

          const currentImages = document.querySelectorAll(".img-box");
          currentImages.forEach((imgBox) => {
            imgBox.classList.remove("show");
          });

          // Wait for fade out to complete
          await wait(400);
        }

        // STEP 2: Update content
        locationTitle.textContent = gallery.title;
        updateGalleryImages(gallery);

        // STEP 3: Fade in new content
        await wait(50); // Small delay for DOM update

        locationTitle.classList.add("show");

        // Fade in images one by one
        const newImages = document.querySelectorAll(".img-box");
        for (let i = 0; i < newImages.length; i++) {
          await wait(80); // 80ms between each image
          newImages[i].classList.add("show");
        }

        // Update state
        currentGallery = galleryKey;
        currentIndex = galleryKeys.indexOf(galleryKey);
        setActiveNavigationButton(currentIndex);

        // Allow next transition
        await wait(100);
        isTransitioning = false;
      }

      // Update gallery images
      function updateGalleryImages(gallery) {
        galleryContainer.innerHTML = "";

        gallery.images.forEach((imageSrc, index) => {
          const imgBox = document.createElement("div");
          imgBox.className = "img-box";

          const img = document.createElement("img");
          img.src = imageSrc;
          img.alt = `${gallery.altText} ${index + 1}`;
          img.loading = "lazy";

          imgBox.appendChild(img);
          galleryContainer.appendChild(imgBox);
        });
      }

      // Navigation functions
      function navigateToGallery(galleryKey) {
        if (galleryKey !== currentGallery) {
          loadGallery(galleryKey);
        }
      }

      function navigateToPrev() {
        currentIndex =
          (currentIndex - 1 + galleryKeys.length) % galleryKeys.length;
        loadGallery(galleryKeys[currentIndex]);
      }

      function navigateToNext() {
        currentIndex = (currentIndex + 1) % galleryKeys.length;
        loadGallery(galleryKeys[currentIndex]);
      }

      // Set active navigation button
      function setActiveNavigationButton(index) {
        navigationButtons.forEach((button, i) => {
          button.classList.toggle("active", i === index);
        });
      }

      // Utility function for delays
      function wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      // Preload images
      function preloadImages() {
        Object.values(galleryData).forEach((gallery) => {
          gallery.images.forEach((imageSrc) => {
            const img = new Image();
            img.src = imageSrc;
          });
        });
      }

      // Initialize
      document.addEventListener("DOMContentLoaded", () => {
        initGallery();
        preloadImages();
      });