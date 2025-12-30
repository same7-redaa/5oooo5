// Clients Logos Display - From Local Folder
(function() {
    'use strict';
    
    // All client logos
    const logos = [
        'لوجوهات/230702483_362991718668157_1435711560957940266_n.jpg',
        'لوجوهات/392874914_241605702223481_6692034225718536892_n.jpg',
        'لوجوهات/3b44fafe-e1e0-45cc-ab2a-d337bbbd87f3.jpg',
        'لوجوهات/3ed9c41b-4381-4700-aa82-65936aae495f (1).jpg',
        'لوجوهات/488886367_986693776939692_6659382859057974418_n.jpg',
        'لوجوهات/83f54a6a-5b30-4147-81c0-c70f73934ea9.jpg',
        'لوجوهات/8b2701c1-13db-4a98-a35b-cdbd0ac3fb15.jpg',
        'لوجوهات/9bc286d6-b007-4af0-a66a-cec2cd0e8d62.jpg',
        'لوجوهات/Picture1.jpg',
        'لوجوهات/Picture10.png',
        'لوجوهات/Picture11.jpg',
        'لوجوهات/Picture12.jpg',
        'لوجوهات/Picture13.jpg',
        'لوجوهات/Picture14.png',
        'لوجوهات/Picture15.jpg',
        'لوجوهات/Picture17.png',
        'لوجوهات/Picture18.png',
        'لوجوهات/Picture2.jpg',
        'لوجوهات/Picture4.png',
        'لوجوهات/Picture7.jpg',
        'لوجوهات/Picture9.jpg',
        'لوجوهات/unitedlogo.png',
        'لوجوهات/WhatsApp Image 2024-11-27 at 9.18.46 AM (2).jpeg',
        'لوجوهات/WhatsApp Image 2024-11-27 at 9.18.46 AM.jpeg',
        'لوجوهات/WhatsApp Image 2024-11-27 at 9.18.47 AM (2).jpeg',
        'لوجوهات/WhatsApp Image 2024-11-27 at 9.18.47 AM.jpeg',
        'لوجوهات/WhatsApp Image 2024-11-27 at 9.24.14 AM.jpeg'
    ];
    
    // Display logos
    function displayLogos() {
        const grid = document.getElementById('clientsGallery');
        if (!grid) {
            console.log('Clients gallery not found');
            return;
        }
        
        grid.innerHTML = '';
        
        logos.forEach((logoSrc, index) => {
            const img = document.createElement('img');
            img.src = logoSrc;
            img.alt = 'شعار عميل ' + (index + 1);
            img.className = 'client-logo';
            img.loading = 'lazy';
            
            grid.appendChild(img);
        });
        
        console.log('✓ Loaded ' + logos.length + ' client logos');
    }
    
    // Initial load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', displayLogos);
    } else {
        displayLogos();
    }
    
})();
