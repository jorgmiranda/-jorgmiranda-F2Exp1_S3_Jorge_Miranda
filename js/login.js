function validar() {
    var username = document.getElementById("nombreCompleto").value;
    var password = document.getElementById("contrasenaUsuario").value;

    const listaUsuarios = JSON.parse(sessionStorage.getItem('usuarios'));
    //Se verifica si existe usuarios en memoria
    try {
        if (listaUsuarios) {
            listaUsuarios.forEach(function (usuario) {
                if (usuario.nombreUsuario == username) {
                    if (usuario.contrasena == password) {
                        alert('Sesión iniciada!');
                        usuario.sesionIniciada = true;
                        sessionStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
                        location.reload();
                        throw new Error('Salida del bucle')
                        
                    } else {
                        alert('La contraseña es incorrecta');
                        throw new Error('Salida del bucle')
                    }
                } else {
                    alert('El nombre de usuario ingresado no existe');
                    throw new Error('Salida del bucle')
                }
            });
        } else {
            alert('El usuario no esta registrado');

        }
    } catch (error) {
        if (error.message !== 'Salida del bucle') {
            throw error; 
        }
    }


}