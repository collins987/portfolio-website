// =====================================================
// PORTFOLIO WEBSITE - MAIN JAVASCRIPT
// By Vincent Collins
// =====================================================

// =====================
// SMOOTH SCROLL NAVIGATION
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
// NAVBAR SCROLL EFFECT & ACTIVE SECTION
// =====================
const navbar = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Navbar background on scroll
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
// SCROLL ANIMATIONS
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
const animateOnScroll = document.querySelectorAll('.stat-item, .skill-category, .exploring-card, .timeline-item, .contact-method');
animateOnScroll.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// =====================
// COUNTER ANIMATION FOR STATS
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
// TIMELINE ICON INITIALIZATION
// =====================
function ensureTimelineIcons() {
  const timelineIcons = document.querySelectorAll('.timeline-icon');
  
  if (timelineIcons.length === 0) return;

  const iconClasses = [
    'fab fa-google',           // ALX Google Cloud Program
    'fas fa-robot',            // n8n Workflow Automation
    'fas fa-server',           // Back-End Specialization
    'fab fa-microsoft',        // Cloud Security Expert
    'fas fa-chart-pie',        // Business Analysis
    'fas fa-handshake',        // Professional Development
    'fas fa-database',         // Data Analytics
    'fab fa-aws',              // Cloud Infrastructure
    'fas fa-lock',             // IT Operations & Security
    'fas fa-graduation-cap'    // Business IT Foundation
  ];

  timelineIcons.forEach((icon, index) => {
    icon.innerHTML = '';
    const iconElement = document.createElement('i');
    iconElement.className = iconClasses[index] || 'fas fa-circle';
    icon.appendChild(iconElement);
  });
}

