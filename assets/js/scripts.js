/*====================================================================
                        PORTFOLIO MODERN SPA LOGIC
=====================================================================*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader Hide
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
    // Fallback if window load doesn't trigger quickly
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 2500);
  }

  // 2. Mobile Nav Toggle
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarNav = document.querySelector('.navbar-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navbarToggler && navbarNav) {
    navbarToggler.addEventListener('click', () => {
      navbarToggler.classList.toggle('active');
      navbarNav.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarToggler.classList.remove('active');
        navbarNav.classList.remove('active');
      });
    });
  }

  // 3. Navbar scroll effect & Active page link tracking
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navigation-scroll');
    } else {
      navbar.classList.remove('navigation-scroll');
    }
  });

  // Section highlight on scroll using IntersectionObserver
  const sections = document.querySelectorAll('section');
  const navObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => navObserver.observe(section));

  // 4. Interactive Canvas Particles Background
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const colors = ['#00f2fe', '#4facfe', '#8a2be2', '#ff007f'];
    
    let mouse = {
      x: null,
      y: null,
      radius: 120
    };

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    // Resize Canvas
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    }
    
    window.addEventListener('resize', resizeCanvas);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // Check boundary collisions
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Mouse interact bounce
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
              this.x += 2;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
              this.x -= 2;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
              this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
              this.y -= 2;
            }
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function initParticles() {
      particlesArray = [];
      let numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 11000), 100);
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1.5;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = colors[Math.floor(Math.random() * colors.length)];
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function connectParticles() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            opacityValue = 1 - (distance / 130);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.08})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      requestAnimationFrame(animateParticles);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connectParticles();
    }

    resizeCanvas();
    animateParticles();
  }

  // 5. Typist Text Effect
  const typedSpan = document.querySelector('.typed-text');
  if (typedSpan) {
    const words = ["FullStack Developer", "Flutter App Developer", "DevOps Specialist", "UI/UX Designer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typedSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typedSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400; // Pause before typing new word
      }

      setTimeout(typeEffect, typeSpeed);
    }
    setTimeout(typeEffect, 1000);
  }

  // 6. Intersection Observer for Skills Bar Animation
  const skillCircles = document.querySelectorAll('.skill-circle-progress');
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const percent = entry.target.dataset.percent;
        const radius = parseFloat(entry.target.getAttribute('r')) || 30;
        const circumference = 2 * Math.PI * radius;
        entry.target.style.strokeDasharray = circumference;
        const offset = circumference - (percent / 100) * circumference;
        entry.target.style.strokeDashoffset = offset;
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  skillCircles.forEach(circle => {
    const parentPercent = circle.closest('.skill-card').querySelector('.chart').textContent.replace('%', '').trim();
    circle.dataset.percent = parentPercent;
    skillsObserver.observe(circle);
  });

  // 7. Numeric Stat Counters on Scroll
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.textContent, 10);
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        
        if (target > 0) {
          const timer = setInterval(() => {
            current += Math.ceil(target / (duration / stepTime));
            if (current >= target) {
              entry.target.textContent = target;
              clearInterval(timer);
            } else {
              entry.target.textContent = current;
            }
          }, stepTime);
        } else {
          entry.target.textContent = '0';
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => counterObserver.observe(counter));

  // 8. Custom Portfolio Filtering & Clean Lightbox Modal
  const filterList = document.querySelectorAll('.list-filter li');
  const portfolioItems = document.querySelectorAll('.filtr-item');

  if (filterList.length && portfolioItems.length) {
    filterList.forEach(btn => {
      btn.addEventListener('click', () => {
        filterList.forEach(item => item.classList.remove('active'));
        btn.classList.add('active');
        
        const filterVal = btn.dataset.filter;
        
        portfolioItems.forEach(item => {
          if (filterVal === 'all') {
            item.classList.remove('hidden');
          } else {
            const categories = item.dataset.category.split(',');
            if (categories.includes(filterVal)) {
              item.classList.remove('hidden');
            } else {
              item.classList.add('hidden');
            }
          }
        });
      });
    });
  }

  // Custom Lightbox Modal Controller
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const openTriggers = document.querySelectorAll('.lightbox-trigger');

  if (lightbox && lightboxImg && lightboxClose) {
    openTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const imgUrl = trigger.getAttribute('href') || trigger.dataset.image;
        if (imgUrl) {
          lightboxImg.setAttribute('src', imgUrl);
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden'; // Lock main scrolling
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Unlock main scrolling
      setTimeout(() => {
        lightboxImg.setAttribute('src', '');
      }, 300);
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // 9. Interactive Contact Form Handler
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
      
      // Simulate submission network response (1.5 seconds)
      setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff87, #60efff)';
        
        // Custom popup notification
        const notification = document.createElement('div');
        notification.style.cssText = `
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: rgba(10, 11, 13, 0.9);
          border: 1px solid var(--accent-cyan);
          border-radius: 8px;
          padding: 15px 25px;
          color: #fff;
          font-family: var(--font-heading);
          font-weight: 600;
          box-shadow: var(--glow-shadow-cyan);
          z-index: 10000000;
          backdrop-filter: blur(8px);
          transform: translateY(50px);
          opacity: 0;
          transition: var(--transition-smooth);
        `;
        notification.innerHTML = 'Thank you! Your message was sent successfully.';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.style.transform = 'translateY(0)';
          notification.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
          notification.style.transform = 'translateY(50px)';
          notification.style.opacity = '0';
          setTimeout(() => notification.remove(), 400);
          
          // Reset button
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          contactForm.reset();
        }, 4000);
        
      }, 1500);
    });
  }

  // 11. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.skill-card, .features-item, .filtr-item, .title-section, .about-content, .hero-content');
  revealElements.forEach(el => el.classList.add('reveal-up'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));
});