// JS para contacto.html

function showTab(tabId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.querySelector('.tab[onclick*="' + tabId + '"]').classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Validación personalizada para el formulario de sugerencias
function validarSugerencias(event) {
    const form = event.target;
    const telefono = form.telefono.value.trim();
    const email = form.email_sugerencia.value.trim();
    const errorDiv = document.getElementById('error-sugerencias');
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';

    // Validar teléfono: solo números
    if (!/^\d+$/.test(telefono)) {
        errorDiv.textContent = 'El teléfono solo debe contener números.';
        errorDiv.style.display = 'block';
        form.telefono.focus();
        event.preventDefault();
        return false;
    }
    // Validar email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        errorDiv.textContent = 'Por favor ingresa un correo electrónico válido.';
        errorDiv.style.display = 'block';
        form.email_sugerencia.focus();
        event.preventDefault();
        return false;
    }
    return true;
}

// Activar automáticamente la pestaña de sugerencias si la URL contiene #sugerencias
window.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash === '#sugerencias') {
        showTab('sugerencias');
    }
});

// ===== CÓDIGO PARA INDEX.HTML =====

// Función para confirmar aprendizaje
function aprenderConfirm() {
  if (confirm("¿Deseas realmente aprender con nosotros?")) {
    // Redirige a contacto.html y muestra la pestaña de sugerencias
    window.location.href = "contacto.html#sugerencias";
  }
}

// Funcionalidad del slider
let currentSlideIndex = 0;
let slides, dots, totalSlides;

function initSlider() {
  // Array de imágenes - fácil de expandir agregando más números
  // Para agregar más imágenes, simplemente agrega el número al array
  // Ejemplo: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  const imageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  
  const sliderTrack = document.getElementById('slider-track');
  const sliderDots = document.getElementById('slider-dots');
  
  if (!sliderTrack || !sliderDots) return;
  
  // Limpiar contenido existente
  sliderTrack.innerHTML = '';
  sliderDots.innerHTML = '';
  
  // Generar slides y dots dinámicamente
  imageNumbers.forEach((number, index) => {
    // Crear slide
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.style.width = `${100 / imageNumbers.length}%`;
    slide.innerHTML = `<img src="img/UltimosPecados${number}.jpg" alt="Último pecado ${number}" onclick="openModal(this)" />`;
    sliderTrack.appendChild(slide);
    
    // Crear dot
    const dot = document.createElement('span');
    dot.className = index === 0 ? 'dot active' : 'dot';
    dot.onclick = () => currentSlide(index + 1);
    sliderDots.appendChild(dot);
  });
  
  // Establecer el ancho total del slider-track
  sliderTrack.style.width = `${imageNumbers.length * 100}%`;
  
  // Actualizar variables globales
  slides = document.querySelectorAll('.slide');
  dots = document.querySelectorAll('.dot');
  totalSlides = slides.length;
  
  // Inicializar el slider
  showSlide(0);
}

function showSlide(index) {
  const sliderTrack = document.getElementById('slider-track');
  const slideWidth = 100 / totalSlides;
  
  // Mover el track
  sliderTrack.style.transform = `translateX(-${index * slideWidth}%)`;
  
  // Actualizar dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  currentSlideIndex = index;
}

function moveSlider(direction) {
  currentSlideIndex += direction;
  
  if (currentSlideIndex >= totalSlides) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = totalSlides - 1;
  }
  
  showSlide(currentSlideIndex);
}

function currentSlide(index) {
  showSlide(index - 1);
}

// Funcionalidad del modal
function openModal(img) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  modal.style.display = 'block';
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  document.body.style.overflow = 'hidden'; // Prevenir scroll del body
}

function closeModal() {
  const modal = document.getElementById('image-modal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restaurar scroll del body
}

// Inicialización general
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar slider si existe
  if (document.getElementById('slider-track')) {
    initSlider();
    showSlide(0);
    
    // Auto-slide cada 5 segundos
    setInterval(() => {
      moveSlider(1);
    }, 5000);
  }
  
  // Activar pestaña de sugerencias si es necesario
  if (window.location.hash === '#sugerencias') {
    showTab('sugerencias');
  }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Cerrar modal al hacer clic fuera de la imagen
document.addEventListener('click', function(event) {
  const modal = document.getElementById('image-modal');
  if (event.target === modal) {
    closeModal();
  }
});

// Función para abrir WhatsApp
function openWhatsApp() {
  const phoneNumber = '573176641807';
  const message = '¡Hola! Me interesa conocer más sobre los deliciosos postres de Bendito Pastel 🧁🎂';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
} 