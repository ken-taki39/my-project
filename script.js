// Basic retro interactions: image modal, smooth scroll, contact form
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        el?.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });

  // Gallery modal
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.img-thumb').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalCaption.textContent = img.alt || '';
      modal.setAttribute('aria-hidden','false');
    });
  });
  modalClose.addEventListener('click', () => modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.setAttribute('aria-hidden','true');
  });

  // Contact form handling (uses Formspree by default)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending...';

    // ===== EDIT: If using Formspree, replace endpoint below with YOUR form endpoint =====
    // Example Formspree endpoint (replace with your own): https://formspree.io/f/yourid
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

    const formData = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (res.ok) {
        status.textContent = 'Thanks! Message sent.';
        form.reset();
      } else {
        const data = await res.json();
        status.textContent = data?.error || 'Submission failed. Try again later.';
      }
    } catch (err) {
      console.error(err);
      status.textContent = 'Network error. Try later.';
    }
  });

});
