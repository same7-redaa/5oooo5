const reviewImages = [
    "74c859ce-39ac-4311-b838-cf113e8c67ce.jpg",
    "IMG_4350.PNG",
    "WhatsApp Image 2025-12-04 at 7.33.10 AM (10).jpeg",
    "WhatsApp Image 2025-12-04 at 7.33.10 AM (11).jpeg",
    "WhatsApp Image 2025-12-04 at 7.33.10 AM (12).jpeg",
    "WhatsApp Image 2025-12-04 at 7.33.10 AM (13).jpeg",
    "WhatsApp Image 2025-12-04 at 7.33.10 AM (2).jpeg",
    "WhatsApp Image 2025-12-04 at 7.33.10 AM (3).jpeg",
    "WhatsApp Image 2025-12-04 at 7.33.10 AM (4).jpeg",
    "WhatsApp Image 2025-12-04 at 7.33.10 AM (5).jpeg",
    "WhatsApp Image 2025-12-04 at 7.33.10 AM (6).jpeg",
    "WhatsApp Image 2025-12-04 at 7.33.10 AM (7).jpeg",
    "WhatsApp Image 2025-12-04 at 7.33.10 AM (8).jpeg",
    "WhatsApp Image 2025-12-04 at 7.33.10 AM (9).jpeg",
    "WhatsApp Image 2025-12-06 at 6.13.52 AM.jpeg",
    "WhatsApp Image 2025-12-06 at 7.23.39 AM (2).jpeg",
    "WhatsApp Image 2025-12-06 at 7.23.39 AM (3).jpeg",
    "WhatsApp Image 2025-12-06 at 7.23.39 AM (4).jpeg",
    "WhatsApp Image 2025-12-06 at 7.23.39 AM (5).jpeg",
    "WhatsApp Image 2025-12-06 at 7.23.39 AM.jpeg",
    "WhatsApp Image 2025-12-06 at 7.34.36 AM.jpeg",
    "WhatsApp Image 2025-12-06 at 7.39.22 AM.jpeg",
    "WhatsApp Image 2025-12-06 at 8.39.03 AM (1).jpeg",
    "WhatsApp Image 2025-12-06 at 8.39.03 AM (2).jpeg",
    "WhatsApp Image 2025-12-06 at 8.53.56 AM.jpeg",
    "WhatsApp Image 2025-12-06 at 8.53.57 AM.jpeg",
    "WhatsApp Image 2025-12-08 at 8.08.52 AM.jpeg"
];

console.log('Customer Reviews Script Loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing Reviews');
    const reviewsContainer = document.querySelector('.reviews-scroll-container');

    // Explicitly use current directory reference
    const basePath = 'assets/reviews/';

    if (reviewsContainer) {
        console.log(`Found container, adding ${reviewImages.length} images`);

        // Add Scroll Buttons - Append to the main section to allow positioning outside
        const section = document.querySelector('.customer-reviews');
        // We still need wrapper for scrolling logic
        const wrapper = document.querySelector('.reviews-wrapper');

        const btnLeft = document.createElement('button');
        btnLeft.className = 'scroll-btn scroll-left';
        btnLeft.innerHTML = '<i class="fas fa-chevron-left"></i>';
        btnLeft.ariaLabel = 'Scroll Left';

        const btnRight = document.createElement('button');
        btnRight.className = 'scroll-btn scroll-right';
        btnRight.innerHTML = '<i class="fas fa-chevron-right"></i>';
        btnRight.ariaLabel = 'Scroll Right';

        section.appendChild(btnLeft);
        section.appendChild(btnRight);

        // Scroll Handlers
        const handleScroll = (direction) => {
            isAutoScrolling = false; // Pause auto-scoll immediately
            const scrollAmount = direction === 'left' ? -350 : 350;
            wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });

            // Resume auto-scroll after interaction (if mouse leaves)
            // We don't force resume here because if mouse is over section, it should stay paused
        };

        btnLeft.addEventListener('click', () => handleScroll('left'));
        btnRight.addEventListener('click', () => handleScroll('right'));

        // Auto Scroll Logic
        let isAutoScrolling = true;
        let animationFrameId;

        function autoScroll() {
            if (isAutoScrolling) {
                // Adjust speed locally if needed
                wrapper.scrollLeft += 1;

                // Reset loop
                if (wrapper.scrollLeft >= (wrapper.scrollWidth - wrapper.clientWidth - 2)) {
                    wrapper.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        }

        // Start auto scroll
        animationFrameId = requestAnimationFrame(autoScroll);

        // Pause on hover (Section-wide to include buttons)
        section.addEventListener('mouseenter', () => {
            isAutoScrolling = false;
        });

        section.addEventListener('mouseleave', () => {
            isAutoScrolling = true;
        });

        // Touch handling (Mobile)
        section.addEventListener('touchstart', () => {
            isAutoScrolling = false;
        });

        section.addEventListener('touchend', () => {
            setTimeout(() => { isAutoScrolling = true; }, 2000);
        });

        reviewImages.forEach(imageName => {
            const card = document.createElement('div');
            // Removed 'fade-up' to avoid visibility issues if observer misses them
            card.className = 'review-card visible';

            // Encode the part with spaces/special chars just to be safe
            // But keep the slashes intact
            const imgPath = basePath + encodeURIComponent(imageName).replace(/%2F/g, "/");

            console.log('Processing:', imageName, '->', imgPath);

            card.innerHTML = `
                <div class="review-image-wrapper">
                    <img src="${imgPath}" 
                         alt="Customer Review" 
                         loading="eager" 
                         onclick="openLightbox(this.src)" 
                         onload="console.log('Loaded:', '${imageName}')"
                         onerror="console.error('FAILED TO LOAD:', '${imgPath}')">
                </div>
            `;
            reviewsContainer.appendChild(card);
        });
    } else {
        console.error('CRITICAL: .reviews-scroll-container NOT FOUND in DOM');
    }

    // Lightbox functionality
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox hidden';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-img" src="" alt="Full Screen Review">
        `;
        document.body.appendChild(lightbox);
    }

    window.openLightbox = function (src) {
        if (!src) return;
        console.log('Opening lightbox for:', src);
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        lightboxImg.src = src;
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    const closeBtn = lightbox.querySelector('.lightbox-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
});
