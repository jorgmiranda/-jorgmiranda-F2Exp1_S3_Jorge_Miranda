document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;

    const contrasena1 = document.getElementById('contrasenaUsuario1').value;
    const contrasena2 = document.getElementById('contrasenaUsuario2').value;
    if (!contrasena1 || contrasena1 !== contrasena2) {
        alert('Las contraseñas no coinciden');
        isValid = false;
    }

    const passwordPattern = /^(?=.*[0-9])(?=.*[A-Z]).{6,18}$/;
    if (!passwordPattern.test(contrasena1)) {
        alert('La contraseña debe contener al menos un número y una letra en mayúscula.');
        isValid = false;
    }

    const fechaNacimiento = document.getElementById('fechaNacimientoUsuario').value;
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    if (edad < 13) {
        alert('Debes tener al menos 13 años para registrarte en este sitio.');
        isValid = false;
    }
    
    if (isValid) {
        document.getElementById('registrationForm').submit();
    }
});

function limpiarFormulario() {
    document.getElementById("registrationForm").reset();
}

