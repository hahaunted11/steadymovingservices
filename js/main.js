// Main JavaScript file for Steady Moving Services

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation for booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = bookingForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            const emailField = bookingForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            const phoneField = bookingForm.querySelector('input[name="phone"]');
            if (phoneField && phoneField.value.trim()) {
                const phonePattern = /^\d{10}$/;
                if (!phonePattern.test(phoneField.value.replace(/\D/g, ''))) {
                    isValid = false;
                    phoneField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<p>Thank you for your submission! We will contact you shortly.</p>';
                
                bookingForm.innerHTML = '';
                bookingForm.appendChild(successMessage);
                
                // In a real application, you would send the form data to a server here
            } else {
                const errorContainer = document.getElementById('formErrors');
                if (errorContainer) {
                    errorContainer.textContent = 'Please fill in all required fields correctly.';
                    errorContainer.style.display = 'block';
                }
            }
        });
    }
    
    // Initialize Google Maps if the map container exists
    const mapContainer = document.getElementById('serviceAreaMap');
    if (mapContainer && typeof google !== 'undefined') {
        initMap();
    }
});

// Google Maps initialization function
function initMap() {
    // Los Angeles coordinates
    const losAngeles = { lat: 34.0522, lng: -118.2437 };
    
    const map = new google.maps.Map(document.getElementById('serviceAreaMap'), {
        zoom: 10,
        center: losAngeles,
    });
    
    // Add marker for company location
    const marker = new google.maps.Marker({
        position: losAngeles,
        map: map,
        title: 'Steady Moving Services'
    });
    
    // Add circle to show service area (30 mile radius)
    const serviceArea = new google.maps.Circle({
        strokeColor: '#FFD700',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FFD700',
        fillOpacity: 0.1,
        map: map,
        center: losAngeles,
        radius: 48280, // 30 miles in meters
    });
}

// Testimonial carousel functionality
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        if (i === index) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
}

// Initialize testimonial carousel if testimonials exist
if (testimonialCards.length > 0) {
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    if (prevButton) {
        prevButton.addEventListener('click', prevTestimonial);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', nextTestimonial);
    }
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);
}
