document.addEventListener("DOMContentLoaded", function() {
    let bienvenido;
    let catalogo = [];

    function cargarCatalogo() {
        return fetch('catalogo.json')
            .then(response => response.json())
            .then(data => {
                catalogo = data;
            })
            .catch(error => console.error('Error al cargar el catálogo:', error));
    }

    // Llamar a la función para cargar el catálogo al cargar la página
    cargarCatalogo().then(() =>{
    function buscarPorTitulo(titulo) {
        return catalogo.find(item => item.titulo.toLowerCase() === titulo.toLowerCase());
    }

    function filtrarPorCalificacion(calificacionMinima) {
        return catalogo.filter(item => item.calificacion >= calificacionMinima);
    }

    let formulario = document.getElementById("formulario");
    let planInput = document.getElementById("elijasuplan");
    let mesesInput = document.getElementById("elijalacantidaddemeses");
    let mensajeTitulo = document.querySelector("#mensaje h2");
    let mensajeTexto = document.querySelector("#mensaje p");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        let bienvenido = planInput.value.toLowerCase();
        let meses1 = parseInt(mesesInput.value);

        let costoTotal = bienvenido === "plan basico" || bienvenido === "plan intermedio" || bienvenido === "plan familiar"
        ? calcularCostoDelPlan(bienvenido, meses1)
        : (mensajeTitulo.textContent = "Plan incorrecto", mensajeTexto.textContent = "", 0);
    
    if (costoTotal) {
        mensajeTitulo.textContent = `Costo total del Plan ${bienvenido} por ${meses1} meses: $${costoTotal}`;
    }
    
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

    let continuarInput = document.createElement("input");
    continuarInput.type = "text";
    continuarInput.placeholder = "¿Quieres contratar el plan? (sí), (calificar) para calificar las películas o (buscar) para buscar una película por título";
    continuarInput.classList.add("mi-input");
    document.body.appendChild(continuarInput);

    let botonEnviar = document.createElement("button");
    botonEnviar.textContent = "Enviar";
    document.body.appendChild(botonEnviar);

botonEnviar.addEventListener("click",async function() {
    let continuar = continuarInput.value.toLowerCase();
    
    if (continuar === "si" && bienvenido !== "calificar") {
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
            swal.fire (`Gracias por utilizar Narex. Te hemos enviado un correo de confirmación a ${email}.`);
        });
    } else if (continuar === "calificar") {
        try {
            await calificarPeliculasConPromesas();
            mostrarFiltrarPorCalificacion();
        } catch (error) {
            console.error(error);
        }

    }else if (continuar === "buscar") {
        
        Swal.fire({
            title: "Ingresa el título de la película o serie:",
            input: "text",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Buscar",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true
        }).then((result) => {
            if (result.isConfirmed) {
                let tituloABuscar = result.value;

                
                let resultadoBusqueda = buscarPorTitulo(tituloABuscar);

                if (resultadoBusqueda) {
                    Swal.fire({
                        title: "Resultado de la búsqueda",
                        text: `${resultadoBusqueda.titulo} - Calificación: ${resultadoBusqueda.calificacion}`,
                        icon: "success"
                    });
                } else {
                    Swal.fire("Sin resultados", `No se encontró ninguna película o serie con el título "${tituloABuscar}".`, "warning");
                }
            }
        });
    }
});
    function calificarPeliculasConPromesas() {
        return new Promise(async (resolve, reject) => {
            try {
                for (let index = 0; index < catalogo.length; index++) {
                    const result = await Swal.fire({
                        title: `Por favor, califica "${catalogo[index].titulo}" del 1 al 5:`,
                        input: "number",
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: "Sí",
                        denyButtonText: "No"
                    });
    
                    if (result.isConfirmed) {
                        let calificacion = parseInt(result.value);
                        if (calificacion >= 1 && calificacion <= 5) {
                            catalogo[index].calificacion = calificacion;
                        } else {
                            Swal.fire("Por favor, ingresa una calificación válida del 1 al 5.", "", "warning");
                            index--; // Decrementamos el índice para repetir la iteración actual.
                        }
                    } else {
                        Swal.fire("Has cancelado la calificación.", "", "info");
                        reject("El usuario canceló la calificación.");
                        return; // Importante salir de la función para evitar ejecución adicional.
                    }
                }
    
                Swal.fire("¡Gracias por tus calificaciones! Ahora podemos ofrecerte recomendaciones personalizadas.");
                mostrarFiltrarPorCalificacion();
                resolve(); // Resolvemos la promesa después de completar el bucle.
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }
    

        


    function mostrarFiltrarPorCalificacion() {
        Swal.fire({
            title: "¿Deseas filtrar las películas por calificación mínima?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Sí",
            denyButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Ingresa la calificación mínima que deseas buscar:",
                    input: "number",
                    inputAttributes: {
                        min: 0
                    },
                    showCancelButton: true,
                    confirmButtonText: "Buscar",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        let calificacionMinima = parseInt(result.value);
                        let resultadosFiltrados = filtrarPorCalificacion(calificacionMinima);

                        if (resultadosFiltrados.length > 0) {
                            let mensaje = "Películas/Series con calificación " + calificacionMinima + " o superior:\n";

                            for (let i = 0; i < resultadosFiltrados.length; i++) {
                                mensaje += `${resultadosFiltrados[i].titulo} - Calificación: ${resultadosFiltrados[i].calificacion}\n`;
                            }

                            Swal.fire({
                                title: "Resultados de la búsqueda",
                                text: mensaje,
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Sin resultados",
                                text: `No hay películas/series con calificación ${calificacionMinima} o superior en el catálogo.`,
                                icon: "warning"
                            });
                        }
                    } else {
                        Swal.fire("Operación cancelada", "", "info");
                    }
                });
            } else if (result.isDenied) {
                Swal.fire("¡Gracias por utilizar Narex! Esperamos que disfrutes de nuestro servicio.", "", "info");
            }
        });
    }
});})
