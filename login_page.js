// Creo una clase usuarios para crear los objetos
class Usuario {
    constructor(nombreDeUsuarioInput, emailInput, contraseñaInput) {
        this.nombreDeUsuarioInput = nombreDeUsuarioInput;
        this.emailInput = emailInput;
        this.contraseñaInput = contraseñaInput;
    }
}
// Creo un array para guardar los objetos que van ingresando datos
const usuarios = [];

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
    // Prevenimos que la página se resetee
    e.preventDefault();

    const nombreDeUsuarioInput = document.getElementById("nombre_de_usuario").value.toLowerCase();
    const emailInput = document.getElementById("email").value;
    const contraseñaInput = document.getElementById("contraseña").value;

    // verificamos por consola que todo este correcto
    console.log("El userName ingresado es: " + nombreDeUsuarioInput);
    console.log("El email ingresado es: " + emailInput);
    console.log("El password ingresado es: " + contraseñaInput);

    // crear los objetos del array usuarios y le doy .push para guardarlos
    const usuarioIngreso = new Usuario(nombreDeUsuarioInput, emailInput, contraseñaInput);
    usuarios.push(usuarioIngreso);

    // Creo una instancia de Usuario con una variable para guardar los datos Storage. No incluyo la contraseña para no publicarla. 
    const usuarioValidadoStorage = new Usuario(nombreDeUsuarioInput, emailInput);
    
    // Verificamos el array en console
    console.log(usuarios);
    localStorage.setItem('usuarioValidado', JSON.stringify(usuarioValidadoStorage));
    // reseteo de campos del formulario
    formulario.reset();
});

// Construyo un rango de intentos para validar al usuario o bloquear los intentos.
class IngresoUsuario {
    constructor() {
        // Inicializamos las propiedades de los intentos
        this.intentos = 0;
        this.maxIntentos = 3;
    }

    irAlsimuladorDePresupuesto() {
        // Vamos incrementando los intentos con ++
        this.intentos++;

        // Variable para mensajes que podré usar en los pops up. 
        const inputCorrecto = "Información correcta, bienvenido!";
        const inputIncorrecto = "La información ingresada no es correcta, intentalo de nuevo!";
        const mensajeCamposVacios = "¡Debes ingresar los datos solicitados para loguearte en tu cuenta!";

        // Conseguimos los datos del usuario llamando al id 
        const nombreDeUsuarioInput = document.getElementById("nombre_de_usuario").value.toLowerCase();
        const emailInput = document.getElementById("email").value;
        const contraseñaInput = document.getElementById("contraseña").value;

        // proceso de validación de datos con aplicación de LIBRERIA sweetalert
        // Incluyo un pop up si el usuario intenta loguearse sin datos = warning

        if (nombreDeUsuarioInput.trim() === "" || emailInput.trim() === "" || contraseñaInput.trim() === "") {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: `${mensajeCamposVacios}`,
                footer: '<a href="#">Quieres crear una cuenta con nosotros?</a>'
            });
            console.log("¡Debes ingresar los datos solicitados para loguearte en tu cuenta!");
        } else {
            // Validamos datos correctos y si es true, damos la opción de guardarlos en los campos/inputs
            if (nombreDeUsuarioInput === "hfavat" && emailInput === "h.favat@gmail.com" && contraseñaInput === "123456") {
                Swal.fire({
                    title: "Datos correctos, Deseas guardar tus credenciales de acceso?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Guardar",
                    denyButtonText: "No, gracias!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("Guardado!", "", "success");

                        // Crear una instancia de Usuario para llamar al localStorage usuarioValidado, esto lo guardaremos en los inputs al haber aceptado el usuario el pop up. 
                        
                        const guardarDatosUsuarioValido = localStorage.getItem('usuarioValidado');

                        if (guardarDatosUsuarioValido) {
                            const usuarioDatos = JSON.parse(guardarDatosUsuarioValido);
                            document.getElementById("nombre_de_usuario").value = usuarioDatos.nombreDeUsuarioInput;
                            document.getElementById("email").value = usuarioDatos.emailInput;
                            
                    } else if (result.isDenied) {
                            Swal.fire("Changes are not saved", "", "info");    
                    }
                    
                }
                    setTimeout(() => {
                        window.location.href = "file:///C:/Users/34691/Desktop/Projecto_Final/formulario_presupuesto.html";
                    }, 1000);
                });   
                                         
                console.log(`${inputCorrecto}`);

                const usuarioData = new Usuario(nombreDeUsuarioInput, emailInput, contraseñaInput);
                Object.assign(usuariosDatabase, usuarioData);   

            } else if (this.intentos === this.maxIntentos) {
                    Swal.fire({
                        title: "Cuenta bloqueada, vuelva a intentarlo más tarde",
                        html: "",
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                            const timer = Swal.getPopup().querySelector("b");
                            let timerInterval = setInterval(() => {
                                timer.textContent = `${Swal.getTimerLeft()}`;
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
            
                            setTimeout(() => {
                                
                                const guardarDatosUsuarioValido = localStorage.getItem('usuarioValidado');
                                if (guardarDatosUsuarioValido) {
                                    const usuarioDatos = JSON.parse(guardarDatosUsuarioValido);
                                    document.getElementById("nombre_de_usuario").value = usuarioDatos.nombreDeUsuarioInput;
                                    document.getElementById("email").value = usuarioDatos.emailInput;
                                }
            
                                window.location.href = "file:///C:/Users/34691/Desktop/Projecto_Final/formulario_presupuesto.html";
                            }, 2000);
                        }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log("Lo cerró el timer");
                        }
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${inputIncorrecto}`,
                        footer: '<a href="#">Quieres crear una cuenta con nosotros?</a>'
                    });
                    console.log("Por favor ingresa los datos correctos para loguearte");
                }
            }
        }
    }


// Crear una instancia de IngresoUsuario y de Usuario
const usuarioConCuenta = new IngresoUsuario();
const usuariosDatabase = new Usuario();

const botonLogin = document.getElementById("ingresar");
botonLogin.addEventListener("click", () => {
    usuarioConCuenta.irAlsimuladorDePresupuesto();
});