// =====================
// PROJECT CAROUSEL - FULL WIDTH WITH SIDE NAVIGATION
// =====================
function createProjectCarousel() {
  const carouselTrack = document.getElementById('projectsCarousel');
  if (!carouselTrack) return;

  // Projects data
  const projects = [
    {
      title: 'Online Poll System',
      badge: 'Featured',
      difficulty: 'Advanced',
      tagline: 'Production-ready voting platform with enterprise-grade security',
      problem: 'Organizations need secure, transparent voting systems that prevent fraud while maintaining user privacy.',
      solution: 'Built with Django REST Framework, PostgreSQL, and Docker. Implemented database-level constraints to prevent duplicate votes and JWT authentication for secure access.',
      tech: ['Django', 'PostgreSQL', 'Docker', 'JWT', 'Gunicorn'],
      outcome: 'Production-deployed with 99.9% uptime, supporting concurrent voting sessions',
      image: 'images/project-nexus.PNG',
      metrics: { uptime: '99.9%', users: '5K+', time: '3 months' }
    },
    {
      title: 'Azure Security Engineer Labs',
      badge: 'Security',
      difficulty: 'Advanced',
      tagline: 'Enterprise cloud security in practice',
      problem: 'Cloud environments require layered security controls to protect against modern threats',
      solution: 'Implemented just-in-time VM access, NSGs with least-privilege and Sentinel SIEM integration.',
      tech: ['Azure RBAC', 'Key Vault', 'Defender', 'Sentinel', 'ARM'],
      outcome: 'Demonstrated zero-trust patterns on Azure',
      image: 'images/az500-labs.jpeg',
      metrics: { environments: '15+', scenarios: '20+', labs: '8' }
    },
    {
      title: 'Doctor Consultation Application',
      badge: 'Full-Stack',
      difficulty: 'Intermediate',
      tagline: 'Real-time appointment booking with Firebase and RBAC',
      problem: 'Healthcare providers need efficient appointment scheduling with role-based access control',
      solution: 'Mobile application with Firebase real-time database and comprehensive RBAC implementation.',
      tech: ['Firebase', 'Java', 'Android', 'Gradle', 'RBAC'],
      outcome: 'Streamlined healthcare appointment scheduling with real-time updates',
      image: 'images/doctor-app.jpeg',
      metrics: { installs: '2K+', rating: '4.8★', appointments: '10K+' }
    },
    {
      title: 'Real-Time Chat Application',
      badge: 'MERN Stack',
      difficulty: 'Intermediate',
      tagline: 'Secure messaging platform with JWT & WebSocket connections',
      problem: 'Users need secure, real-time communication with scalable architecture',
      solution: 'Full-stack application with MongoDB, Express.js, React, and Node.js using WebSocket for real-time updates.',
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
      outcome: 'Real-time messaging with secure authentication and responsive design',
      image: 'images/chat-app.jpeg',
      metrics: { messages: '100K+', users: '1K+', latency: '<100ms' }
    },
    {
      title: 'Microsoft SC-900 Labs',
      badge: 'Compliance',
      difficulty: 'Beginner',
      tagline: 'Hands-on labs on security, compliance and identity',
      problem: 'Organizations need practical understanding of Microsoft security and compliance solutions',
      solution: 'Comprehensive hands-on labs covering Entra ID, Defender, and Purview with real-world scenarios.',
      tech: ['Entra ID', 'Defender', 'Purview'],
      outcome: 'Demonstrated compliance and security best practices on Microsoft platform',
      image: 'images/sc900-labs.jpeg',
      metrics: { modules: '12', exercises: '25', certification: 'SC-900' }
    }
  ];

  // Build carousel HTML - include first project at end for infinite loop effect
  const projectsWithLoop = [...projects, projects[0]];
  const carouselHTML = projectsWithLoop.map((project, index) => {
    const difficultyClass = project.difficulty?.toLowerCase() || 'intermediate';
    const metricsHTML = project.metrics ? Object.entries(project.metrics)
      .map(([key, value]) => `<span class="project-metric"><strong>${key}:</strong> ${value}</span>`)
      .join('') : '';
    
    return `
    <article class="project-carousel-card" ${index === projects.length ? 'data-loop="true"' : ''}>
      <div class="project-carousel-wrapper">
        <div class="project-carousel-image">
          <img src="${project.image}" alt="${project.title}" 
               onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(project.title)}'">
          <span class="project-carousel-badge">${project.badge}</span>
          <span class="project-difficulty-badge ${difficultyClass}">${project.difficulty}</span>
        </div>
        <div class="project-carousel-content">
          <h3 class="project-carousel-title">${project.title}</h3>
          <p class="project-carousel-tagline">${project.tagline}</p>
          
          <div class="project-detail">
            <h5><i class="fas fa-exclamation-circle"></i> The Problem</h5>
            <p>${project.problem}</p>
          </div>
          
          <div class="project-detail">
            <h5><i class="fas fa-cogs"></i> The Solution</h5>
            <p>${project.solution}</p>
          </div>
          
          <div class="project-carousel-tech">
            ${project.tech.map(tech => `<span class="project-carousel-tech-badge">${tech}</span>`).join('')}
          </div>
          <div class="project-carousel-outcome">
            <i class="fas fa-check-circle"></i>
            <strong>Outcome:</strong> ${project.outcome}
          </div>
          ${metricsHTML ? `<div class="project-metrics-grid">${metricsHTML}</div>` : ''}
        </div>
      </div>
    </article>
  `;
  }).join('');

  carouselTrack.innerHTML = carouselHTML;

  // Get elements
  const track = document.querySelector('.projects-carousel-track');
  const container = document.querySelector('.projects-carousel-container');
  const leftBtn = document.querySelector('.projects-nav-left');
  const rightBtn = document.querySelector('.projects-nav-right');
  const playPauseBtn = document.getElementById('projectsPlayPause');
  const navDots = document.querySelectorAll('.projects-nav-dot');

  if (!track || !container || !leftBtn || !rightBtn) return;

  // Calculate scroll amount based on screen width
  function getScrollAmount() {
    const width = window.innerWidth;
    if (width >= 1200) {
      return 920; // Full desktop
    } else if (width >= 1024) {
      return 850; // Laptop
    } else if (width >= 768) {
      return 800; // Tablet landscape
    } else if (width >= 600) {
      return 750; // Tablet portrait
    } else if (width >= 480) {
      return 700; // Mobile landscape
    } else {
      return 650; // Mobile portrait
    }
  }

  let scrollAmount = getScrollAmount();
  let autoScrollInterval = null;
  let isPlaying = true;
  let currentProjectIndex = 0;
  const totalProjects = 5; // Only 5 real projects, 6th is duplicate for looping
  const AUTO_SCROLL_INTERVAL = 3000; // 3 seconds, no pause

  // Update active dot based on current position
  function updateActiveDot() {
    navDots.forEach((dot, index) => {
      dot.classList.remove('active');
      if (index === currentProjectIndex) {
        dot.classList.add('active');
      }
    });
  }

  // Scroll to specific project index with seamless loop
  function scrollToProject(index, immediate = false) {
    currentProjectIndex = index % totalProjects;
    const scrollPosition = index * scrollAmount;
    track.scrollTo({
      left: scrollPosition,
      behavior: immediate ? 'auto' : 'smooth'
    });
    updateActiveDot();

    // If we scrolled to the duplicate (6th item), jump back to first after animation
    if (index >= totalProjects) {
      setTimeout(() => {
        track.scrollTo({
          left: 0,
          behavior: 'auto'
        });
        currentProjectIndex = 0;
        updateActiveDot();
      }, 500); // Wait for smooth scroll to finish
    }
  }

  function scrollLeft() {
    let newIndex = currentProjectIndex - 1;
    if (newIndex < 0) {
      newIndex = totalProjects - 1;
    }
    scrollToProject(newIndex);
  }

  function scrollRight() {
    let newIndex = currentProjectIndex + 1;
    scrollToProject(newIndex);
  }

  // Auto-scroll to next item every 3 seconds
  function autoScroll() {
    if (!isPlaying) return;
    scrollRight();
  }

  // Start auto-scroll on load
  autoScrollInterval = setInterval(autoScroll, AUTO_SCROLL_INTERVAL);
  updateActiveDot();

  // Pause/Resume on manual interaction
  function pauseAutoScroll() {
    clearInterval(autoScrollInterval);
    isPlaying = false;
    if (playPauseBtn) {
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }

  function resumeAutoScroll() {
    if (!isPlaying) {
      isPlaying = true;
      if (playPauseBtn) {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      }
      autoScrollInterval = setInterval(autoScroll, AUTO_SCROLL_INTERVAL);
    }
  }

  // Play/Pause button toggle
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseAutoScroll();
      } else {
        resumeAutoScroll();
      }
    });
  }

  // Dot navigation
  navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      pauseAutoScroll();
      scrollToProject(index);
      setTimeout(resumeAutoScroll, 2000); // Resume after 2 seconds
    });
  });

  leftBtn.addEventListener('click', () => {
    pauseAutoScroll();
    scrollLeft();
    setTimeout(resumeAutoScroll, 2000); // Resume after 2 seconds
  });

  rightBtn.addEventListener('click', () => {
    pauseAutoScroll();
    scrollRight();
    setTimeout(resumeAutoScroll, 2000); // Resume after 2 seconds
  });

  // Update button visibility - buttons always enabled with looping
  function updateButtonVisibility() {
    // Buttons always stay enabled since we have looping functionality
    leftBtn.style.opacity = '1';
    leftBtn.style.pointerEvents = 'auto';
    leftBtn.style.cursor = 'pointer';
    rightBtn.style.opacity = '1';
    rightBtn.style.pointerEvents = 'auto';
    rightBtn.style.cursor = 'pointer';
  }

  // Listen to scroll events
  track.addEventListener('scroll', updateButtonVisibility);
  window.addEventListener('resize', () => {
    updateButtonVisibility();
    scrollAmount = getScrollAmount(); // Recalculate on resize
  });

  // Initialize button states after content loads
  setTimeout(updateButtonVisibility, 200);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      pauseAutoScroll();
      scrollLeft();
      setTimeout(resumeAutoScroll, 2000);
    } else if (e.key === 'ArrowRight') {
      pauseAutoScroll();
      scrollRight();
      setTimeout(resumeAutoScroll, 2000);
    }
  });

  // Touch swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      pauseAutoScroll();
      if (diff > 0) scrollRight();
      else scrollLeft();
      setTimeout(resumeAutoScroll, 2000);
    }
  }, { passive: true });

  // Pause on mouse hover
  track.addEventListener('mouseenter', pauseAutoScroll);
  track.addEventListener('mouseleave', resumeAutoScroll);
}


