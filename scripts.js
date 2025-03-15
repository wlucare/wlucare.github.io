document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-links') && !event.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
        }
    });
    
    // New Team Carousel Implementation
    initTeamCarousel();
    
    function initTeamCarousel() {
        const carousels = document.querySelectorAll('.team-carousel');
        
        carousels.forEach(carousel => {
            // Get all team members
            const teamMembers = carousel.querySelectorAll('.team-member');
            if (teamMembers.length <= 1) return; // Don't initialize if only one or zero members
            
            // Create carousel structure
            carousel.classList.add('carousel-container');
            
            // Create fixed navigation controls
            const controls = document.createElement('div');
            controls.className = 'carousel-controls';
            
            const prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-btn prev';
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-btn next';
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            
            controls.appendChild(prevBtn);
            controls.appendChild(nextBtn);
            
            // Create indicators
            const indicators = document.createElement('div');
            indicators.className = 'carousel-indicators';
            
            teamMembers.forEach((_, index) => {
                const indicator = document.createElement('button');
                indicator.className = 'carousel-indicator';
                indicator.setAttribute('aria-label', `Slide ${index + 1}`);
                if (index === 0) indicator.classList.add('active');
                indicator.dataset.index = index;
                indicators.appendChild(indicator);
            });
            
            // Create slides container
            const slidesContainer = document.createElement('div');
            slidesContainer.className = 'carousel-slides';
            
            // Move team members into slides container
            teamMembers.forEach(member => {
                slidesContainer.appendChild(member);
            });
            
            // Assemble carousel
            carousel.appendChild(controls);
            carousel.appendChild(slidesContainer);
            carousel.appendChild(indicators);
            
            // Set initial state
            let currentSlide = 0;
            updateCarousel();
            
            // Navigation event listeners
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + teamMembers.length) % teamMembers.length;
                updateCarousel();
            });
            
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % teamMembers.length;
                updateCarousel();
            });
            
            // Indicator event listeners
            indicators.querySelectorAll('.carousel-indicator').forEach(indicator => {
                indicator.addEventListener('click', () => {
                    currentSlide = parseInt(indicator.dataset.index);
                    updateCarousel();
                });
            });
            
            // Update carousel display
            function updateCarousel() {
                // Update slides position
                slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Update indicators
                indicators.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
                    if (index === currentSlide) {
                        indicator.classList.add('active');
                        indicator.setAttribute('aria-current', 'true');
                    } else {
                        indicator.classList.remove('active');
                        indicator.removeAttribute('aria-current');
                    }
                });
            }
        });
    }
    
    // Function to handle mobile dropdown menus
    function setupMobileDropdowns() {
        const dropdownLinks = document.querySelectorAll('.dropdown > a');
        
        // Remove existing event listeners by cloning and replacing elements
        dropdownLinks.forEach(link => {
            const clone = link.cloneNode(true);
            link.parentNode.replaceChild(clone, link);
        });
        
        // Add new event listeners based on current window width
        const refreshedDropdownLinks = document.querySelectorAll('.dropdown > a');
        
        if (window.innerWidth <= 768) {
            refreshedDropdownLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const dropdownContent = this.nextElementSibling;
                    
                    // Toggle current dropdown
                    dropdownContent.style.display = 
                        dropdownContent.style.display === 'block' ? 'none' : 'block';
                });
            });
        } else {
            // Reset any inline styles for desktop view
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.style.display = '';
            });
        }
    }
    
    // Initial setup
    setupMobileDropdowns();
    
    // Re-setup on window resize
    window.addEventListener('resize', setupMobileDropdowns);
    
    // Interactive cards functionality - Tab-based navigation
    if (document.querySelector('.interactive-nav')) {
        const categoryCards = document.querySelectorAll('.category-card');
        const contentSections = document.querySelectorAll('.content-section');
        
        // Show first content section by default
        if (contentSections.length > 0) {
            contentSections[0].classList.add('active');
            categoryCards[0].classList.add('active');
        }
        
        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const targetId = card.getAttribute('data-target');
                
                // Hide all content sections
                contentSections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Remove active class from all cards
                categoryCards.forEach(c => {
                    c.classList.remove('active');
                });
                
                // Show target content section
                document.getElementById(targetId).classList.add('active');
                
                // Add active class to clicked card
                card.classList.add('active');
            });
        });
    }
});