// CLASES 5 de JS, forma más estructurada y elegible sobre como introducir objetos
// ES LA FORMA MODERNA DE HACER TODO LO ANTERIOR, NACIERON EN ECMA6

class Loggin {
    constructor() {
        // Iniciaré las propiedades en la función con los valores ingresados en la pagina por el usuario
    }

    IralFormulario() {
        // Función solicitando info de los elementos
        const username = document.getElementById("username").value.toLowerCase();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const message = "Login successful!"; 
        const alertIncorrectData = "Your data is incorrect. Please try again!"
        // If de la función donde paso valores de la cuenta del cliente, sin estos no se podrá loguear. 

        if (username === "hfavat" && email === "h.favat@gmail.com" && password === "123456") {
            alert("Login successful!");
            console.log(`Has entrado con los siguientes datos: ${username} ${email} ${password}`)
            console.log(`${message}`)
            // ejecuto la siguiente propiedad para que se loguee
            window.location.href = "file:///C:/Users/34691/Desktop/Projecto_Final/formulario_presupuesto.html";

            // Si esta lógica no se ejecuta con los datos dados, hago un alert para que el usuario vuelva a intentarlo. 

        } else {
            alert(`${alertIncorrectData}`);
            console.log("You need to enter the correct data to log in");
        }
    }
}

// Create an instance of the Loggin class
const usuarioConCuenta = new Loggin 

// Llamo al elemento id "login" que ya está ejecutado en html
const loginButton = document.getElementById("login") 