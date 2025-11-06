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
// Console Message
// =====================
console.log('%c🚀 Portfolio Website Loaded Successfully!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%c👨‍💻 Designed and Developed by Vincent Collins', 'color: #764ba2; font-size: 14px;');
console.log('%c💼 Looking for opportunities? Let\'s connect!', 'color: #5bc0de; font-size: 14px;');