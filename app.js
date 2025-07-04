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