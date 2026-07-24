// =============================================
//  BENDITO PASTEL — JavaScript Global
// =============================================

// ----- Contact form endpoint (FormSubmit) -----
// Messages go to the shop owner (Andre). FormSubmit requires a one-time
// activation: the first submission triggers a confirmation email that must be
// clicked before any message is actually delivered.
const FORM_ENDPOINT = 'https://formsubmit.co/benditopastelcakeshop@gmail.com';
// NOTE: src/config.js exists but is NOT loaded by any page (it uses ES `export`
// while app.js is a classic <script>). Keep FORM_ENDPOINT here so it actually runs.

// ----- Header: efecto al hacer scroll -----
const header = document.getElementById('header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ----- Hero: animacion de entrada de fondo -----
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  heroBg.playbackRate = 0.6; // ajustar: 0.5=lento, 0.7=medio, 1.0=normal
  requestAnimationFrame(() => {
    setTimeout(() => heroBg.classList.add('loaded'), 80);
  });
}

// ----- Drawer: menu movil -----
const menuToggle   = document.getElementById('menu-toggle');
const drawer       = document.getElementById('drawer');
const drawerClose  = document.getElementById('drawer-close');
const drawerOverlay = document.getElementById('drawer-overlay');

function openDrawer() {
  if (!drawer) return;
  drawer.classList.add('open');
  if (drawerOverlay) drawerOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
  if (drawerClose) drawerClose.focus();
}

function closeDrawer() {
  if (!drawer) return;
  drawer.classList.remove('open');
  if (drawerOverlay) drawerOverlay.classList.remove('show');
  document.body.style.overflow = '';
  if (menuToggle) menuToggle.focus();
}

if (menuToggle)     menuToggle.addEventListener('click', openDrawer);
if (drawerClose)    drawerClose.addEventListener('click', closeDrawer);
if (drawerOverlay)  drawerOverlay.addEventListener('click', closeDrawer);

// ----- Modal: galeria de imagenes -----
const modal         = document.getElementById('image-modal');
const modalImg      = document.getElementById('modal-img');
const modalCloseBtn = document.getElementById('modal-close');

function openModal(src, alt) {
  if (!modal || !modalImg) return;
  modalImg.src = src;
  modalImg.alt = alt || '';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (modalCloseBtn) modalCloseBtn.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  if (modalImg) modalImg.src = '';
  document.body.style.overflow = '';
}

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// Cerrar con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeDrawer();
  }
});

// Galeria clickeable
document.querySelectorAll('.galeria-grid img').forEach((img) => {
  img.setAttribute('tabindex', '0');
  img.setAttribute('role', 'button');
  img.setAttribute('aria-label', `Ampliar imagen: ${img.alt}`);

  img.addEventListener('click', () => openModal(img.src, img.alt));
  img.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(img.src, img.alt);
    }
  });
});

// ----- Nav activo segun pagina -----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-link').forEach((link) => {
  const href = link.getAttribute('href');
  link.classList.toggle('active', href === currentPage);
});

document.querySelectorAll('.drawer-link').forEach((link) => {
  const href = link.getAttribute('href');
  link.classList.toggle('active', href === currentPage);
});

// ----- Nav de productos: resaltado segun seccion visible -----
if (document.querySelector('.productos-nav')) {
  const sections = document.querySelectorAll('.productos-section[id]');
  const navLinks = document.querySelectorAll('.productos-nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

// ----- Formulario de contacto -----
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const successMsg = document.getElementById('form-success');
  const errorMsg   = contactForm.querySelector('.bp-form-error');
  const btn        = contactForm.querySelector('.form-submit');
  const originalLabel = btn ? btn.textContent : 'Enviar mensaje';

  // Set the real action/method so the form is also usable without JS.
  contactForm.setAttribute('method', 'POST');
  contactForm.setAttribute('action', FORM_ENDPOINT);
  contactForm.setAttribute('accept-charset', 'utf-8');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Hide any previous feedback.
    if (successMsg) successMsg.style.display = 'none';
    if (errorMsg) errorMsg.style.display = 'none';

    // Honeypot: if the hidden field is filled, treat as spam and silently "succeed".
    const honeypot = contactForm.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value) {
      contactForm.reset();
      if (successMsg) successMsg.style.display = 'block';
      return;
    }

    // Native validation first (form has novalidate; checkValidity drives the bubbles).
    if (typeof contactForm.checkValidity === 'function' && !contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (!btn) return;
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    try {
      const payload = Object.fromEntries(new FormData(contactForm).entries());
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        contactForm.reset();
        if (successMsg) {
          successMsg.style.display = 'block';
          setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
        }
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      // Visible error: do NOT silently succeed.
      if (errorMsg) errorMsg.style.display = 'block';
      // eslint-disable-next-line no-console
      console.error('[contact-form] submit failed:', err);
    } finally {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  });
}

// ----- Smooth scroll para enlaces de ancla -----
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72 + 60; // header + productos-nav
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
