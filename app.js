// =============================================
//  BENDITO PASTEL — JavaScript Global
// =============================================

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

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.form-submit');
    const original = btn.textContent;

    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Simula envio (aqui iria la integracion real con un backend o servicio)
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      contactForm.reset();
      if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
      }
    }, 1200);
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
