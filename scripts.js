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
    
    // Handle mobile dropdown menus
    if (window.innerWidth <= 768) {
        const dropdownLinks = document.querySelectorAll('.dropdown > a');
        
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const dropdownContent = this.nextElementSibling;
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    if (content !== dropdownContent) {
                        content.style.display = 'none';
                    }
                });
                
                // Toggle current dropdown
                dropdownContent.style.display = 
                    dropdownContent.style.display === 'block' ? 'none' : 'block';
            });
        });
    }
    
    // Venn diagram functionality
    if (document.querySelector('.venn-container')) {
        // Add event listeners for overlay
        const vennContainer = document.querySelector('.venn-container');
        const overlay = vennContainer.querySelector('.overlay');
        const circles = vennContainer.querySelectorAll('.circle');
        
        // Add click event listeners to circles
        circles.forEach(circle => {
            circle.addEventListener('click', function() {
                const type = this.classList[1]; // Get the second class (research, outreach, etc.)
                showInfo(type, vennContainer);
            });
        });
        
        // Add click event listener to overlay
        if (overlay) {
            overlay.addEventListener('click', function() {
                closeInfo(vennContainer);
            });
        }
        
        // Add click event listeners to close buttons
        const closeButtons = vennContainer.querySelectorAll('.close-btn');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                closeInfo(vennContainer);
            });
        });
    }
});

// Function to show info box when clicking on a circle
function showInfo(type, container) {
    // Reset all circles
    container.querySelectorAll('.circle').forEach(circle => {
        circle.classList.remove('active');
    });
    
    // Activate selected circle
    container.querySelector(`.${type}`).classList.add('active');
    
    // Show overlay
    container.querySelector('.overlay').style.display = 'block';
    
    // Show info box
    container.querySelector(`#${type}-info`).style.display = 'block';
}

// Function to close info box
function closeInfo(container) {
    // Reset all circles
    container.querySelectorAll('.circle').forEach(circle => {
        circle.classList.remove('active');
    });
    
    // Hide overlay
    container.querySelector('.overlay').style.display = 'none';
    
    // Hide all info boxes
    container.querySelectorAll('.info-box').forEach(box => {
        box.style.display = 'none';
    });
}