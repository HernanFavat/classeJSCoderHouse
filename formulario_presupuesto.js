console.log("Script loaded!");

// Funcion para actualizar los resultados
function updateResults() {
    let ingresos = calcularIngresos();
    let gastosHogar = calcularGastosHogar();
    let gastosTrasporte = calcularGastosTrasporte();
    let resultadoGastosTotal = gastosHogar + gastosTrasporte;
    let balanceFinalDelMes = ingresos - resultadoGastosTotal;

    // ACTUALIZAR el resultado de los elementos
    document.getElementById("resultado-numerico-ingresos-totales").innerHTML = ingresos;
    document.getElementById("resultado-hogar").innerHTML = gastosHogar;
    document.getElementById("resultado-transporte").innerHTML = gastosTrasporte;
    document.getElementById("resultado-numerico-gastos-totales").innerHTML = resultadoGastosTotal;
    document.getElementById("resultado-numerico-balance").innerHTML = balanceFinalDelMes;
}

// CALCULAR ingresos
function calcularIngresos() {
    let salarioFamiliar = parseInt(document.getElementById("Salario Familiar").value) || 0;
    let inversiones = parseInt(document.getElementById("Inversiones").value) || 0;
    let otrosIngresos = parseInt(document.getElementById("Otros Ingresos").value) || 0;

    let ingresosTotales = salarioFamiliar + inversiones + otrosIngresos;
    console.log("Ingresos Totales: ", ingresosTotales);
    return ingresosTotales;
}

// CALCULAR gastos hogar
function calcularGastosHogar() {
    let hipotecaAlquilerGasto = parseInt(document.getElementById("Hipoteca-del-hogar-Alquiler").value) || 0;
    let aguaGasto = parseInt(document.getElementById("Agua").value) || 0;
    let electricidadGasto = parseInt(document.getElementById("Electricidad").value) || 0;
    let gasGasto = parseInt(document.getElementById("Gas").value) || 0;
    let mantenimientoDelHogar = parseInt(document.getElementById("Mantenimiento-del-hogar").value) || 0;

    let gastosHogar = hipotecaAlquilerGasto + aguaGasto + electricidadGasto + gasGasto + mantenimientoDelHogar;
    console.log("Gastos Hogar: ", gastosHogar);
    return gastosHogar;
}

// CALCULAR gastos transporte
function calcularGastosTrasporte() {
    let seguroCoche = parseInt(document.getElementById("Seguro-coche").value) || 0;
    let seguroMoto = parseInt(document.getElementById("Seguro-moto").value) || 0;
    let gasolinaCoche = parseInt(document.getElementById("Gasolina-coche").value) || 0;
    let gasolinaMoto = parseInt(document.getElementById("Gasolina-moto").value) || 0;
    let gastosVarios = parseInt(document.getElementById("Gastos-varios-ambos-vehiculos").value) || 0;

    let gastosTrasporte = seguroCoche + seguroMoto + gasolinaCoche + gasolinaMoto + gastosVarios;
    console.log("Gastos Transporte: ", gastosTrasporte);
    return gastosTrasporte;
}

// Agrego eventListener para actualizar el input de cada elemento
document.getElementById("Salario Familiar").addEventListener("input", updateResults);
document.getElementById("Inversiones").addEventListener("input", updateResults);
document.getElementById("Otros Ingresos").addEventListener("input", updateResults);
document.getElementById("Hipoteca-del-hogar-Alquiler").addEventListener("input", updateResults);
document.getElementById("Agua").addEventListener("input", updateResults);
document.getElementById("Electricidad").addEventListener("input", updateResults);
document.getElementById("Gas").addEventListener("input", updateResults);
document.getElementById("Mantenimiento-del-hogar").addEventListener("input", updateResults);
document.getElementById("Seguro-coche").addEventListener("input", updateResults);
document.getElementById("Seguro-moto").addEventListener("input", updateResults);
document.getElementById("Gasolina-coche").addEventListener("input", updateResults);
document.getElementById("Gasolina-moto").addEventListener("input", updateResults);
document.getElementById("Gastos-varios-ambos-vehiculos").addEventListener("input", updateResults);

// iniciar calculos
updateResults();
