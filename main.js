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

function buscarPorTitulo(titulo) {
    return catalogo.find(item => item.titulo.toLowerCase() === titulo.toLowerCase());
}

function filtrarPorCalificacion(calificacionMinima) {
    return catalogo.filter(item => item.calificacion >= calificacionMinima);
}

document.addEventListener("DOMContentLoaded", function() {
    let formulario = document.getElementById("formulario");
    let planInput = document.getElementById("elijasuplan");
    let mesesInput = document.getElementById("elijalacantidaddemeses");
    let mensajeTitulo = document.querySelector("#mensaje h2");
    let mensajeTexto = document.querySelector("#mensaje p");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        let bienvenido = planInput.value.toLowerCase();
        let meses1 = parseInt(mesesInput.value);

        if (bienvenido === "plan basico" || bienvenido === "plan intermedio" || bienvenido === "plan familiar") {
            let costoTotal = calcularCostoDelPlan(bienvenido, meses1);
            mensajeTitulo.textContent = `Costo total del Plan ${bienvenido} por ${meses1} meses: $${costoTotal}`;
            mensajeTexto.textContent = ""; 
        } else {
            mensajeTitulo.textContent = "Plan incorrecto";
            mensajeTexto.textContent = ""; 
        }
    });
});


function calcularCostoDelPlan(bienvenido, meses1) {
    let planB = 1500;
    let planI = 2000;
    let planF = 3000;
    let costoTotal = 0;

    switch (bienvenido) {
        case "plan basico":
            costoTotal = meses1 * planB;
            break;
        case "plan intermedio":
            costoTotal = meses1 * planI;
            break;
        case "plan familiar":
            costoTotal = meses1 * planF;
            break;
        default:
            alert("El plan seleccionado no es válido.");
            return 0;
    }

    return costoTotal;
}
document.addEventListener("DOMContentLoaded", function() {
    let continuarInput = document.createElement("input");
    continuarInput.type = "text";
    continuarInput.placeholder = "¿Quieres contratar el plan? (sí/no), (calificar) para calificar las películas o (buscar) para buscar una película por título";
    continuarInput.classList.add("mi-input");
    document.body.appendChild(continuarInput);

    let botonEnviar = document.createElement("button");
    botonEnviar.textContent = "Enviar";
    document.body.appendChild(botonEnviar);

    botonEnviar.addEventListener("click", function() {
        let continuar = continuarInput.value.toLowerCase();
        if (continuar === "si") {
            let emailInput = document.createElement("input");
            emailInput.type = "email";
            emailInput.placeholder = "Por favor, ingresa tu dirección de correo electrónico:";
            document.body.appendChild(emailInput);

            let botonEnviarEmail = document.createElement("button");
            botonEnviarEmail.textContent = "Enviar";
            document.body.appendChild(botonEnviarEmail);

            botonEnviarEmail.addEventListener("click", function() {
                let email = emailInput.value;
                localStorage.setItem("email", email);
                alert(`Gracias por utilizar Narex. Te hemos enviado un correo de confirmación a ${email}.`);
            });
        } else if (continuar === "calificar") {
    for (let i = 0; i < catalogo.length; i++) {
        let calificacion = parseInt(prompt(`Por favor, califica "${catalogo[i].titulo}" del 1 al 5:`));
        catalogo[i].calificacion = calificacion;
    }

    alert("¡Gracias por tus calificaciones! Ahora podemos ofrecerte recomendaciones personalizadas.");
    
    let deseaFiltrar = prompt("¿Deseas filtrar las películas por calificación mínima? (sí/no)").toLowerCase();

    if (deseaFiltrar === "si") {
        let calificacionMinima = parseInt(prompt("Ingresa la calificación mínima que deseas buscar:"));
        let resultadosFiltrados = filtrarPorCalificacion(calificacionMinima);

        if (resultadosFiltrados.length > 0) {
            let mensaje = "Películas/Series con calificación " + calificacionMinima + " o superior:\n";

            for (let i = 0; i < resultadosFiltrados.length; i++) {
                mensaje += `${resultadosFiltrados[i].titulo} - Calificación: ${resultadosFiltrados[i].calificacion}\n`;
            }

            alert(mensaje);
        } else {
            alert(`No hay películas/series con calificación ${calificacionMinima} o superior en el catálogo.`);
        }
    } else {
        alert("¡Gracias por utilizar Narex! Esperamos que disfrutes de nuestro servicio.");
    }

} else if (continuar === "no") {
    alert("¡Gracias por tu visita! Esperamos verte de nuevo pronto.");
}else if (continuar === "buscar") {
    let tituloBuscado = prompt("Ingresa el título de la película que deseas buscar:");
    let resultadoBusqueda = buscarPorTitulo(tituloBuscado);

    if (resultadoBusqueda) {
        alert(`Se encontró la película: ${resultadoBusqueda.titulo}`);
    } else {
        alert("No se encontró ninguna película con ese título en el catálogo.");
    }
} })})