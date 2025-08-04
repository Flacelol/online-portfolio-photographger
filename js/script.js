// Portfolio data
const portfolioData = [
    {
        id: 1,
        category: 'wedding',
        image: 'images/portfolio/wedding.jpg',
        title: 'Весілля Марії та Олександра'
    },
    {
        id: 2,
        category: 'wedding',
        image: 'images/portfolio/wedding-2.jpg',
        title: 'Весільна церемонія'
    },
    {
        id: 3,
        category: 'wedding',
        image: 'images/portfolio/wedding-3.jpg',
        title: 'Перший танець'
    },
    {
        id: 4,
        category: 'wedding',
        image: 'images/portfolio/wedding-4.jpg',
        title: 'Весільні емоції'
    },
    {
        id: 5,
        category: 'events',
        image: 'images/portfolio/event-1.jpg',
        title: 'Корпоративна подія'
    },
    {
        id: 6,
        category: 'events',
        image: 'images/portfolio/event-2.jpg',
        title: 'День народження'
    },
    {
        id: 7,
        category: 'events',
        image: 'images/portfolio/event-3.jpg',
        title: 'Святкування'
    },
    {
        id: 8,
        category: 'portraits',
        image: 'images/portfolio/portrait-1.jpg',
        title: 'Портретна зйомка'
    },
    {
        id: 9,
        category: 'portraits',
        image: 'images/portfolio/portrait-2.jpg',
        title: 'Індивідуальна фотосесія'
    },
    {
        id: 10,
        category: 'portraits',
        image: 'images/portfolio/portrait-3.jpg',
        title: 'Сімейний портрет'
    },
    {
        id: 11,
        category: 'wedding',
        image: 'images/portfolio/wedding-5.jpg',
        title: 'Весільні деталі'
    },
    {
        id: 12,
        category: 'events',
        image: 'images/portfolio/event-4.jpg',
        title: 'Концерт'
    }
];

// DOM elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const portfolioGrid = document.getElementById('portfolio-grid');
const tabBtns = document.querySelectorAll('.tab-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const contactForm = document.getElementById('contact-form');
const navbar = document.querySelector('.navbar');

let currentImageIndex = 0;
let currentCategory = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadPortfolio('all');
    initializeNavigation();
    initializeLightbox();
    initializeContactForm();
    initializeScrollEffects();
    initializeHeroEffects();
});

// Hero section effects
function initializeHeroEffects() {
    const heroTitle = document.querySelector('.hero-title');
    
    // Animate hero title on load
    setTimeout(() => {
        if (heroTitle) {
            heroTitle.classList.add('animate');
        }
    }, 500);
}

// Navigation toggle
function initializeNavigation() {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    window.addEventListener('scroll', function() {
        // Navbar background on scroll
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Animate elements on scroll
        animateOnScroll();
    });
}

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.portfolio-item, .testimonial, .about-content, .contact-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Portfolio functionality
function loadPortfolio(category) {
    currentCategory = category;
    const filteredData = category === 'all' ? portfolioData : portfolioData.filter(item => item.category === category);
    
    portfolioGrid.innerHTML = '';
    
    filteredData.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.style.opacity = '0';
        portfolioItem.style.transform = 'translateY(30px)';
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="portfolio-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        `;
        
        portfolioItem.addEventListener('click', () => openLightbox(item.image, index, filteredData));
        portfolioGrid.appendChild(portfolioItem);
        
        // Animate item appearance
        setTimeout(() => {
            portfolioItem.style.transition = 'all 0.5s ease';
            portfolioItem.style.opacity = '1';
            portfolioItem.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Portfolio tab functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Load portfolio for selected category
        const category = this.getAttribute('data-category');
        loadPortfolio(category);
    });
});

// Lightbox functionality
function initializeLightbox() {
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
}

function openLightbox(imageSrc, index, imageArray) {
    currentImageIndex = index;
    currentImageArray = imageArray;
    lightboxImg.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    const filteredData = currentCategory === 'all' ? portfolioData : portfolioData.filter(item => item.category === currentCategory);
    currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredData.length - 1;
    lightboxImg.src = filteredData[currentImageIndex].image;
}

function showNextImage() {
    const filteredData = currentCategory === 'all' ? portfolioData : portfolioData.filter(item => item.category === currentCategory);
    currentImageIndex = currentImageIndex < filteredData.length - 1 ? currentImageIndex + 1 : 0;
    lightboxImg.src = filteredData[currentImageIndex].image;
}

// Contact form functionality
function initializeContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Будь ласка, заповніть всі поля', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Будь ласка, введіть правильний емейл', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Надсилання...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Дякую за повідомлення! Я зв\'яжуся з вами найближчим часом.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4af37' : '#e74c3c'};
        color: ${type === 'success' ? '#1a1a1a' : '#fff'};
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Smooth reveal animations for sections
function initializeSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });
}

// Add CSS for section animations
const sectionAnimationCSS = `
    .section-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

const style = document.createElement('style');
style.textContent = sectionAnimationCSS;
document.head.appendChild(style);

// Initialize section animations
document.addEventListener('DOMContentLoaded', initializeSectionAnimations);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'images/hero-photo.jpg',
        'images/anatoly-portrait.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(initializeScrollEffects, 10));