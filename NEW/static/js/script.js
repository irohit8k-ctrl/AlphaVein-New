// ================= RIPPLE EFFECT =================
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = event.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = event.clientY - rect.top - size / 2 + 'px';
    
    button.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

// Apply ripple effect to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// ================= SCROLL PROGRESS INDICATOR =================
window.addEventListener('scroll', function() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
});


// ================= GET STARTED DROPDOWN (Click-based) =================
document.addEventListener('DOMContentLoaded', function() {
    const getStartedBtn = document.querySelector('.btn-get-started');
    const dropdownContainer = document.querySelector('.get-started-dropdown');
    
    if (getStartedBtn && dropdownContainer) {
        // Prevent dropdown from closing when clicking inside it
        dropdownContainer.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Toggle dropdown on button click
        getStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active class on button
            this.classList.toggle('active');
            
            // Toggle dropdown menu
            const dropdownMenu = dropdownContainer.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                if (dropdownMenu.style.opacity === '1') {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(-15px)';
                } else {
                    dropdownMenu.style.opacity = '1';
                    dropdownMenu.style.visibility = 'visible';
                    dropdownMenu.style.transform = 'translateY(0)';
                }
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdownContainer.contains(e.target)) {
                getStartedBtn.classList.remove('active');
                const dropdownMenu = dropdownContainer.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(-15px)';
                }
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                getStartedBtn.classList.remove('active');
                const dropdownMenu = dropdownContainer.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(-15px)';
                }
            }
        });
    }
});

// ================= HERO SLIDER =================
let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(i) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[i].classList.add("active");
}

function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
}

function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
}

// Initialize slider
if (slides.length > 0) {
    document.querySelector(".next").addEventListener("click", nextSlide);
    document.querySelector(".prev").addEventListener("click", prevSlide);
    setInterval(nextSlide, 5000);
}

// ================= MOBILE MENU TOGGLE =================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ================= ACTIVE NAV LINK =================
function setActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPage === href || currentPage === href + '/') {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// ================= NAVBAR SCROLL EFFECT =================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ================= BACK TO TOP BUTTON =================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================= SMOOTH SCROLL FOR ANCHOR LINKS =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ================= SCROLL ANIMATIONS =================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all animate-on-scroll elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Add animation class to sections
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
});

// Animate workout cards
document.querySelectorAll('.workout-card').forEach((card, index) => {
    card.classList.add('animate-on-scroll');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Animate membership cards
document.querySelectorAll('.membership-card').forEach((card, index) => {
    card.classList.add('animate-on-scroll');
    card.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(card);
});

// Animate feature boxes
document.querySelectorAll('.feature-box').forEach((box, index) => {
    box.classList.add('animate-on-scroll');
    box.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(box);
});

// Animate stat items
document.querySelectorAll('.stat-item').forEach((stat, index) => {
    stat.classList.add('animate-on-scroll');
    stat.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(stat);
});

// ================= NUMBER COUNTER ANIMATION =================
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(num => {
        const target = num.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        let numValue = parseInt(target.replace(/\D/g, ''));
        
        if (isNaN(numValue)) return;
        
        let current = 0;
        const increment = numValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numValue) {
                current = numValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (isPercentage) {
                num.textContent = displayValue + '%';
            } else if (isPlus) {
                num.textContent = displayValue + '+';
            } else {
                num.textContent = displayValue;
            }
        }, stepTime);
    });
}

// Trigger number animation when stats section is visible
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// ================= FORM VALIDATION =================
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        
        // Simple validation
        if (name && email) {
            // Show success message (you can customize this)
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }
    });
}

// ================= PARALLAX EFFECT FOR HERO =================
window.addEventListener('scroll', () => {
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        heroSlider.style.backgroundPositionY = rate + 'px';
    }
});

// ================= ENHANCE IMAGE LOADING =================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    if (img.complete) {
        img.style.opacity = '1';
    }
});

