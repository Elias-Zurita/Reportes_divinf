/**
 * Portal de Reportes QA
 * División Informática · Loan Software
 */
(function () {
  'use strict';

  // ── Fecha en header ───────────────────────────────────────────────────────
  const dateEl = document.getElementById('headerDate');
  if (dateEl) {
    const now = new Date();
    const opts = { day: '2-digit', month: 'long', year: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('es-AR', opts);
  }

  // ── Toast ─────────────────────────────────────────────────────────────────
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3800);
  }

  // ── Abrir reporte en la misma pestaña ────────────────────────────────────
  window.openReport = function (filename) {
    window.location.href = filename;
  };

  // ── Cards pendientes: mostrar toast al hacer click ────────────────────────
  document.querySelectorAll('.card-pending').forEach(card => {
    card.addEventListener('click', () => {
      showToast('El reporte de este proyecto aún no está disponible. Estará listo próximamente.');
    });
  });

  // ── Cards disponibles: click en la card o en el botón navega al reporte ──
  document.querySelectorAll('.card-available').forEach(card => {
    const report = card.dataset.report;

    card.addEventListener('click', (e) => {
      // El botón ya tiene su propio onclick, evitar doble disparo
      if (e.target.closest('.card-btn')) return;
      if (report) window.openReport(report);
    });

    // Accesibilidad por teclado
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (report) window.openReport(report);
      }
    });
  });

  // ── Intersection Observer: anima cards al entrar en viewport ─────────────
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.project-card').forEach(card => {
      card.style.animationPlayState = 'paused';
      observer.observe(card);
    });
  }

  // ── Contador animado en hero ───────────────────────────────────────────────
  function animateCounter(el, target, duration) {
    if (!el) return;
    let current = 0;
    const step = duration / target;
    const timer = setInterval(() => {
      current++;
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, step);
  }

  const countEl = document.getElementById('countActive');
  if (countEl) {
    setTimeout(() => animateCounter(countEl, 1, 600), 500);
  }

})();
