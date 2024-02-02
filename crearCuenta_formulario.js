class CrearUsuario {
    constructor(username, email, password, address) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
    }
}

// Inicializo el nuevo usuario y amplio la informacion del elemento dirección 
let userData = new CrearUsuario("", "", "", {
    calle: "",
    calle2: "",
    ciudad: "",
    postalcode: "",
});

// Creo funcion para crear elementos del form para registrarse, los paramentros son los atributos
function createFormElement(label, type, id, name, required, placeholder) {
    let formElement = document.createElement("div");
    formElement.innerHTML = `<label for="${id}">${label}${required ? '  <span>*</span>' : ''}</label>`;
    formElement.innerHTML += `<input type="${type}" id="${id}" name="${name}" ${required ? 'required': ''} placeholder="${placeholder || ''}">`;

    // adhiero el elemento form a el DIV
    document.getElementById('signupForm').appendChild(formElement);
}

// Creo todos los elementos del form para registrarse,y le doy un valor true or false para indicar cual serán requeridos. 
createFormElement("Email:", "email", "email", "email", true, "Enter your email");
createFormElement("Username:", "text", "username", "username", true, "Enter your username");
createFormElement("Password:", "password", "password", "password", true, "Enter your password");
createFormElement("Street:", "text", "street", "street", false, "Optional your street");
createFormElement("Suite:", "text", "suite", "suite", false, "Optional suite info");
createFormElement("City:", "text", "city", "city", false, "Optional city info");
createFormElement("Zipcode:", "text", "zipcode", "zipcode", false, "Optional Zipcode info");

// Creo DIV para el boton
let buttonsContainer = document.createElement("div");
buttonsContainer.id = "buttonsContainer";  // Add this line to set the id

// Creo boton para enviar el registro
let submitButton = document.createElement("button");
submitButton.textContent = "Registrate";
submitButton.id = "registrarBtn";
submitButton.addEventListener("click", function(event) {
    validateForm(event);
});

// Agrego un boton para el login
let btnIngresar = document.createElement("button");
btnIngresar.textContent = "Ingresar";
btnIngresar.id = "ingresarBtn";
btnIngresar.addEventListener("click", function () {
    window.location.href = "file:///C:/Users/34691/Desktop/Projecto_Final/login_page.html";
});

// Creo un DIV para submit el boton
let submitButtonDiv = document.createElement("div");
submitButtonDiv.id = "submitBtnDiv";  // Add this line to set the id
submitButtonDiv.appendChild(submitButton);

// Creo un DIV para el boton
let loginButtonDiv = document.createElement("div");
loginButtonDiv.id = "loginBtnDiv";  // Add this line to set the id
loginButtonDiv.appendChild(btnIngresar);

buttonsContainer.appendChild(submitButtonDiv);
buttonsContainer.appendChild(loginButtonDiv);

// Append al div SignupFrom
document.getElementById('signupForm').appendChild(buttonsContainer);

let mensajeEmailYaExiste = "El email ya existe en nuestra base de datos, por favor ingresa un nuevo email o logueate en tu cuenta";
let mensajeCamposVacios = "No has ingresado tus datos, por favor rellena los campos para registrarte ";

function validateForm(event) {
    event.preventDefault();  

    // Traigo los valores ingresados
    let enteredEmail = document.getElementById('email').value.toLowerCase();
    let enteredUsername = document.getElementById('username').value;
    let enteredPassword = document.getElementById('password').value;
    let enteredStreet = document.getElementById('street').value;
    let enteredSuite = document.getElementById('suite').value;
    let enteredCity = document.getElementById('city').value;
    let enteredZipcode = document.getElementById('zipcode').value;

    // Hago fetch de la API 
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(apiData => {
            console.log('API Data:', apiData);  

            // VAlido que los datos existen en la API data
            const emailExists = apiData.some(user => user.email.toLowerCase() === enteredEmail);

            if (emailExists) {
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: `${mensajeEmailYaExiste}`,
                });
            } else if (enteredEmail.trim() === "" || enteredUsername.trim() === "" || enteredPassword.trim() === "") {
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: `${mensajeCamposVacios}`,
                });
            } else {
                    Swal.fire({
                        title: "Yeaa! Bienvenido!! ",
                        imageUrl: "https://www.camara.es/sites/default/files/styles/large/public/blog/shutterstock_782797126.jpg.webp?itok=tdYJC3EE",
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: "Custom image",
                        showCancelButton: false, 
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "OK",
                        allowOutsideClick: false, 
                    }).then((result) => {
                        
                        if (result.isConfirmed) {
                            
                            console.log("OK button clicked");
                        }
                    })            

                // Creo un objeto Usuario
                let userData = new CrearUsuario(enteredUsername, enteredEmail, enteredPassword, {
                    street: enteredStreet,
                    suite: enteredSuite,
                    city: enteredCity,
                    zipcode: enteredZipcode,
                });

                // Storage
                localStorage.setItem('registeredUser', JSON.stringify(userData));

                setTimeout(() => {
                
                window.location.href = 'file:///C:/Users/34691/Desktop/Projecto_Final/formulario_presupuesto.html';
                }, 4000);
            }
        })
        .catch(error => {
            console.error('Error fetching user data from API:', error);
        });
}