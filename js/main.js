// Phil-Convos Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const suggestBtn = document.getElementById('suggestBtn');
    const suggestModal = document.getElementById('suggestModal');
    const closeModal = document.getElementById('closeModal');
    const suggestForm = document.getElementById('suggestForm');

    if (suggestBtn) {
        suggestBtn.addEventListener('click', function() {
            suggestModal.style.display = 'flex';
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            suggestModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside content
    suggestModal.addEventListener('click', function(e) {
        if (e.target === suggestModal) {
            suggestModal.style.display = 'none';
        }
    });

    if (suggestForm) {
        suggestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const philosopherName = document.getElementById('philosopherName').value;
            const philosopherDescription = document.getElementById('philosopherDescription').value;
            const philosopherEra = document.getElementById('philosopherEra').value;

            if (!philosopherName || !philosopherDescription || !philosopherEra) {
                alert('Please fill in all fields.');
                return;
            }

            // In a real implementation, this would send data to a server
            // For now, just show a success message
            alert('Thank you for your suggestion! We'll consider adding ' + philosopherName + ' to Phil-Convos.');
            
            // Reset form and close modal
            suggestForm.reset();
            suggestModal.style.display = 'none';
        });
    }

    // Simple animations for philosopher cards
    const philosopherCards = document.querySelectorAll('.philosopher-card');
    
    philosopherCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scrolling for any anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add a fade-in animation for content
    const fadeElements = document.querySelectorAll('.philosopher-card, .feature-card');
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });

    // Display current date in footer (optional)
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const dateParagraph = document.createElement('p');
        dateParagraph.textContent = 'Last updated: ' + dateString;
        footerBottom.appendChild(dateParagraph);
    }
});