document.addEventListener('DOMContentLoaded', function () {

    const mesNombres = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let datosCalculados = {};

    document.getElementById(`guardarBtn`).addEventListener('click', async function () {
        console.log('Guardar Btn cliqueado');

        // Poner los calculos en una variable
        datosCalculados = {
            ingresosTotales: calcularIngresos(),
            gastosTotales: calcularGastosHogar() + calcularGastosTrasporte(),
            balanceFinal: calcularIngresos() - (calcularGastosHogar() + calcularGastosTrasporte()),
        };

        console.log('Datos Calculados:', datosCalculados);
        localStorage.setItem(`Datos calculados`, datosCalculados);

        // Guardar datos
        await saveData(datosCalculados);

        const mesActual = mesNombres[new Date().getMonth()];
        const nombreDeArchivo = `data_${mesActual}.json`;

        console.log('Nombre de Archivo:', nombreDeArchivo);

        try {
            const response = await fetch('http://localhost:3000/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombreDeArchivo, data: datosCalculados })

            });

            if (response.ok) {
                console.log('Datos guardado con exito!');

                // Guarda data
                await mostrarDataGuardadFetch(nombreDeArchivo);

                // Actualizamos el mes en el en el html
                document.getElementById("mes-actual").innerHTML = mesActual;
        

            } else {
                console.error('Error al guardar los datos. Server devolvió:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error durante fetch:', error);
        }
    });

    // Funcion para hacer fetch y mostrar data guardada
    async function mostrarDataGuardadFetch(nombreDeArchivo) {
        try {
            const fetchResponse = await fetch(`http://localhost:3000/getData?nombreDeArchivo=${nombreDeArchivo}`);

            if (!fetchResponse.ok) {
                throw new Error(`HTTP error! Status: ${fetchResponse.status}`);
            }

            const fetchData = await fetchResponse.json();

            console.log('Fetched Data:', fetchData);

            // Actualizar elementos con fetch data
            document.getElementById("resultado-numerico-ingresos-totales").innerHTML = fetchData.data.ingresosTotales;
            document.getElementById("resultado-hogar").innerHTML = fetchData.data.gastosTotales;
            document.getElementById("resultado-transporte").innerHTML = fetchData.data.gastosTotales;
            document.getElementById("resultado-numerico-gastos-totales").innerHTML = fetchData.data.gastosTotales;

            // Actualizar balance con fetched data
            document.getElementById("resultado-numerico-balance").innerHTML = fetchData.data.balanceFinal;

            const ingresosTotalesValor = fetchData.data.ingresosTotales;
            const gastosTotalesValor = fetchData.data.gastosTotales;
            const balanceFinalValor = fetchData.data.balanceFinal;

            console.log("Ingresos Totales:", ingresosTotalesValor);
            console.log("Gastos Totales:", gastosTotalesValor);
            console.log("Balance Final:", balanceFinalValor);
           

            // Actualizar el mes en el documento
            const mesActualIndex = new Date().getMonth(); 
            const mesActual = mesNombres[mesActualIndex];
            console.log('Mes actual:', mesActual);

            const actualMesElemento = document.getElementById("mes-actual");
            if (actualMesElemento) {
                actualMesElemento.innerHTML = mesActual;
            }
        } catch (error) {
            console.error('Error durante fetch:', error);
        }
    }

    document.getElementById("borrarBtn").addEventListener('click', function borrarValoresIngresados() {
        document.getElementById("Salario Familiar").value = '';
        document.getElementById("Inversiones").value = '';
        document.getElementById("Otros Ingresos").value = '';
        document.getElementById("Seguro-coche").value = '';
        document.getElementById("Seguro-moto").value = '';
        document.getElementById("Gasolina-coche").value = '';
        document.getElementById("Gasolina-moto").value = '';
        document.getElementById("Gastos-varios-ambos-vehiculos").value = '';
        document.getElementById("Hipoteca-del-hogar-Alquiler").value = '';
        document.getElementById("Agua").value = '';
        document.getElementById("Electricidad").value = '';
        document.getElementById("Gas").value = '';
        document.getElementById("Mantenimiento-del-hogar").value = '';

    });
    
    // Funcion async para guardar la data
    async function saveData(dataToSave) {
        const mesActual = mesNombres[new Date().getMonth()];
        const nombreDeArchivo = `data_${mesActual}.json`;

        console.log('Nombre de Archivo:', nombreDeArchivo);

        try {
            const response = await fetch('http://localhost:3000/saveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombreDeArchivo, data: dataToSave })
            });

            if (response.ok) {
                console.log('Datos guardados con éxito!');
            } else {
                console.error('Error al guardar los datos. Server devolvió:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error durante fetch:', error);
        }
    }
// Funcion para actualizar los resultados
    function actualizarResultados() {
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
document.getElementById("Salario Familiar").addEventListener("input", actualizarResultados);
document.getElementById("Inversiones").addEventListener("input", actualizarResultados);
document.getElementById("Otros Ingresos").addEventListener("input", actualizarResultados);
document.getElementById("Hipoteca-del-hogar-Alquiler").addEventListener("input", actualizarResultados);
document.getElementById("Agua").addEventListener("input", actualizarResultados);
document.getElementById("Electricidad").addEventListener("input", actualizarResultados);
document.getElementById("Gas").addEventListener("input", actualizarResultados);
document.getElementById("Mantenimiento-del-hogar").addEventListener("input", actualizarResultados);
document.getElementById("Seguro-coche").addEventListener("input", actualizarResultados);
document.getElementById("Seguro-moto").addEventListener("input", actualizarResultados);
document.getElementById("Gasolina-coche").addEventListener("input", actualizarResultados);
document.getElementById("Gasolina-moto").addEventListener("input", actualizarResultados);
document.getElementById("Gastos-varios-ambos-vehiculos").addEventListener("input", actualizarResultados);

// iniciar calculos
actualizarResultados();

})
