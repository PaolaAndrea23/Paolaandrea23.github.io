// JS para contacto.html e index.html

function showTab(tabId) {
  const tabs = document.querySelectorAll('[data-tab-target]');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach((tab) => {
    const isActive = tab.dataset.tabTarget === tabId;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
    tab.setAttribute('tabindex', isActive ? '0' : '-1');
  });

  contents.forEach((content) => {
    const isActive = content.id === tabId;
    content.classList.toggle('active', isActive);
    content.hidden = !isActive;
  });
}

// Validacion personalizada para el formulario de sugerencias
function validarSugerencias(event) {
  const form = event.target;
  const telefono = form.telefono.value.trim();
  const email = form.email_sugerencia.value.trim();
  const errorDiv = document.getElementById('error-sugerencias');
  errorDiv.style.display = 'none';
  errorDiv.textContent = '';

  // Validar telefono: solo numeros
  if (!/^\d+$/.test(telefono)) {
    errorDiv.textContent = 'El telefono solo debe contener numeros.';
    errorDiv.style.display = 'block';
    form.telefono.focus();
    event.preventDefault();
    return false;
  }
  // Validar email
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errorDiv.textContent = 'Por favor ingresa un correo electronico valido.';
    errorDiv.style.display = 'block';
    form.email_sugerencia.focus();
    event.preventDefault();
    return false;
  }
  return true;
}

// ===== CODIGO PARA INDEX.HTML =====

// Funcion para confirmar aprendizaje
function aprenderConfirm() {
  if (confirm('\u00BFDeseas realmente aprender con nosotros?')) {
    // Redirige a contacto.html y muestra la pestana de sugerencias
    window.location.href = 'contacto.html#sugerencias';
  }
}

// Funcionalidad del slider
let currentSlideIndex = 0;
let slides = [];
let dots = [];
let totalSlides = 0;
let autoSlideTimer = null;
const sliderItems = Array.from({ length: 13 }, (_, index) => ({
  src: `img/UltimosPecados${index + 1}.jpg`,
  alt: `Postre artesanal ${index + 1} de Bendito Pastel`,
}));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function initSlider() {
  const sliderTrack = document.getElementById('slider-track');
  const sliderDots = document.getElementById('slider-dots');

  if (!sliderTrack || !sliderDots || sliderItems.length === 0) return;

  sliderTrack.innerHTML = '';
  sliderDots.innerHTML = '';

  const slideWidthPercent = 100 / sliderItems.length;
  sliderItems.forEach((item, index) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.style.flex = `0 0 ${slideWidthPercent}%`;

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';
    img.addEventListener('click', () => openModal(img));

    slide.appendChild(img);
    sliderTrack.appendChild(slide);

    const dot = document.createElement('span');
    dot.className = index === 0 ? 'dot active' : 'dot';
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', `Ver ${item.alt.toLowerCase()}`);
    dot.tabIndex = 0;
    dot.addEventListener('click', () => showSlide(index));
    dot.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showSlide(index);
      }
    });
    sliderDots.appendChild(dot);
  });

  slides = Array.from(sliderTrack.querySelectorAll('.slide'));
  dots = Array.from(sliderDots.querySelectorAll('.dot'));
  totalSlides = slides.length;
  sliderTrack.style.width = `${totalSlides * 100}%`;

  showSlide(0);
}