// =====================
// MOBILE MENU CLOSE ON CLICK
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
// LAZY LOAD IMAGES
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
// PARALLAX EFFECT FOR HERO
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
// SCROLL TO TOP BUTTON
// =====================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

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

  @media (max-width: 768px) {
    .scroll-top-btn,
    .dark-mode-toggle {
      width: 45px;
      height: 45px;
      font-size: 1rem;
      bottom: 20px;
    }
    
    .scroll-top-btn {
      right: 20px;
    }
    
    .dark-mode-toggle {
      left: 20px;
    }
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
// DARK MODE TOGGLE
// =====================
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
document.body.appendChild(darkModeToggle);

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

// =====================
// PAGE LOAD ANIMATION
// =====================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// =====================
// PROGRESS INDICATOR
// =====================
const progressIndicator = document.getElementById('progressIndicator');
const progressFill = document.getElementById('progressFill');
const progressText = progressIndicator?.querySelector('.progress-text');

window.addEventListener('scroll', () => {
  if (!progressIndicator) return;
  
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / scrollHeight) * 100;
  
  if (progressFill) {
    progressFill.style.strokeDashoffset = `calc(282.7 - (282.7 * ${scrolled / 100}))`;
  }
  if (progressText) {
    progressText.textContent = `${Math.round(scrolled)}%`;
  }
});

// =====================
// FLOATING CTA BUTTON
// =====================
const floatingCTA = document.getElementById('floatingCTA');
if (floatingCTA) {
  floatingCTA.addEventListener('click', () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

// =====================
// NEWSLETTER FORM
// =====================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('.newsletter-input');
    if (input && input.value) {
      alert(`Thanks for subscribing with ${input.value}! 🎉`);
      input.value = '';
    }
  });
}

// =====================
// INITIALIZATION
// =====================
function initializePortfolio() {
  createProjectCarousel();
  ensureTimelineIcons();
  
  // Re-run timeline icons after delay
  setTimeout(ensureTimelineIcons, 500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
  initializePortfolio();
}

// =====================
// CONSOLE MESSAGE
// =====================
console.log('%c🚀 Portfolio Website Loaded Successfully!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%c👨‍💻 Designed and Developed by Vincent Collins', 'color: #764ba2; font-size: 14px;');
console.log('%c💼 Looking for opportunities? Let\'s connect!', 'color: #5bc0de; font-size: 14px;');