/menu oculto menu desplegable

document.getElementById("boton-menu-cerrar").addEventListener("click", cambiarEstilo);
document.getElementById("boton-hamburguesa").addEventListener("click", cambiarEstilo)
function cambiarEstilo() {
    document.querySelector(".menu-desplegable").classList.toggle("oculto");
}

//cambiar modo oscuro modo claro 

document.getElementById("boton-modoF").addEventListener("click",cambiarModo);

let Modo = "Blanco";
function cambiarModo() {
    Modo = (Modo === "Negro") ? "Blanco" : "Negro";
    document.querySelector("#logo").src ="../images/logoOdonto" + Modo + ".png";
    document.querySelector("#logo-hamburguesa").src ="../images/hamburguesaFondo" + Modo + ".png";
    document.querySelector("body").classList.toggle("oscuro");
    document.querySelector("nav.hamburguesa").classList.toggle("oscuro");
    document.querySelector(".menu-desplegable").classList.toggle("oscuro");


}




//captcha
let numeroCaptcha = numeroAleatorio();
function numeroAleatorio() {
    return Math.floor((Math.random() * 6) + 1);
}
document.querySelector("#enviar-formulario").addEventListener("click", comprobarCaptcha);
document.querySelector("#imagen-captcha").src = "../images/captcha" + numeroCaptcha + ".png";

function comprobarCaptcha() {
    let valorIngresado = parseInt(document.getElementById("comprobar-captcha").value);
    if (numeroCaptcha == valorIngresado) {
        document.querySelector(".respuesta").innerHTML = "<p>El captcha ingresado es correcto, sos humano = )</p>"
    } else {
        document.querySelector(".respuesta").innerHTML = "<p>El captcha ingresado es incorrecto, sos una maquina!!!</p>"
        numeroCaptcha = numeroAleatorio();
        document.querySelector("#imagen-captcha").src = "../images/captcha" + numeroCaptcha + ".png";
        document.getElementById("comprobar-captcha").value="";
    }
}


// formulario

//formulario
let form = document.querySelector("#form");
form.addEventListener('submit', agregar);

function agregar (e){
    e.preventDefault();

    //agarro todos los datos del formulario
    let formData = new FormData(form);

    let nombre = formData.get('nombre');
    let documento = formData.get('documento');
    let direccion = formData.get('direccion');
    let contacto = formData.get('contacto');
    let os = formData.get('cobertura');
    let email = formData.get ('email');
}
