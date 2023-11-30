// funciones

// bloque de codigo que realiza tareas especificas que nos sirven para emcapzular bloque de código y es reutilizable

// declaracion una funcion, recuerden que tiene que ser un verbo o una acción, tiene que estar escrito en camelcase/lowercase y agregar mayusculas entre las palabras

// ventaja de tener las variables dentro de una funcion, es que podes repetirlo. 

function sumar() {
    // estas son variables locales
   let num1 = parseInt(prompt("Ingresa un numero"));
   let num2 = parseInt(prompt("Ingresa un número"));
   let num3 = parseInt(prompt("Ingresa un numero"));
   let suma = num1 + num2 + num3;
   console.log("la suma es: " + suma);
}

// como se llama una funcion?
sumar(); 
sumar(); 

// scope = habla de la visibilidad y accesibilidad de una variable dentro de un programa. 
// 2 tipos, local y otro global
// variables fuera de la funcion y otras dentro de la funcion, dependerá como se puede acceder a ellas. 

// falta la funcion acá para que sea más simple

function ingresaNombre(){

let nombreIngresado = prompt("Ingresa nombre");
console.log("El nombre ingresado es " = + nombreIngresado);
}

ingresaNombre();
ingresaNombre();

// let nombreIngresado2 = prompt("Ingresa nombre");
// console.log("El nimbre ingresado es " = + nombreIngresado2);

// funcion con ejemplo con while

function ingresaNombre(){

    let nombreIngresado = prompt("Ingresa nombre");
    console.log("El nombre ingresado es " = + nombreIngresado);
}

let numero = 0;

while(numero < 2){
    ingresaNombre()
    numero++
}


// funciones con parametro (es un valor que se pasa a una funcion cuando se llama). Una funcion puede aceptar 0 parametro o todos los que necesites, son locales dentro de la funcion. Son variables dentro de ella. 

function sumar2(a, b){
    return a + b 
}

let resultado = sumar2(3,5);
console.log(resultado)

// ejemplo parametros

let nombreIngresado = prompt("Ingresa tu nombre");
let apellidoIngresado = prompt("Ingresa tu apellido");

function saludar(nombre, apellido){
    console.log("Bienvenido alumno: " + nombre + " " + apellido); 
} 

saludar(nombreIngresado, apellidoIngresado);

// Funciones anonimas es una funcion que no tiene nombre asociado. Lo más normal es que se aloje la función en una variable. 

let sumar3 = function(a,b){
    return a + b
}

// llamar a la funcion
let resultado2 = sumar3(3, 5);
console.log(resultado2);

// funciones flechas o arrow function es una funcion que nace en EXMA6 que nos ayudan a crear una funcion de una forma consisa. => 

function sumar4(a,b){
    return a + b;
}

// la expresion de abajo es la misma que la de arriba
let sumar4 = (a,b) => a + b;


