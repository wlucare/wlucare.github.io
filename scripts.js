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
        const interactiveNav = document.querySelector('.interactive-nav');
        const categoryCards = interactiveNav.querySelectorAll('.category-card');
        const contentPanels = interactiveNav.querySelectorAll('.content-panel');
        
        // Function to set active tab and panel
        function setActiveTab(tabType) {
            // Remove active class from all cards
            categoryCards.forEach(card => {
                card.classList.remove('active-tab');
            });
            
            // Add active class to selected card
            const activeCard = interactiveNav.querySelector(`.category-card.${tabType}`);
            if (activeCard) {
                activeCard.classList.add('active-tab');
            }
            
            // Hide all panels first
            contentPanels.forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Show the selected panel
            const targetPanel = interactiveNav.querySelector(`#${tabType}-panel`);
            if (targetPanel) {
                targetPanel.classList.add('active');
                
                // Scroll to the panel with smooth animation
                targetPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
        
        // Select Research tab by default
        setActiveTab('research');
        
        // Add click event listeners to category cards
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const type = this.classList[1]; // Get the second class (research, outreach, etc.)
                setActiveTab(type);
            });
        });
    }
});