document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  
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

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending...';

    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdklvzje';

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

  window.addEventListener("scroll", () => {
    const nav = document.querySelector(".nav");
    nav.classList.toggle("scrolled", window.scrollY > 50);
  });

});
