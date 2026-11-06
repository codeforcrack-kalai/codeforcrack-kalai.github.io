/*====================================================================
  KALAISELVAN THIYAGARAJAN — SPOTIFY INTERACTIVE LOGIC
=====================================================================*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Pill Tracking on Scroll
  const navPills = document.querySelectorAll('.nav-pill');
  const sections = document.querySelectorAll('section[id]');

  if (sections.length && navPills.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navPills.forEach(pill => {
            if (pill.getAttribute('href') === `#${id}`) {
              pill.classList.add('active');
            } else {
              pill.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(section => navObserver.observe(section));
  }

  // 2. Project Category Filtering
  const filterPills = document.querySelectorAll('.filter-pill');
  const albumCards = document.querySelectorAll('.album-card');

  if (filterPills.length && albumCards.length) {
    // Hide empty placeholder cards initially in "All" view
    albumCards.forEach(card => {
      if (card.classList.contains('empty-project-card')) {
        card.classList.add('hidden');
      }
    });

    filterPills.forEach(btn => {
      btn.addEventListener('click', () => {
        filterPills.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filterVal = btn.dataset.filter;

        albumCards.forEach(card => {
          if (filterVal === 'all') {
            if (card.classList.contains('empty-project-card')) {
              card.classList.add('hidden');
            } else {
              card.classList.remove('hidden');
            }
          } else {
            const categories = (card.dataset.category || '').split(',');
            if (categories.includes(filterVal)) {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          }
        });
      });
    });
  }

  // 3. Resume Modal Controller
  const resumeModal = document.getElementById('resume-modal');
  const resumeModalBackdrop = document.getElementById('resume-modal-backdrop');
  const resumeModalClose = document.getElementById('resume-modal-close');
  const printResumeBtn = document.getElementById('btn-print-resume');

  const resumeTriggers = [
    document.getElementById('btn-open-resume'),
    document.getElementById('btn-hero-resume'),
    document.getElementById('btn-about-resume'),
    document.getElementById('btn-player-cv')
  ].filter(Boolean);

  if (resumeModal) {
    const openResume = () => {
      resumeModal.classList.add('active');
      resumeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      resumeModalClose?.focus();
    };

    const closeResume = () => {
      resumeModal.classList.remove('active');
      resumeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    resumeTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openResume();
      });
    });

    if (resumeModalClose) resumeModalClose.addEventListener('click', closeResume);
    if (resumeModalBackdrop) resumeModalBackdrop.addEventListener('click', closeResume);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        closeResume();
      }
    });

    if (printResumeBtn) {
      printResumeBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  // 4. Lightbox Modal
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

  if (lightboxModal && lightboxImg && lightboxClose) {
    const openLightbox = (imgSrc) => {
      lightboxImg.src = imgSrc;
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    };

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        lightboxImg.src = '';
      }, 200);
    };

    lightboxTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const imgSrc = trigger.getAttribute('href');
        if (imgSrc) openLightbox(imgSrc);
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // 5. Contact Form Handler (Mailto Fallback)
  const contactForm = document.getElementById('contact-form-element');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value || '';
      const email = document.getElementById('form-email')?.value || '';
      const subject = document.getElementById('form-subject')?.value || '';
      const message = document.getElementById('form-message')?.value || '';

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Opening Mail...';
      }

      const mailtoUrl = `mailto:codeforcrack@gmail.com?subject=${encodeURIComponent(subject + ' - Portfolio Inquiry')}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
          contactForm.reset();
        }, 2000);
      }, 400);
    });
  }

  // 6. Ask AI Prompt Copy Handler
  const copyAiBtn = document.getElementById('btn-copy-ai-prompt');
  const copyAiToast = document.getElementById('copy-ai-toast');
  if (copyAiBtn) {
    copyAiBtn.addEventListener('click', async () => {
      const promptText = `Who is Kalaiselvan Thiyagarajan?
Please summarize his software engineering background, key projects, and technical skills from his official portfolio: https://codeforcrack-kalai.github.io/`;

      try {
        await navigator.clipboard.writeText(promptText);
        if (copyAiToast) {
          copyAiToast.classList.add('show');
          setTimeout(() => {
            copyAiToast.classList.remove('show');
          }, 2400);
        }
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = promptText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        if (copyAiToast) {
          copyAiToast.classList.add('show');
          setTimeout(() => {
            copyAiToast.classList.remove('show');
          }, 2400);
        }
      }
    });
  }

  // 7. Interactive Grok Bot Companion (Eye Tracking & Autonomous Expressions)
  const grokBot = document.getElementById('hero-grok-bot');
  const grokEyesWrap = grokBot ? grokBot.querySelector('.grok-bot-eyes') : null;
  const grokEyeLeft = grokBot ? grokBot.querySelector('.grok-eye-left') : null;
  const grokEyeRight = grokBot ? grokBot.querySelector('.grok-eye-right') : null;

  if (grokBot && grokEyesWrap && grokEyeLeft && grokEyeRight) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let isTracking = true;
    let isBusyWithEmoji = false;

    // Fluid Eye Positioning based on cursor
    function updateGrokEyes() {
      if (!isTracking || isBusyWithEmoji) return;
      const rect = grokBot.getBoundingClientRect();
      const botCenterX = rect.left + rect.width / 2;
      const botCenterY = rect.top + rect.height / 2;

      const deltaX = mouseX - botCenterX;
      const deltaY = mouseY - botCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      const maxRadius = 15; // Max travel in pixels
      const moveDistance = Math.min(distance / 24, maxRadius);
      const angle = Math.atan2(deltaY, deltaX);

      const eyeX = Math.cos(angle) * moveDistance;
      const eyeY = Math.sin(angle) * moveDistance;

      grokEyesWrap.style.setProperty('--eye-x', `${eyeX.toFixed(1)}px`);
      grokEyesWrap.style.setProperty('--eye-y', `${eyeY.toFixed(1)}px`);
    }

    // Cursor Movement Listener
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateGrokEyes();
    }, { passive: true });

    // Touch Support for mobile/tablets
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        updateGrokEyes();
      }
    }, { passive: true });

    // Autonomous Random Eye Expressions & Emojis
    const expressions = ['blink', 'double-blink', 'happy', 'wink', 'surprised', 'squint', 'curious-look'];

    function triggerRandomGrokExpression() {
      if (!isTracking) {
        setTimeout(triggerRandomGrokExpression, 2500);
        return;
      }

      const expression = expressions[Math.floor(Math.random() * expressions.length)];

      if (expression === 'blink') {
        grokEyeLeft.classList.add('blink');
        grokEyeRight.classList.add('blink');
        setTimeout(() => {
          grokEyeLeft.classList.remove('blink');
          grokEyeRight.classList.remove('blink');
        }, 140);
      } else if (expression === 'double-blink') {
        grokEyeLeft.classList.add('blink');
        grokEyeRight.classList.add('blink');
        setTimeout(() => {
          grokEyeLeft.classList.remove('blink');
          grokEyeRight.classList.remove('blink');
          setTimeout(() => {
            grokEyeLeft.classList.add('blink');
            grokEyeRight.classList.add('blink');
            setTimeout(() => {
              grokEyeLeft.classList.remove('blink');
              grokEyeRight.classList.remove('blink');
            }, 120);
          }, 90);
        }, 140);
      } else if (expression === 'happy') {
        isBusyWithEmoji = true;
        grokEyeLeft.classList.add('happy');
        grokEyeRight.classList.add('happy');
        setTimeout(() => {
          grokEyeLeft.classList.remove('happy');
          grokEyeRight.classList.remove('happy');
          isBusyWithEmoji = false;
          updateGrokEyes();
        }, 1600);
      } else if (expression === 'wink') {
        isBusyWithEmoji = true;
        grokEyeLeft.classList.add('blink');
        setTimeout(() => {
          grokEyeLeft.classList.remove('blink');
          isBusyWithEmoji = false;
          updateGrokEyes();
        }, 350);
      } else if (expression === 'surprised') {
        isBusyWithEmoji = true;
        grokEyeLeft.classList.add('surprised');
        grokEyeRight.classList.add('surprised');
        setTimeout(() => {
          grokEyeLeft.classList.remove('surprised');
          grokEyeRight.classList.remove('surprised');
          isBusyWithEmoji = false;
          updateGrokEyes();
        }, 1400);
      } else if (expression === 'squint') {
        isBusyWithEmoji = true;
        grokEyeLeft.classList.add('squint');
        grokEyeRight.classList.add('squint');
        setTimeout(() => {
          grokEyeLeft.classList.remove('squint');
          grokEyeRight.classList.remove('squint');
          isBusyWithEmoji = false;
          updateGrokEyes();
        }, 1300);
      } else if (expression === 'curious-look') {
        isBusyWithEmoji = true;
        const glanceX = (Math.random() > 0.5 ? 1 : -1) * 14;
        grokEyesWrap.style.setProperty('--eye-x', `${glanceX}px`);
        grokEyesWrap.style.setProperty('--eye-y', `-12px`);
        setTimeout(() => {
          isBusyWithEmoji = false;
          updateGrokEyes();
        }, 1100);
      }

      // Schedule next expression at random intervals between 2.5s and 5.5s
      const nextDelay = 2500 + Math.random() * 3000;
      setTimeout(triggerRandomGrokExpression, nextDelay);
    }

    // Start expression loop after 1.5 seconds
    setTimeout(triggerRandomGrokExpression, 1500);

    // Interactive Click / Tap Reaction
    grokBot.addEventListener('click', () => {
      grokBot.classList.add('bounce');
      grokEyeLeft.classList.add('happy');
      grokEyeRight.classList.add('happy');
      isBusyWithEmoji = true;

      setTimeout(() => {
        grokBot.classList.remove('bounce');
        grokEyeLeft.classList.remove('happy');
        grokEyeRight.classList.remove('happy');
        isBusyWithEmoji = false;
        updateGrokEyes();
      }, 850);
    });
  }
});
