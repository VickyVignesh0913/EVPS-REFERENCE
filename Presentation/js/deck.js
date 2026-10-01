/**
 * COGNIRA — PRESENTATION DECK CONTROLLER
 * Handles keyboard navigation, HUD state, slide indicators, and judge pitch timer.
 */

window.CogniraDeck = (function () {
  let currentIdx = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  const counter = document.getElementById('slideCounter');
  const progressBar = document.getElementById('progress');
  const dotsContainer = document.getElementById('slideDots');

  // Build dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `slide-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('title', `Jump to slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function updateHUD(idx) {
    if (counter) {
      const cur = String(idx + 1).padStart(2, '0');
      const tot = String(totalSlides).padStart(2, '0');
      counter.textContent = `${cur} / ${tot}`;
    }

    if (progressBar) {
      const pct = ((idx + 1) / totalSlides) * 100;
      progressBar.style.width = `${pct}%`;
    }

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.slide-dot');
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === idx);
      });
    }
  }

  function goToSlide(targetIdx) {
    if (targetIdx === currentIdx || targetIdx < 0 || targetIdx >= totalSlides) return;

    const oldSlide = slides[currentIdx];
    const newSlide = slides[targetIdx];

    // Trigger Motion Exit & Entrance
    if (window.CogniraMotion) {
      window.CogniraMotion.animateSlideExit(oldSlide, () => {
        oldSlide.classList.remove('active');
        newSlide.classList.add('active');
        currentIdx = targetIdx;
        updateHUD(currentIdx);
        window.CogniraMotion.animateSlideEntrance(newSlide);

      });
    } else {
      oldSlide.classList.remove('active');
      newSlide.classList.add('active');
      currentIdx = targetIdx;
      updateHUD(currentIdx);
    }
  }

  function nextSlide() {
    if (currentIdx < totalSlides - 1) {
      goToSlide(currentIdx + 1);
    } else {
      goToSlide(0); // loop
    }
  }

  function prevSlide() {
    if (currentIdx > 0) {
      goToSlide(currentIdx - 1);
    } else {
      goToSlide(totalSlides - 1);
    }
  }

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Ignore input fields if any
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(totalSlides - 1);
    } else if (e.key.toLowerCase() === 'f') {
      toggleFullscreen();
    }
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  /**
   * 2-Minute Judge Pitch Timer
   */
  function initPitchTimer() {
    let timeLeft = 120; // 120 seconds
    let timerRunning = false;
    let timerInterval = null;
    const timerText = document.getElementById('timerText');
    const timerDot = document.getElementById('timerDot');
    const pitchTimer = document.getElementById('pitchTimer');

    if (!pitchTimer) return;

    function formatTime(s) {
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }

    pitchTimer.addEventListener('click', () => {
      if (!timerRunning) {
        timerRunning = true;
        if (timerDot) timerDot.style.background = '#10b981';
        timerInterval = setInterval(() => {
          timeLeft--;
          if (timerText) timerText.textContent = formatTime(timeLeft);
          if (timeLeft <= 30 && timerDot) {
            timerDot.style.background = '#f59e0b';
          }
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (timerDot) timerDot.style.background = '#f43f5e';
            if (timerText) timerText.textContent = '00:00';
          }
        }, 1000);
      } else {
        timerRunning = false;
        clearInterval(timerInterval);
        if (timerDot) timerDot.style.background = '#64748b';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateHUD(0);
    initPitchTimer();
    // Initial entrance on slide 1
    if (window.CogniraMotion && slides[0]) {
      window.CogniraMotion.animateSlideEntrance(slides[0]);
    }
  });

  return {
    nextSlide,
    prevSlide,
    goToSlide,
    toggleFullscreen
  };
})();