function showSlide(index) {
  if (!totalSlides) return;

  const sliderTrack = document.getElementById('slider-track');
  if (!sliderTrack) return;

  const boundedIndex = (index + totalSlides) % totalSlides;
  const offsetPercent = totalSlides > 0 ? (boundedIndex * 100) / totalSlides : 0;
  sliderTrack.style.transform = `translateX(-${offsetPercent}%)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === boundedIndex);
  });

  currentSlideIndex = boundedIndex;
}

function moveSlider(direction) {
  if (!totalSlides) return;
  showSlide(currentSlideIndex + direction);
}

function startSliderAutoPlay() {
  stopSliderAutoPlay();
  autoSlideTimer = setInterval(() => {
    moveSlider(1);
  }, 5000);
}

function stopSliderAutoPlay() {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
}

function bindSliderControls() {
  const controls = document.querySelectorAll('[data-direction]');
  controls.forEach((control) => {
    const direction = Number(control.dataset.direction);
    if (Number.isNaN(direction)) return;
    control.addEventListener('click', () => moveSlider(direction));
  });
}

// Funcionalidad del modal
function openModal(img) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  if (!modal || !modalImg) return;

  modal.style.display = 'block';
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  if (!modal) return;
  modal.style.display = 'none';
  if (modalImg) modalImg.removeAttribute('src');
  document.body.style.overflow = 'auto';
}

// Funcion para abrir WhatsApp
function openWhatsApp() {
  const phoneNumber = '573176641807';
  const message = '\u00A1Hola! Me interesa conocer m\u00E1s sobre los deliciosos postres de Bendito Pastel.';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// Modo oscuro: aplicar tema guardado o preferencia del sistema
function applyTheme(isDark) {
  const html = document.documentElement;
  if (isDark) {
    html.classList.add('dark');
    try { localStorage.setItem('theme', 'dark'); } catch (_) {}
  } else {
    html.classList.remove('dark');
    try { localStorage.setItem('theme', 'light'); } catch (_) {}
  }
  document.querySelectorAll('[data-action="toggle-theme"]').forEach((btn) => {
    btn.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
    btn.setAttribute('title', isDark ? 'Modo claro' : 'Modo oscuro');
    const sun = btn.querySelector('.theme-icon-sun');
    const moon = btn.querySelector('.theme-icon-moon');
    if (sun) sun.hidden = !isDark;
    if (moon) moon.hidden = isDark;
  });
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (_) {}
  document.querySelectorAll('[data-action="toggle-theme"]').forEach((btn) => {
    btn.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
    btn.setAttribute('title', isDark ? 'Modo claro' : 'Modo oscuro');
    const sun = btn.querySelector('.theme-icon-sun');
    const moon = btn.querySelector('.theme-icon-moon');
    if (sun) sun.hidden = !isDark;
    if (moon) moon.hidden = isDark;
  });
}

// Inicializacion general
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = typeof localStorage !== 'undefined' && localStorage.getItem('theme');
  if (savedTheme === 'dark') applyTheme(true);
  else if (savedTheme === 'light') applyTheme(false);

  document.querySelectorAll('[data-action="toggle-theme"]').forEach((btn) => {
    btn.addEventListener('click', toggleTheme);
  });

  const tabButtons = document.querySelectorAll('[data-tab-target]');
  tabButtons.forEach((tab) => {
    tab.addEventListener('click', () => showTab(tab.dataset.tabTarget));
  });

  if (window.location.hash === '#sugerencias') {
    showTab('sugerencias');
  }

  const formSugerencias = document.getElementById('form-sugerencias');
  if (formSugerencias) {
    formSugerencias.addEventListener('submit', (e) => {
      if (!validarSugerencias(e)) e.preventDefault();
    });
  }

  const learnButton = document.querySelector('[data-action="learn-with-us"]');
  if (learnButton) {
    learnButton.addEventListener('click', aprenderConfirm);
  }

  const whatsappButton = document.querySelector('[data-action="open-whatsapp"]');
  if (whatsappButton) {
    whatsappButton.addEventListener('click', openWhatsApp);
  }

  const modalCloseButton = document.querySelector('[data-action="close-modal"]');
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeModal);
  }

  if (document.getElementById('slider-track')) {
    initSlider();
    bindSliderControls();
    if (!prefersReducedMotion.matches) {
      startSliderAutoPlay();
    }
    prefersReducedMotion.addEventListener('change', (event) => {
      if (event.matches) {
        stopSliderAutoPlay();
      } else {
        startSliderAutoPlay();
      }
    });
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

document.addEventListener('click', (event) => {
  const modal = document.getElementById('image-modal');
  if (modal && modal.style.display === 'block' && event.target === modal) {
    closeModal();
  }
});