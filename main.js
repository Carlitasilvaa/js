document.addEventListener('DOMContentLoaded', function() {
    let catalogo = [
        {
            titulo: "Barbie",
            calificacion: 0 
        },
        {
            titulo: "Saw X: El juego del miedo",
            calificacion: 0
        },
        {
            titulo: "Sonidos de libertad",
            calificacion: 0
        }
    ];

    let mensajeDiv = document.getElementById('mensaje');
    let formulario = document.getElementById('formulario');
    let respuestaUsuario;

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        let planSeleccionado = document.getElementById('elijasuplan').value.toLowerCase();
        let meses = parseInt(document.getElementById('elijalacantidaddemeses').value);

        if (planSeleccionado === "plan basico" || planSeleccionado === "plan intermedio" || planSeleccionado === "plan familiar") {
            calcularCostoDelPlan(planSeleccionado, meses);
        } else {
            mostrarMensaje("Plan incorrecto. Por favor, ingresa un plan válido.");
        }
    });

    function calcularCostoDelPlan(plan, meses) {
        let costoTotal = 0;
        switch (plan) {
            case "plan basico":
                costoTotal = meses * 1500;
                break;
            case "plan intermedio":
                costoTotal = meses * 2000;
                break;
            case "plan familiar":
                costoTotal = meses * 3000;
                break;
            default:
                mostrarMensaje("El plan seleccionado no es válido.");
                return;
        }

        mostrarMensaje(`Costo total del Plan ${plan} por ${meses} meses: $${costoTotal}`);
        let labelRespuesta = document.createElement("label");
        labelRespuesta.textContent = "¿Deseas contratar el plan? (sí/no)";
        let inputRespuesta = document.createElement("input");
        inputRespuesta.type = "text";
        inputRespuesta.id = "respuestaUsuario";
        let enviarRespuestaBtn = document.createElement("button");
        enviarRespuestaBtn.textContent = "Enviar";
        enviarRespuestaBtn.addEventListener("click", function() {
            respuestaUsuario = inputRespuesta.value.toLowerCase();
            if (respuestaUsuario === "si") {
                mostrarInputEmail();
            } else if (respuestaUsuario === "no") {
                mostrarMensaje("Gracias por visitar Narex. Esperamos verte de nuevo pronto.");
            } else {
                mostrarMensaje("Respuesta no válida. Por favor, ingresa 'si' o 'no'.");
            }
        });
        mensajeDiv.appendChild(labelRespuesta);
        mensajeDiv.appendChild(inputRespuesta);
        mensajeDiv.appendChild(enviarRespuestaBtn);
    }

    function mostrarMensaje(mensaje) {
        mensajeDiv.querySelector('h2').textContent = mensaje;
    }

    function mostrarInputEmail() {
        let inputEmail = document.createElement('input');
        inputEmail.type = 'email';
        inputEmail.placeholder = 'Ingrese su correo electrónico';
        inputEmail.id = 'emailInput';
        let enviarEmailBtn = document.createElement('button');
        enviarEmailBtn.textContent = 'Enviar';
        enviarEmailBtn.id = 'enviarEmailBtn';

        let email;

        enviarEmailBtn.addEventListener('click', function() {
            email = inputEmail.value;
            mostrarMensaje(`Gracias por utilizar Narex. Te hemos enviado un correo de confirmación a ${email}.`);
        });

        mensajeDiv.innerHTML = '';
        mensajeDiv.appendChild(inputEmail);
        mensajeDiv.appendChild(enviarEmailBtn);
    }
    let emailGuardado = localStorage.getItem('email');
    if (emailGuardado) {
        mostrarMensaje(`Correo electrónico guardado: ${emailGuardado}`);
    }
});



    function buscarPorTitulo(titulo) {
        return catalogo.find(item => item.titulo.toLowerCase() === titulo.toLowerCase());
    }

    function filtrarPorCalificacion(calificacionMinima) {
        return catalogo.filter(item => item.calificacion >= calificacionMinima);
    }