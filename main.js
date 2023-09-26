let bienvenido = prompt("bienvenido a narex, plataforma de series y peliculas. ingresa tu plan: plan basico/plan intermedio/ plan familiar") 

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

