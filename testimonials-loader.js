// Testimonials - Random 6 Company Images Display
(function() {
    'use strict';
    
    // All company images
    const allImages = [
        'companies/company-1/218aa68d-831e-4030-858c-6ba93b1f05d9.jpg',
        'companies/company-1/48b59542-cdf2-495d-8102-154823ad608a.jpg',
        'companies/company-1/5906ccf0-8dfc-409d-a38a-a9a5bfa33a2a.jpg',
        'companies/company-1/69d9610c-d8aa-4fad-8ca4-92496a99fe2e.jpg',
        'companies/company-1/WhatsApp Image 2025-12-01 at 8.19.59 AM.jpeg',
        'companies/company-2/1d2bcfc8-e317-4e2b-9e13-fad0ae16443a.jpg',
        'companies/company-2/55ffcd65-5ec3-4f94-9790-7d59874cbee4.jpg',
        'companies/company-2/6bad72b6-451b-42d4-8380-be63b6e21601.jpg',
        'companies/company-2/971c1e87-dcae-4b68-a3b8-3ddea83e1a3a.jpg',
        'companies/company-2/c5dd5a14-bcc5-41f5-ab9c-d1fed341d0e4.jpg',
        'companies/company-complex/WhatsApp Image 2025-10-30 at 5.34.17 AM.jpeg',
        'companies/company-complex/WhatsApp Image 2025-10-30 at 5.34.18 AM.jpeg',
        'companies/company-complex/WhatsApp Image 2025-10-30 at 5.49.37 AM.jpeg',
        'companies/company-complex/WhatsApp Image 2025-10-30 at 5.49.44 AM.jpeg',
        'companies/company-complex/WhatsApp Image 2025-10-30 at 5.49.45 AM.jpeg',
        'companies/company-complex/WhatsApp Image 2025-10-30 at 5.49.50 AM.jpeg'
    ];
    
    // Get 6 random images
    function getRandomImages() {
        const shuffled = [...allImages].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 6);
    }
    
    // Display images
    function displayImages() {
        const grid = document.getElementById('testimonialsGrid');
        if (!grid) {
            console.log('Testimonials grid not found');
            return;
        }
        
        // Fade out current images
        const currentItems = grid.querySelectorAll('.testimonial-item');
        currentItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
        });
        
        // Wait for fade out, then replace
        setTimeout(() => {
            grid.innerHTML = '';
            const randomImages = getRandomImages();
            
            randomImages.forEach((imgSrc, index) => {
                const div = document.createElement('div');
                div.className = 'testimonial-item';
                div.style.opacity = '0';
                div.style.transform = 'scale(0.9)';
                div.style.transition = 'all 0.6s ease';
                
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = 'قصة نجاح ' + (index + 1);
                img.loading = 'lazy';
                
                div.appendChild(img);
                grid.appendChild(div);
                
                // Fade in with delay
                setTimeout(() => {
                    div.style.opacity = '1';
                    div.style.transform = 'scale(1)';
                }, 50 + (index * 100));
            });
            
            console.log('✓ Loaded 6 testimonial images');
        }, 400);
    }
    
    // Initial load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', displayImages);
    } else {
        displayImages();
    }
    
    // Auto refresh every 10 seconds
    setInterval(displayImages, 10000);
    
})();
