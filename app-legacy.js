// Versión legacy para navegadores que no soportan módulos ES6
(function() {
  'use strict';

  // Configuración
  const CONFIG = {
    sliderItems: Array.from({ length: 13 }, (_, index) => ({
      src: 'img/UltimosPecados' + (index + 1) + '.jpg',
      alt: 'Postre artesanal ' + (index + 1) + ' de Bendito Pastel',
    })),
    whatsapp: {
      phoneNumber: '573176641807',
      defaultMessage: '¡Hola! Me interesa conocer más sobre los deliciosos postres de Bendito Pastel.',
    },
    theme: {
      localStorageKey: 'theme',
      defaultTheme: 'light',
    },
  };

  // Funciones de utilidad
  function showTab(tabId) {
    const tabs = document.querySelectorAll('[data-tab-target]');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(function(tab) {
      const isActive = tab.dataset.tabTarget === tabId;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    contents.forEach(function(content) {
      const isActive = content.id === tabId;
      content.classList.toggle('active', isActive);
      content.hidden = !isActive;
    });
  }

  function aprenderConfirm() {
    if (confirm('¿Deseas realmente aprender con nosotros?')) {
      window.location.href = 'contacto.html#sugerencias';
    }
  }

  function openWhatsApp() {
    const phoneNumber = CONFIG.whatsapp.phoneNumber;
    const message = CONFIG.whatsapp.defaultMessage;
    const url = 'https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
  }

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
      return false;
    }
    // Validar email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errorDiv.textContent = 'Por favor ingresa un correo electrónico válido.';
      errorDiv.style.display = 'block';
      form.email_sugerencia.focus();
      return false;
    }
    return true;
  }

  // Inicialización
  document.addEventListener('DOMContentLoaded', function() {
    // Configurar pestañas
    const tabButtons = document.querySelectorAll('[data-tab-target]');
    tabButtons.forEach(function(tab) {
      tab.addEventListener('click', function() {
        showTab(tab.dataset.tabTarget);
      });
    });

    if (window.location.hash === '#sugerencias') {
      showTab('sugerencias');
    }

    // Configurar validación de formularios
    const formSugerencias = document.getElementById('form-sugerencias');
    if (formSugerencias) {
      formSugerencias.addEventListener('submit', function(e) {
        if (!validarSugerencias(e)) e.preventDefault();
      });
    }

    // Configurar event listeners
    const learnButton = document.querySelector('[data-action="learn-with-us"]');
    if (learnButton) {
      learnButton.addEventListener('click', aprenderConfirm);
    }

    const whatsappButton = document.querySelector('[data-action="open-whatsapp"]');
    if (whatsappButton) {
      whatsappButton.addEventListener('click', openWhatsApp);
    }
  });
})();