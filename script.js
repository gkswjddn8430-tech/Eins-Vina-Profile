document.addEventListener('DOMContentLoaded', () => {
    // Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
            navbar.style.background = 'rgba(255, 255, 255, 1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Animate links
        const links = document.querySelectorAll('.nav-links li');
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth Scrolling for Anchor Links (Native scroll-behavior covers this usually, but a fallback is good)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Portfolio Tabs Functionality
document.addEventListener('DOMContentLoaded', () => {
    const portfolioTabs = document.querySelectorAll('.portfolio-tab');
    const portfolioContents = document.querySelectorAll('.portfolio-tab-content');

    if (portfolioTabs.length > 0) {
        portfolioTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                portfolioTabs.forEach(t => t.classList.remove('active'));
                portfolioContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab
                tab.classList.add('active');

                // Show corresponding content
                const tabId = tab.getAttribute('data-tab');
                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
});

// Portfolio Carousel
const carouselTrack = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const indicators = document.querySelectorAll('.indicator');

let currentSlide = 0;

function updateCarousel() {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
}

// Event listeners
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
}

// Indicator clicks
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

// Auto-play (every 500ms = 0.5 seconds)
let autoplayInterval = setInterval(nextSlide, 500);

// Pause autoplay on hover
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 500);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Innovation Section Accordion
document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion-btn');

    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            // Toggle active class on parent row
            const row = this.parentElement;
            row.classList.toggle('active');

            // Toggle panel visibility
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
});

// Monitor Slider Logic
document.addEventListener('DOMContentLoaded', () => {
    // --- Monitor Slider Logic ---
    const slides = document.querySelectorAll('.monitor-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.monitor-btn.prev');
    const nextBtn = document.querySelector('.monitor-btn.next');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    // Only init if monitor slider exists
    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Handle wrapping
            if (index >= totalSlides) currentSlide = 0;
            else if (index < 0) currentSlide = totalSlides - 1;
            else currentSlide = index;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // Event Listeners
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetTimer();
            });
        });

        // Auto play
        function startTimer() {
            slideInterval = setInterval(nextSlide, 5000); // 5 seconds
        }

        function stopTimer() {
            clearInterval(slideInterval);
        }

        function resetTimer() {
            stopTimer();
            startTimer();
        }

        // Initial start
        startTimer();

        // Pause on hover
        const monitorContainer = document.querySelector('.monitor-container');
        if (monitorContainer) {
            monitorContainer.addEventListener('mouseenter', stopTimer);
            monitorContainer.addEventListener('mouseleave', startTimer);
        }
    }

    // --- Trendy Scroll Album Drag-to-Scroll Logic (Multi-instance support) ---
    const scrollContainers = document.querySelectorAll('.scroll-album-wrapper');

    scrollContainers.forEach(scrollContainer => {
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.classList.add('active');
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
            // Prevent default image drag behavior
            e.preventDefault();
        });

        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.classList.remove('active');
        });

        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.classList.remove('active');
        });

        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast multiplier
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    });
});

// Tech & Certifications Accordion
const accordionItems = document.querySelectorAll('.tech-accordion-item');

// Smart Factory Carousel initialization
let automationCarouselInitialized = false;
let carouselInterval = null;

function initAutomationCarousel() {
    console.log('Initializing carousel...');

    if (automationCarouselInitialized) {
        console.log('Carousel already initialized');
        return;
    }

    const automationCarousel = document.querySelector('.automation-carousel-track');
    if (!automationCarousel) {
        console.log('Carousel track not found');
        return;
    }

    const slides = document.querySelectorAll('.automation-carousel-slide');
    const prevBtn = document.querySelector('.automation-carousel-btn.prev');
    const nextBtn = document.querySelector('.automation-carousel-btn.next');
    const indicators = document.querySelectorAll('.automation-carousel-indicators .indicator');

    console.log('Found slides:', slides.length);
    console.log('Found prev button:', !!prevBtn);
    console.log('Found next button:', !!nextBtn);

    if (slides.length === 0) {
        console.log('No slides found');
        return;
    }

    let currentSlide = 0;

    function showSlide(index) {
        console.log('Showing slide:', index);

        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Wrap around
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Add active class to current slide
        slides[currentSlide].classList.add('active');
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }

        // Move track
        const offset = -currentSlide * 100;
        automationCarousel.style.transform = `translateX(${offset}%)`;

        console.log('Current slide:', currentSlide, 'Offset:', offset + '%');
    }

    function nextSlide() {
        console.log('Next slide clicked');
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        console.log('Prev slide clicked');
        showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        stopAutoPlay();
        carouselInterval = setInterval(() => {
            console.log('Auto-advancing slide');
            nextSlide();
        }, 4000);
    }

    function stopAutoPlay() {
        if (carouselInterval) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }

    // Event Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Prev button clicked');
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
        console.log('Prev button listener added');
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next button clicked');
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
        console.log('Next button listener added');
    }

    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Indicator clicked:', index);
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });
    console.log('Indicator listeners added');

    // Pause autoplay on hover
    const carouselContainer = document.querySelector('.automation-carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
        console.log('Hover listeners added');
    }

    // Start autoplay
    startAutoPlay();
    console.log('Autoplay started');

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const accordion = document.querySelector('.tech-accordion-item.active .smart-factory-carousel');
        if (!accordion) return; // Only work when accordion is open

        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    });

    automationCarouselInitialized = true;
    console.log('Carousel initialization complete!');
}

accordionItems.forEach(item => {
    const header = item.querySelector('.tech-accordion-header');

    header.addEventListener('click', () => {
        const wasActive = item.classList.contains('active');

        console.log('Accordion clicked, was active:', wasActive);

        // Close all other accordions
        accordionItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current accordion
        item.classList.toggle('active');

        // Initialize carousel if Smart Factory accordion is opened
        if (!wasActive && item.classList.contains('active')) {
            const isSmartFactory = item.querySelector('.smart-factory-carousel');
            if (isSmartFactory) {
                console.log('Smart Factory accordion opened, initializing carousel...');
                setTimeout(() => {
                    initAutomationCarousel();
                }, 500); // Increased timeout
            }
        }
    });
});

// About Video Hover Interaction
document.addEventListener('DOMContentLoaded', () => {
    const aboutVideo = document.getElementById('aboutVideo');
    if (aboutVideo) {
        aboutVideo.addEventListener('mouseenter', () => {
            aboutVideo.play().catch(e => console.log('Autoplay prevented:', e));
        });

        aboutVideo.addEventListener('mouseleave', () => {
            aboutVideo.pause();
            aboutVideo.currentTime = 0; // Reset to start
        });
    }
});
