// =====================
// Smooth Scroll Navigation
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('#mainNav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// =====================
// Navbar Scroll Effect
// =====================
const navbar = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active section highlighting
  const sections = document.querySelectorAll('section');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// =====================
// Scroll Animations
// =====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Animate elements on scroll
const animateOnScroll = document.querySelectorAll('.stat-item, .skill-category, .project-card, .exploring-card, .timeline-item, .contact-method');
animateOnScroll.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// =====================
// Scroll to Top Button
// =====================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

// Add styles
const scrollTopStyles = document.createElement('style');
scrollTopStyles.textContent = `
  .scroll-top-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
  }
  
  .scroll-top-btn.visible {
    opacity: 1;
    visibility: visible;
  }
  
  .scroll-top-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
  
  .dark-mode-toggle {
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
  }
  
  .dark-mode-toggle:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`;
document.head.appendChild(scrollTopStyles);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// =====================
// Dark Mode Toggle
// =====================
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
document.body.appendChild(darkModeToggle);

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Dark mode styles
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
  body.dark-mode {
    background-color: #0f172a;
    color: #e2e8f0;
  }
  
  body.dark-mode .about-section,
  body.dark-mode .journey-section {
    background-color: #1e293b;
  }
  
  body.dark-mode .stats-section {
    background-color: #0f172a;
    border-bottom-color: #334155;
  }
  
  body.dark-mode .projects-section,
  body.dark-mode .contact-section {
    background-color: #1e293b;
  }
  
  body.dark-mode .section-title,
  body.dark-mode h1, body.dark-mode h2, body.dark-mode h3,
  body.dark-mode h4, body.dark-mode h5, body.dark-mode h6 {
    color: #f1f5f9;
  }
  
  body.dark-mode .section-subtitle,
  body.dark-mode .stat-label,
  body.dark-mode .project-tagline,
  body.dark-mode .skill-category p,
  body.dark-mode .timeline-content p {
    color: #94a3b8;
  }
  
  body.dark-mode .skill-category,
  body.dark-mode .project-card,
  body.dark-mode .timeline-content,
  body.dark-mode .contact-card {
    background-color: #0f172a;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  }
  
  body.dark-mode .project-mini-tech span {
    background-color: #1e293b;
    color: #94a3b8;
  }
  
  body.dark-mode .contact-social-link {
    background-color: #1e293b;
    color: #f1f5f9;
  }
`;
document.head.appendChild(darkModeStyles);

// =====================
// Counter Animation for Stats
// =====================
const statNumbers = document.querySelectorAll('.stat-number');

const animateValue = (element, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    
    // Handle percentage or regular numbers
    if (element.textContent.includes('%')) {
      element.textContent = value + '%';
    } else if (element.textContent.includes('+')) {
      element.textContent = value + '+';
    } else {
      element.textContent = value;
    }
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const text = target.textContent;
      const number = parseInt(text.replace(/\D/g, ''));
      animateValue(target, 0, number, 2000);
      statsObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// =====================
// Project Card Hover Effects
// =====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.zIndex = '10';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.zIndex = '1';
  });
});

// =====================
// Timeline Animation
// =====================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  timelineObserver.observe(item);
});

// =====================
// Exploring Cards Animation
// =====================
const exploringCards = document.querySelectorAll('.exploring-card');

const exploringObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 150);
      exploringObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

exploringCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  exploringObserver.observe(card);
});

// =====================
// Mobile Menu Close on Click
// =====================
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    });
  });
}

// =====================
// Lazy Load Images
// =====================
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      img.classList.add('loaded');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// =====================
// Parallax Effect for Hero
// =====================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - (scrolled / 500);
  }
});

// =====================
// Page Load Animation
// =====================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// =====================
// ENHANCED PROJECT CAROUSEL WITH NAVIGATION
// Add this to the END of your main.js file
// =====================

function createProjectCarousel() {
  const projectsSection = document.querySelector('.projects-section');
  if (!projectsSection) return;
  
  // Project data
  const projects = [
    {
      title: 'Online Poll System',
      badge: 'Featured',
      description: 'Production-ready voting platform with enterprise-grade security. Built with Django REST Framework, PostgreSQL, and Docker. Implemented database-level constraints to prevent duplicate votes and JWT authentication for secure access.',
      tech: ['Django', 'PostgreSQL', 'Docker', 'JWT', 'Gunicorn'],
      outcome: 'Production-deployed with 99.9% uptime, supporting concurrent voting sessions',
      image: 'images/project-nexus.PNG',
      github: 'https://github.com/collins987/',
      demo: '#'
    },
    {
      title: 'Azure Security Engineer Labs',
      badge: 'Security',
      description: 'Enterprise cloud security in practice. Implemented just-in-time VM access, NSGs with least-privilege and Sentinel SIEM integration.',
      tech: ['Azure RBAC', 'Key Vault', 'Defender', 'Sentinel', 'ARM'],
      outcome: 'Demonstrated zero-trust patterns on Azure',
      image: 'images/az500-labs.jpeg',
      github: 'https://github.com/collins987/',
      demo: '#'
    },
    {
      title: 'Doctor Consultation Application',
      badge: 'Full-Stack',
      description: 'Real-time appointment booking with Firebase and RBAC. Mobile application for healthcare consultation with role-based access control.',
      tech: ['Firebase', 'Java', 'Android', 'Gradle', 'RBAC'],
      outcome: 'Streamlined healthcare appointment scheduling with real-time updates',
      image: 'images/doctor-app.jpeg',
      github: 'https://github.com/collins987/',
      demo: '#'
    },
    {
      title: 'Real-Time Chat Application',
      badge: 'MERN Stack',
      description: 'Secure messaging platform with JWT & WebSocket connections for real-time communication. Full-stack application with modern architecture.',
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
      outcome: 'Real-time messaging with secure authentication and responsive design',
      image: 'images/chat-app.jpeg',
      github: 'https://github.com/collins987/',
      demo: '#'
    },
    {
      title: 'Microsoft SC-900 Labs',
      badge: 'Compliance',
      description: 'Hands-on labs on security, compliance and identity with Microsoft cloud services. Comprehensive coverage of Microsoft security solutions.',
      tech: ['Entra ID', 'Defender', 'Purview'],
      outcome: 'Demonstrated compliance and security best practices on Microsoft platform',
      image: 'images/sc900-labs.jpeg',
      github: 'https://github.com/collins987/',
      demo: '#'
    }
  ];

  // Create full-width carousel HTML
  const carouselHTML = `
    <div class="projects-carousel-wrapper">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center mb-5">
            <h2 class="section-title">Featured Projects</h2>
            <div class="title-underline"></div>
            <p class="section-subtitle">From problem identification to production deployment</p>
          </div>
        </div>
      </div>
      
      <div class="projects-carousel-full">
        <button class="carousel-nav carousel-nav-left" aria-label="Previous project">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div class="projects-carousel-container">
          <div class="projects-carousel-track">
            ${projects.map((project, index) => `
              <div class="project-carousel-card" data-index="${index}">
                <div class="project-carousel-image">
                  <img src="${project.image}" alt="${project.title}" 
                       onerror="this.src='https://via.placeholder.com/550x320?text=${encodeURIComponent(project.title)}'">
                  <span class="project-carousel-badge">${project.badge}</span>
                  <div class="project-carousel-overlay">
                    <div class="project-carousel-links">
                      <a href="${project.github}" target="_blank" class="project-link" title="View on GitHub">
                        <i class="fab fa-github"></i>
                      </a>
                      <a href="${project.demo}" target="_blank" class="project-link" title="Live Demo">
                        <i class="fas fa-external-link-alt"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="project-carousel-content">
                  <h3 class="project-carousel-title">${project.title}</h3>
                  <p class="project-carousel-description">${project.description}</p>
                  <div class="project-carousel-tech">
                    ${project.tech.map(tech => `
                      <span class="project-carousel-tech-badge">${tech}</span>
                    `).join('')}
                  </div>
                  <div class="project-carousel-outcome">
                    <i class="fas fa-check-circle"></i>
                    <strong>Outcome:</strong> ${project.outcome}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <button class="carousel-nav carousel-nav-right" aria-label="Next project">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      
      <div class="carousel-controls">
        <div class="carousel-dots">
          ${projects.map((_, index) => `
            <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to project ${index + 1}"></button>
          `).join('')}
        </div>
        <button class="carousel-play-pause" aria-label="Pause carousel">
          <i class="fas fa-pause"></i>
        </button>
      </div>
    </div>
  `;

  // Replace existing content
  projectsSection.innerHTML = carouselHTML;

  // Carousel functionality
  const track = document.querySelector('.projects-carousel-track');
  const cards = document.querySelectorAll('.project-carousel-card');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-nav-left');
  const nextBtn = document.querySelector('.carousel-nav-right');
  const playPauseBtn = document.querySelector('.carousel-play-pause');
  
  let currentIndex = 0;
  let isPlaying = true;
  let autoplayInterval;
  const totalProjects = projects.length;

  // Calculate card width + gap
  function getCardWidth() {
    const card = cards[0];
    const style = window.getComputedStyle(card);
    const marginRight = parseFloat(style.marginRight);
    return card.offsetWidth + marginRight;
  }

  // Update carousel position
  function updateCarousel(smooth = true) {
    const cardWidth = getCardWidth();
    const offset = -currentIndex * cardWidth;
    track.style.transition = smooth ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
    track.style.transform = `translateX(${offset}px)`;
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  // Navigate to specific index
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  // Next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalProjects;
    updateCarousel();
  }

  // Previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalProjects) % totalProjects;
    updateCarousel();
  }

  // Autoplay
  function startAutoplay() {
    isPlaying = true;
    playPauseBtn.querySelector('i').className = 'fas fa-pause';
    autoplayInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoplay() {
    isPlaying = false;
    playPauseBtn.querySelector('i').className = 'fas fa-play';
    clearInterval(autoplayInterval);
  }

  // Event listeners
  prevBtn.addEventListener('click', () => {
    prevSlide();
    if (isPlaying) {
      stopAutoplay();
      startAutoplay();
    }
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    if (isPlaying) {
      stopAutoplay();
      startAutoplay();
    }
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      goToSlide(index);
      if (isPlaying) {
        stopAutoplay();
        startAutoplay();
      }
    });
  });

  playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  // Pause on hover
  const carouselContainer = document.querySelector('.projects-carousel-full');
  carouselContainer.addEventListener('mouseenter', () => {
    if (isPlaying) {
      clearInterval(autoplayInterval);
    }
  });

  carouselContainer.addEventListener('mouseleave', () => {
    if (isPlaying) {
      autoplayInterval = setInterval(nextSlide, 4000);
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      if (isPlaying) {
        stopAutoplay();
        startAutoplay();
      }
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      if (isPlaying) {
        stopAutoplay();
        startAutoplay();
      }
    }
  });

  // Touch support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
      if (isPlaying) {
        stopAutoplay();
        startAutoplay();
      }
    }
    if (touchEndX > touchStartX + 50) {
      prevSlide();
      if (isPlaying) {
        stopAutoplay();
        startAutoplay();
      }
    }
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    updateCarousel(false);
  });

  // Start autoplay
  startAutoplay();

  // Initial update
  updateCarousel(false);
}

// Initialize carousel when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createProjectCarousel);
} else {
  createProjectCarousel();
}

// =====================
// Console Message
// =====================
console.log('%c🚀 Portfolio Website Loaded Successfully!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%c👨‍💻 Designed and Developed by Vincent Collins', 'color: #764ba2; font-size: 14px;');
console.log('%c💼 Looking for opportunities? Let\'s connect!', 'color: #5bc0de; font-size: 14px;');