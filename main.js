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

let bienvenido = prompt("bienvenido a narex, plataforma de series y peliculas. ingresa tu plan: plan basico/plan intermedio/ plan familiar") 

bienvenido = bienvenido.toLowerCase();

while (true) {
    bienvenido = prompt("Bienvenido a Narex, plataforma de series y películas. Ingresa tu plan: Plan Básico/Plan Intermedio/Plan Familiar").toLowerCase();

    if (bienvenido === "plan basico" || bienvenido === "plan intermedio" || bienvenido === "plan familiar") {
        break;  
    } else {
        alert("Plan incorrecto. Por favor, ingresa un plan válido.");
    }
}

if (bienvenido == "plan basico"){
    alert("su plan tiene un valor de $1500")
}else if (bienvenido == "plan intermedio"){
    alert("su plan tiene un valor de $2000")
}else if (bienvenido == "plan familiar"){
    alert ("su plan tiene un valor de $3000")
} else{
    alert ("plan incorrecto")
}

let meses1 = parseInt(prompt ("ingrese la cantidad de meses a contratar"))

if (meses1 >12) {
  alert("Cantidad de meses no válida.");
} else {
  calcularCostoDelPlan();
}


function calcularCostoDelPlan() {
    let planB = 1500
    let planI = 2000
    let planF = 3000 
    let costoTotal = 0;

    for (let i = 1; i <= meses1; i++){
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
        return; 
    }

    alert(`Costo total del Plan ${bienvenido} por ${meses1} meses: $${costoTotal}`);
}
}


let continuar = prompt("¿Quieres contratar el plan? (sí/no), (calificar) para calificar las películas o (buscar) para buscar una película por título").toLowerCase();

if (continuar === "si") {
    let email = prompt("Por favor, ingresa tu dirección de correo electrónico:");
    alert(`Gracias por utilizar Narex. Te hemos enviado un correo de confirmación a ${email}.`);
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

} else if (continuar === "buscar") {
    let tituloBuscado = prompt("Ingresa el título de la película que deseas buscar:");
    let resultadoBusqueda = buscarPorTitulo(tituloBuscado);

    if (resultadoBusqueda) {
        alert(`Se encontró la película: ${resultadoBusqueda.titulo}`);
    } else {
        alert("No se encontró ninguna película con ese título en el catálogo.");
    }
} 