// ================= WORKOUT MODAL FUNCTIONALITY =================
document.addEventListener('DOMContentLoaded', function() {
    const workoutModal = document.getElementById('workoutModal');
    const workoutModalClose = document.getElementById('workoutModalClose');
    const workoutModalOverlay = document.querySelector('.workout-modal-overlay');
    const workoutVideoFrame = document.getElementById('workoutVideoFrame');
    const workoutModalTitle = document.getElementById('workoutModalTitle');
    const exerciseListContainer = document.getElementById('exerciseListContainer');
    
    // Open modal when clicking Start Workout button
    document.querySelectorAll('.start-workout-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const workoutCard = this.closest('.workout-card');
            const workoutTitle = workoutCard.querySelector('h3').textContent;
            const exerciseList = workoutCard.querySelectorAll('.exercise-list li');
            
            // Set modal title
            workoutModalTitle.textContent = workoutTitle + ' Workout';
            
            // Clear previous exercises
            exerciseListContainer.innerHTML = '';
            
            // Populate exercises list
            exerciseList.forEach((exercise, index) => {
                const exerciseName = exercise.textContent;
                const videoUrl = exercise.getAttribute('data-video');
                
                const li = document.createElement('li');
                li.textContent = exerciseName;
                li.setAttribute('data-video', videoUrl);
                
                if (index === 0) {
                    li.classList.add('active');
                    workoutVideoFrame.src = videoUrl;
                }
                
                li.addEventListener('click', function() {
                    // Update active state
                    document.querySelectorAll('.workout-exercises-list li').forEach(item => {
                        item.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    // Update video
                    const newVideoUrl = this.getAttribute('data-video');
                    workoutVideoFrame.src = newVideoUrl;
                });
                
                exerciseListContainer.appendChild(li);
            });
            
            // Show modal
            workoutModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal functions
    function closeModal() {
        workoutModal.classList.remove('active');
        document.body.style.overflow = '';
        workoutVideoFrame.src = '';
    }
    
    workoutModalClose.addEventListener('click', closeModal);
    workoutModalOverlay.addEventListener('click', closeModal);
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && workoutModal.classList.contains('active')) {
            closeModal();
        }
    });
});

// ================= FAQ ACCORDION =================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// ================= BMI CALCULATOR =================
document.addEventListener('DOMContentLoaded', function() {
    const bmiForm = document.querySelector('.bmi-form');
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const height = parseFloat(document.getElementById('bmi-height').value);
            const weight = parseFloat(document.getElementById('bmi-weight').value);
            const gender = document.getElementById('bmi-gender').value;
            
            if (!height || !weight || height <= 0 || weight <= 0) {
                alert('Please enter valid height and weight values');
                return;
            }
            
            // Calculate BMI (weight in kg / height in meters squared)
            const heightInMeters = height / 100;
            const bmi = weight / (heightInMeters * heightInMeters);
            const bmiRounded = bmi.toFixed(1);
            
            // Determine category
            let category = '';
            let categoryClass = '';
            
            if (bmi < 18.5) {
                category = 'Underweight';
                categoryClass = 'underweight';
            } else if (bmi >= 18.5 && bmi < 24.9) {
                category = 'Normal';
                categoryClass = 'normal';
            } else if (bmi >= 25 && bmi < 29.9) {
                category = 'Overweight';
                categoryClass = 'overweight';
            } else {
                category = 'Obese';
                categoryClass = 'obese';
            }
            
            // Display result
            const bmiResult = document.querySelector('.bmi-result');
            const bmiValue = document.querySelector('.bmi-value span');
            const bmiCategory = document.querySelector('.bmi-category');
            const bmiScaleMarker = document.querySelector('.bmi-scale-marker');
            
            bmiValue.textContent = bmiRounded;
            bmiCategory.textContent = category;
            bmiCategory.className = 'bmi-category ' + categoryClass;
            
            // Position marker on scale
            const markerPosition = ((bmi - 15) / (40 - 15)) * 100;
            bmiScaleMarker.style.left = Math.max(0, Math.min(100, markerPosition)) + '%';
            
            bmiResult.classList.add('show');
        });
    }
});

// ================= PARTICLE BACKGROUND =================
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles-container');
    
    const particleCount = 4;
    for (let i = 1; i <= particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle', 'particle-' + i);
        particlesContainer.appendChild(particle);
    }
    
    if (window.innerWidth > 768) {
        document.body.appendChild(particlesContainer);
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768 && particlesContainer.parentNode) {
            particlesContainer.remove();
        } else if (window.innerWidth > 768 && !particlesContainer.parentNode) {
            document.body.appendChild(particlesContainer);
        }
    });
});

// ================= 3D CARD HOVER EFFECT =================
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.workout-card, .membership-card, .team-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
});
