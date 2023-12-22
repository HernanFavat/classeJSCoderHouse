class Usuarios{
    constructor(usernameInput, emailInput, passwordInput){
        this.usernameInput = usernameInput;
        this.emailInput = emailInput;
        this.passwordInput = passwordInput;
    }
}

const arrayUsers = [];
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e)=>{ 
    // Prevenimos que la página se resete
    e.preventDefault();

    const usernameInput = document.getElementById("username").value.toLowerCase();
    const emailInput = document.getElementById("email").value;
    const passwordInput = document.getElementById("password").value;

    // verificamos por consola que todo este correcto
    console.log("El userName ingresado es: " + usernameInput);
    console.log("El email ingresado es: " + emailInput);
    console.log("El password ingresado es: " + passwordInput);

//  crear los objetos de users:
const usuarios = new Usuarios(usernameInput, emailInput, passwordInput);
arrayUsers.push(usuarios);

// Verificamos el arrray
console.log(arrayUsers);
// reseteo de campos loggin
 formulario.reset();

});

class Loggin {
    constructor() {
        // Inicializamos las propiedades de los intentos
        this.attempts = 0;
        this.maxAttempts = 3;
    }

    IralFormulario() {
        // VAmos incrementando los intentos con ++
        this.attempts++;

        // Conseguimos los datos del usuario
        const usernameInput = document.getElementById("username").value.toLowerCase();
        const emailInput = document.getElementById("email").value;
        const passwordInput = document.getElementById("password").value;
       
        // Variable para mensajes
        const message = "Login successful!";
        const alertIncorrectData = "Your data is incorrect. Please try again!";

        // Validamos que los imputs están correctos
        if (usernameInput === "hfavat" && emailInput === "h.favat@gmail.com" && passwordInput === "123456") {
            alert("Login successful!");
            console.log(`${message}`)

             // Creo una nueva instancia de Usuarios y guarda la info en usuariosDataBase 
            //  Tuve que investigar que metodo usar para guardar el usuario validado 
             const usuarioData = new Usuarios(usernameInput, emailInput, passwordInput);
             Object.assign(usuariosDatabase, usuarioData);
            
            // Y si están correctos lo mandamos al formulario
            window.location.href = "file:///C:/Users/34691/Desktop/Projecto_Final/formulario_presupuesto.html";

            // Si no están correctos, limpiamos los valores en los inputs, luego de un alert
        } else {
            alert(`${alertIncorrectData}`);
            console.log("Por favor entra los datos correctos para loguearte");
            // sin usar loops, usamos el atributo Attempts para definir la cantida de opciones
            if (this.attempts === this.maxAttempts) {
                alert("Has alcanzado la cantidad de intentos. Tu cuenta queda bloqueada por 24 hrs, intentalo más tarde, por favor!.");
            }
        }
    }
}

// Crear una instancia de Loggin
const usuarioConCuenta = new Loggin();
const usuariosDatabase = new Usuarios();

const loginButton = document.getElementById("login");
loginButton.addEventListener("click", () => {
usuarioConCuenta.IralFormulario();
}); 
