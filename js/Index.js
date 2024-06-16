'use strict'
//menu oculto menu desplegable

document.getElementById("boton-menu-cerrar").addEventListener("click", cambiarEstilo);
document.getElementById("boton-hamburguesa").addEventListener("click", cambiarEstilo)

function cambiarEstilo() {
    document.querySelector(".menu-desplegable").classList.toggle("oculto");
}

//cambiar modo oscuro modo claro 

document.getElementById("boton-modo").addEventListener("click", cambiarModo);

let Modo = "Blanco";
function cambiarModo() {
    Modo = (Modo === "Negro") ? "Blanco" : "Negro";
    document.querySelector("#logo").src = "images/logoOdonto" + Modo + ".png";
    document.querySelector("#logo-hamburguesa").src = "images/hamburguesaFondo" + Modo + ".png";
    document.querySelector("body").classList.toggle("oscuro");
    document.querySelector("nav.hamburguesa").classList.toggle("oscuro");
}

//simular click en home


// parcial rest

let enlaces = document.querySelectorAll('.a-actualizar');


enlaces.forEach(enlace => enlace.addEventListener('click', function (e) {
    actualizar(e, enlace)
}));

setTimeout(() => {             //simulo click en inicio     
    enlaces[0].click();
}, 1);

function actualizar(e, enlace) {
    e.preventDefault();

    let href = enlace.getAttribute('href');

    fetch(href).then(response => {
        response.text().then(text => {
            document.getElementById('actualizar').innerHTML = text;
            if(href=="html/formulario.html")     //si carga el formulario cargo script formulario
            form();
        });
    });

};
function form() {

    //captcha


    let numeroCaptcha = numeroAleatorio();
    function numeroAleatorio() {
        return Math.floor((Math.random() * 6) + 1);
    }
    document.querySelector("#enviar-formulario").addEventListener("submit", comprobarCaptcha);
    document.querySelector("#imagen-captcha").src = "../images/captcha" + numeroCaptcha + ".png";

    function comprobarCaptcha(e) {
        e.preventDefault();
        let valorIngresado = parseInt(document.getElementById("comprobar-captcha").value);
        if (numeroCaptcha == valorIngresado) {
            document.querySelector(".respuesta").innerHTML = "<p>El captcha ingresado es correcto, sos humano = )</p>"
        } else {
            document.querySelector(".respuesta").innerHTML = "<p>El captcha ingresado es incorrecto, sos una maquina!!!</p>"
            numeroCaptcha = numeroAleatorio();
            document.querySelector("#imagen-captcha").src = "../images/captcha" + numeroCaptcha + ".png";
            document.getElementById("comprobar-captcha").value = "";
        }
    }

    let form = document.querySelector("#formulario");
    form.addEventListener('submit', agregar);



    const BASE_URL = "https://666741a4a2f8516ff7a6eb77.mockapi.io/pacientes/pacientes";

    function agregar(e) {
        e.preventDefault();

        let data = new FormData(form);

        let paciente = {
            nombre: data.get('nombre'),
            documento: data.get('documento'),
            contacto: data.get('contacto'),
            obraSocial: data.get('cobertura'),
            email: data.get('email'),
        }
        fetch(BASE_URL, {
            method: 'POST',

            headers: {
                "content-Type": 'application/json'
            },
            body: JSON.stringify(paciente),
        }).then(response => {
            if (response.ok) {
                obtener(); // Actualizar la lista después de agregar
                form.reset(); // Limpiar el formulario después de agregar
            }
        });



    }
    function editarPaciente(id) {

        fetch(BASE_URL + '/' + id)  // Obtener el paciente a editar
            .then(response => response.json())
            .then(paciente => {
                let tr = document.querySelector("#paciente-" + id);
                tr.innerHTML = ''; // Limpiar la fila para agregar los inputs de edición

                let tdNombre = document.createElement('td');
                let inputNombre = document.createElement('input');
                inputNombre.type = 'text';
                inputNombre.value = paciente.nombre;
                tdNombre.appendChild(inputNombre);
                tr.appendChild(tdNombre);

                let tdDocumento = document.createElement('td');
                let inputDocumento = document.createElement('input');
                inputDocumento.type = 'text';
                inputDocumento.value = paciente.documento;
                tdDocumento.appendChild(inputDocumento);
                tr.appendChild(tdDocumento);

                let tdContacto = document.createElement('td');
                let inputContacto = document.createElement('input');
                inputContacto.type = 'text';
                inputContacto.value = paciente.contacto;
                tdContacto.appendChild(inputContacto);
                tr.appendChild(tdContacto);

                let tdCobertura = document.createElement('td');
                let inputCobertura = document.createElement('input');
                inputCobertura.type = 'text';
                inputCobertura.value = paciente.obraSocial;
                tdCobertura.appendChild(inputCobertura);
                tr.appendChild(tdCobertura);

                let tdEmail = document.createElement('td');
                let inputEmail = document.createElement('input');
                inputEmail.type = 'text';
                inputEmail.value = paciente.email;
                tdEmail.appendChild(inputEmail);
                tr.appendChild(tdEmail);

                let tdBorrarEditar = document.createElement('td');
                let guardar = document.createElement('button');
                guardar.textContent = "Guardar";
                guardar.id = 'btn-guardar';
                guardar.addEventListener('click', () => guardarCambios(id, inputNombre.value, inputDocumento.value, inputContacto.value, inputCobertura.value, inputEmail.value));
                tdBorrarEditar.appendChild(guardar);
                tr.appendChild(tdBorrarEditar);
            });
    }

    function guardarCambios(id, nombre, documento, contacto, obraSocial, email) {
        let pacienteActualizado = {
            nombre,
            documento,
            contacto,
            obraSocial,
            email
        };

        fetch(BASE_URL + '/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pacienteActualizado)
        }).then(response => {
            if (response.ok) {
                obtener(); // Actualizar la lista después de guardar los cambios
            }
        });
    }

    //lista ver lista actualizada get a mockapi
    obtener();


    //paginacion
    let currentPage = 1;
    const limit = 5;

    document.getElementById("anterior").addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            obtener(currentPage, limit);
        }
    });

    document.getElementById("siguiente").addEventListener("click", function () {
        if (currentPage < limit) {
            currentPage++;
            obtener(currentPage, limit);
        }
    });

    async function obtener(page = 1, limit = 5) {
        try {
            let url = new URL(BASE_URL);
            url.searchParams.append('page', page);
            url.searchParams.append('limit', limit);

            let response = await fetch(url);
            if (!response.ok) {
                throw new Error('Connection error');
            }
            let pacientes = await response.json();
            mostrar(pacientes);
        } catch (e) {
            console.log(e);
        }
    }
    //mostrar pacinte 

    function mostrar(pacientes) {
        let tbody = document.getElementById('body-tabla');

        tbody.innerHTML = ''; // Limpiar el contenido anterior de la tabla

        pacientes.forEach(paciente => {
            let tr = document.createElement('tr');
            tr.id = "paciente-" + paciente.id; // Asignar un id a la fila

            let tdNombre = document.createElement('td');
            tdNombre.textContent = paciente.nombre;
            tr.appendChild(tdNombre);

            let tdDocumento = document.createElement('td');
            tdDocumento.textContent = paciente.documento;
            tr.appendChild(tdDocumento);

            let tdContacto = document.createElement('td');
            tdContacto.textContent = paciente.contacto;
            tr.appendChild(tdContacto);

            let tdCobertura = document.createElement('td');
            tdCobertura.textContent = paciente.obraSocial;
            tr.appendChild(tdCobertura);

            let tdEmail = document.createElement('td');
            tdEmail.textContent = paciente.email;
            tr.appendChild(tdEmail);

            let tdBorrarEditar = document.createElement('td');

            let editar = document.createElement('button');
            editar.textContent = "editar";
            editar.id = 'btn-editar';
            editar.addEventListener('click', () => editarPaciente(paciente.id));

            let eliminar = document.createElement('button');
            eliminar.textContent = "eliminar";
            eliminar.id = 'btn-eliminar';
            eliminar.addEventListener('click', () => eliminarPaciente(paciente.id));

            tdBorrarEditar.appendChild(editar);
            tdBorrarEditar.appendChild(eliminar);
            tr.appendChild(tdBorrarEditar);


            tbody.appendChild(tr);
        });
    }

    function eliminarPaciente(id) {
        fetch(BASE_URL + '/' + id, {
            method: 'DELETE',
        }).then(response => {
            if (response.ok) {
                obtener(); // Actualizar la lista después de eliminar
            }
        })
    };



    //buscar paciente
    document.querySelector("#buscar-paciente").addEventListener("input", (e) => {   // Escuchar el input
        let valorBusqueda = e.target.value.toLowerCase();      // Obtener la letra de la búsqueda
        let filas = document.querySelectorAll("#body-tabla tr");  // Seleccionar todas las filas de la tabla

        filas.forEach(fila => {          // Recorrer y chequear si está
            let nombre = fila.querySelector("td").textContent.toLowerCase();  // Obtener el valor de la fila
            if (nombre.includes(valorBusqueda)) {      // Chequear si está
                fila.style.display = "";
            } else {
                fila.style.display = "none";     // Ocultar fila si no está
            }
        });
    });

}

