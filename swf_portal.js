/**
 * Presentation Engine — Division Informatica | Loan Software SWF Skills
 * Handles slide navigation, animations, progress and keyboard shortcuts.
 */

(function () {
  'use strict';

  // State
  const slides = Array.from(document.querySelectorAll('.slide:not(#closingSlide)'));
  const TOTAL = slides.length;
  let current = 0;
  let isAnimating = false;

  // DOM Refs
  const progressFill    = document.getElementById('progressFill');
  const currentSlideNum = document.getElementById('currentSlideNum');
  const totalSlidesNum  = document.getElementById('totalSlidesNum');
  const prevBtn         = document.getElementById('prevBtn');
  const nextBtn         = document.getElementById('nextBtn');
  const navDots         = document.getElementById('navDots');

  // Init
  function init() {
    totalSlidesNum.textContent = TOTAL;

    // Build nav dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('title', `Ir a diapositiva ${i + 1}`);
      dot.setAttribute('aria-label', `Diapositiva ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      navDots.appendChild(dot);
    });

    // Set initial slide
    slides[0].classList.add('active');
    updateUI();
    animateSlideContent(slides[0]);
  }

  // Navigation
  function goTo(index, direction) {
    if (isAnimating || index === current || index < 0 || index >= TOTAL) return;

    isAnimating = true;
    const prev = current;
    const dir  = direction !== undefined ? direction : (index > current ? 1 : -1);

    // Determine exit class for outgoing slide
    const exitClass = dir > 0 ? 'exiting-left' : 'exiting-right';

    // Setup incoming slide (off-screen)
    slides[index].classList.remove('active', 'exiting-left', 'exiting-right', 'entering-right', 'entering-left');

    // Apply enter direction transform via JS
    slides[index].style.transform = dir > 0 ? 'translateX(60px)' : 'translateX(-60px)';
    slides[index].style.opacity   = '0';
    slides[index].style.pointerEvents = 'none';
    slides[index].style.zIndex   = '5';

    // Trigger layout recalc
    void slides[index].offsetWidth;

    // Start transition on both slides
    slides[prev].classList.add(exitClass);
    slides[prev].classList.remove('active');

    // Animate incoming
    requestAnimationFrame(() => {
      slides[index].style.transition = 'opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)';
      slides[index].style.transform  = 'translateX(0)';
      slides[index].style.opacity    = '1';
      slides[index].style.zIndex     = '10';
    });

    // After animation ends, clean up
    setTimeout(() => {
      slides[prev].classList.remove(exitClass);
      slides[prev].style.cssText = '';
      slides[index].style.cssText = '';
      slides[index].classList.add('active');

      current = index;
      isAnimating = false;

      updateUI();
      animateSlideContent(slides[current]);
    }, 480);

    // Update UI immediately for responsiveness
    currentSlideNum.textContent = index + 1;
    updateProgress(index);
    updateDots(index);
    updateButtons(index);
  }

  function next() { goTo(current + 1, 1); }
  function prev() { goTo(current - 1, -1); }

  // UI Updates
  function updateUI() {
    updateProgress(current);
    updateDots(current);
    updateButtons(current);
    currentSlideNum.textContent = current + 1;
  }

  function updateProgress(index) {
    const pct = ((index + 1) / TOTAL) * 100;
    progressFill.style.width = pct + '%';
  }

  function updateDots(index) {
    const dots = navDots.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function updateButtons(index) {
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === TOTAL - 1;
  }

  // Slide Content Animation
  function animateSlideContent(slide) {
    // Reset and re-trigger stagger items
    const staggerItems = slide.querySelectorAll('.stagger-item');
    staggerItems.forEach((item, i) => {
      item.style.opacity   = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'none';

      setTimeout(() => {
        item.style.transition = `opacity 0.45s ease ${0.08 + i * 0.10}s, transform 0.45s ease ${0.08 + i * 0.10}s`;
        item.style.opacity   = '1';
        item.style.transform = 'translateY(0)';
      }, 20);
    });

    // Content anim blocks
    const animBlocks = slide.querySelectorAll('.slide-content-anim');
    animBlocks.forEach(block => {
      block.style.opacity   = '0';
      block.style.transform = 'translateY(24px)';
      block.style.transition = 'none';

      setTimeout(() => {
        block.style.transition = 'opacity 0.55s ease 0.10s, transform 0.55s ease 0.10s';
        block.style.opacity   = '1';
        block.style.transform = 'translateY(0)';
      }, 20);
    });

    // Special cover content
    const coverContent = slide.querySelector('.cover-content');
    if (coverContent) {
      coverContent.style.opacity   = '0';
      coverContent.style.transform = 'translateY(32px)';
      coverContent.style.transition = 'none';
      setTimeout(() => {
        coverContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        coverContent.style.opacity   = '1';
        coverContent.style.transform = 'translateY(0)';
      }, 50);
    }
  }

  // Event Listeners
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        next();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        prev();
        break;
      case 'Home':
        e.preventDefault();
        goTo(0);
        break;
      case 'End':
        e.preventDefault();
        goTo(TOTAL - 1);
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 'Escape':
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        break;
    }
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchStartY = 0;
  const container = document.getElementById('slidesContainer');

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    // Only horizontal swipes
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
  }, { passive: true });

  // Fullscreen
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  // Resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateUI();
    }, 150);
  });

  // Accessibility
  slides.forEach((slide, i) => {
    slide.setAttribute('role', 'region');
    slide.setAttribute('aria-label', `Diapositiva ${i + 1} de ${TOTAL}`);
    slide.setAttribute('tabindex', '-1');
  });

  // Slide click-to-advance
  slides.forEach(slide => {
    slide.addEventListener('click', (e) => {
      const tag = e.target.tagName.toLowerCase();
      if (['button', 'a', 'input', 'select'].includes(tag)) return;
      if (e.target.closest('button, a, input, select')) return;
      next();
    });
  });

  // Boot
  init();

  // Expose for debugging
  window.__pres = { goTo, next, prev, current: () => current, total: TOTAL };

})();
