// =====================
// Page Loader
// =====================
window.addEventListener('load', () => {
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = '<div class="loader-spinner"></div>';
  document.body.prepend(loader);
  
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 500);
  }, 1000);
});

// =====================
// Fade-in Animation with Stagger
// =====================
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    if (entry.target.classList.contains('stagger')) {
      const siblings = Array.from(entry.target.parentElement.children);
      siblings.forEach((el, index) => {
        if (el.classList.contains('stagger')) {
          el.style.transitionDelay = `${index * 150}ms`;
          el.classList.add('visible');
          observer.unobserve(el);
        }
      });
    } else {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// =====================
// Smooth Scroll for Internal Links
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('nav').offsetHeight;
      window.scrollTo({
        top: target.offsetTop - navHeight - 10,
        behavior: 'smooth'
      });
    }
  });
});

// =====================
// Scroll-to-Top Button
// =====================
const scrollBtn = document.createElement('button');
scrollBtn.innerText = "↑";
scrollBtn.id = "scrollToTop";
scrollBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollBtn);

scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "80px";
scrollBtn.style.right = "20px";
scrollBtn.style.display = "none";
scrollBtn.style.padding = "12px 16px";
scrollBtn.style.border = "none";
scrollBtn.style.borderRadius = "50%";
scrollBtn.style.backgroundColor = "#5bc0de";
scrollBtn.style.color = "#fff";
scrollBtn.style.fontSize = "20px";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
scrollBtn.style.zIndex = "999";

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =====================
// Dark Mode Toggle
// =====================
const darkModeBtn = document.createElement('button');
darkModeBtn.id = "darkModeToggle";
darkModeBtn.setAttribute('aria-label', 'Toggle dark mode');
document.body.appendChild(darkModeBtn);

darkModeBtn.style.position = "fixed";
darkModeBtn.style.bottom = "20px";
darkModeBtn.style.left = "20px";
darkModeBtn.style.padding = "12px";
darkModeBtn.style.borderRadius = "50%";
darkModeBtn.style.border = "none";
darkModeBtn.style.cursor = "pointer";
darkModeBtn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
darkModeBtn.style.zIndex = "999";
darkModeBtn.style.fontSize = "20px";
darkModeBtn.style.backgroundColor = "#fff";

// Load preference
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  darkModeBtn.innerText = "☀️";
} else {
  darkModeBtn.innerText = "🌙";
}

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  darkModeBtn.innerText = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// =====================
// Navbar Highlight on Scroll
// =====================
const sections = document.querySelectorAll("section, div.container[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active-link");
    }
  });
});

// =====================
// Navbar Background on Scroll
// =====================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    navbar.style.background = document.body.classList.contains('dark-mode') 
      ? '#1e1e1e' 
      : '#ffffff';
  } else {
    navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
  }
  
  lastScroll = currentScroll;
});

// =====================
// Project Card Hover Tilt
// =====================
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / 20).toFixed(2);
    const rotateY = ((centerX - x) / 20).toFixed(2);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

// =====================
// Lazy Loading Images
// =====================
const lazyImages = document.querySelectorAll("img");

const lazyObserver = new IntersectionObserver((entries, observer) => {
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

lazyImages.forEach(img => {
  lazyObserver.observe(img);
});

// =====================
// Timeline Animations
// =====================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
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

const exploringObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
      }, index * 150);
    }
  });
}, { threshold: 0.2 });

exploringCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px) scale(0.9)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  exploringObserver.observe(card);
});

// =====================
// Hero Section Typing Effect
// =====================
const heroTitle = document.querySelector('.hero-section h1');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.style.opacity = '1';
  
  let charIndex = 0;
  function typeChar() {
    if (charIndex < text.length) {
      heroTitle.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 50);
    }
  }
  
  // Start typing after a brief delay
  setTimeout(typeChar, 500);
}

// =====================
// Interactive Background Animation
// =====================
const body = document.body;
let hue = 200;

function animateBackground() {
  if (!body.classList.contains('dark-mode')) {
    hue = (hue + 0.1) % 60 + 200;
    body.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 95%), hsl(${(hue + 30) % 360}, 60%, 90%))`;
  }
  requestAnimationFrame(animateBackground);
}

animateBackground();

// =====================
// Parallax Effect for Hero Section
// =====================
const heroSection = document.querySelector('.hero-section');

window.addEventListener('scroll', () => {
  if (heroSection) {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }
});

// =====================
// CTA Button Ripple Effect
// =====================
const ctaButtons = document.querySelectorAll('.cta-buttons .btn');

ctaButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    const rippleContainer = button.querySelector('.ripple');
    if (rippleContainer) {
      rippleContainer.remove();
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// =====================
// Skills Progress Bars Animation
// =====================
const skillsSection = document.querySelector('#about-skills');

if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
          const width = bar.getAttribute('data-width') || '0%';
          bar.style.width = width;
        });
      }
    });
  }, { threshold: 0.5 });
  
  skillsObserver.observe(skillsSection);
}

// =====================
// Contact Form Animation
// =====================
const contactInputs = document.querySelectorAll('#contact input, #contact textarea');

contactInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
    this.style.borderColor = '#5bc0de';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
    this.style.borderColor = '';
  });
});

// =====================
// Easter Egg: Konami Code
// =====================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  
  if (konamiCode.join('') === konamiSequence.join('')) {
    document.body.style.animation = 'rainbow 2s linear infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(rainbowStyle);

// =====================
// Performance: Debounce Scroll Events
// =====================
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

// Apply debounce to scroll-heavy operations
window.addEventListener('scroll', debounce(() => {
  // Any additional scroll operations can go here
}, 10));

// =====================
// Accessibility: Skip to Content Link
// =====================
const skipLink = document.createElement('a');
skipLink.href = '#hero';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  background: #5bc0de;
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 10000;
`;
skipLink.addEventListener('focus', () => {
  skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
  skipLink.style.top = '-40px';
});
document.body.prepend(skipLink);

console.log('🚀 Portfolio loaded successfully!');
console.log('💡 Tip: Try the Konami code for a surprise!');