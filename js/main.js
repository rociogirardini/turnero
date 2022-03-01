//-------------------------FUNCIONES DEL PROYECTO-------------------------

// Array de horas
let horasDisponibles = ["10:00 AM", "10:30 AM", "11:15 AM", "12:00 PM", "05:00 PM", "08:00 PM"];
// Traer los elementos del DOM
let text_name;
let numberID;
let inputState;
let textFecha;
let textHora;

function getElement() {
    text_name = document.getElementById("text_name").value;
    numberID = document.getElementById("numberID").value;
    inputState = document.getElementById("inputState").value;
    textFecha = document.getElementById("textFecha").value;
    textHora = document.getElementById("textHora").value;
}
function validar(str1, str2, str3, str4, str5) {
    if (str1 && str2 && str3 && str4 && str5) {
        return true
    }
    $('#alerta').append("<p class='alertText'>No todos los campos se han completado correctamente</p>");
    alertas(1, 'alerta');
    return false;
}

//Animación para todas las alertas
function alertas(tipo, idMensaje) {
    if (tipo == 1) {
        $(`#${idMensaje}`).fadeIn("fast")
            .delay(3000)
            .fadeOut("slow", function () {
                $(`#${idMensaje} p`).remove();
            })
            .show();
    }
}
function fncEnviar() {
    const consultorioDoctor = asignarDoctor(inputState);
    getElement();
    // Validar ejecución
    let validacion = validar(text_name, numberID, inputState, textFecha, textHora);
    if (validacion) {
        // Salida de los datos del DOM
        let nombre = document.getElementById("nombre");
        let numeroID = document.getElementById("numeroID");
        let area = document.getElementById("area");
        let fecha = document.getElementById("fecha");
        let hora = document.getElementById("hora");
        let consultorio = document.getElementById("consultorio");
        let imprimir = document.getElementById("imprimir");
        nombre.innerHTML = `<strong>Nombre:</strong> ${text_name}`;
        numeroID.innerHTML = `<strong>ID:</strong> ${numberID}`;
        area.innerHTML = `<strong>Área:</strong> ${inputState}`;
        fecha.innerHTML = `<strong>Día:</strong> ${textFecha}`;
        hora.innerHTML = `<strong>Horario:</strong> ${textHora}`;

        consultorio.innerHTML = `<strong>Doctor y Consultorio:</strong> ${consultorioDoctor}`;
        imprimir.innerHTML = '<input type="button" value="Imprimir" class="btn btn-primary" onclick="javascript:window.print()" />'
    }
    function asignarDoctor(area) {
        let doctor;
        switch (area) {
            case "Quiropraxia":
                doctor = "Dr. Perez. Atiende en el consultorio 1";
                break;
            case "Fisioterapia":
                doctor = "Dr. Gonzalez. Atiende en el consultorio 2";
                break;
            case "Kinesiología":
                doctor = "Dra. Juarez. Atiende en el consultorio 3";
                break;
            case "RPG":
                doctor = "Dr. Rodriguez. Atiende en el consultorio 4";
                break;
            default:
                console.error("Entró en el caso default de la función asignarDoctor")
        }
        return doctor;
    }
}

//-------------------------EVENTOS DEL PROYECTO-------------------------

// Capturando botones y clicks mediante JQuery
$("body").keyup(function (e) {
    e.preventDefault;
    if (e.keyCode == 13) {
        fncEnviar();
    }
});
$("#submitBtn").click(function () {
    getElement();
    if (validar(text_name, numberID, inputState, textFecha, textHora)) {
        // Agregar turno
        if (miTurnero.addTurno(inputState, textFecha, textHora)) {
            const URLGET = "https://jsonplaceholder.typicode.com/posts";
            $.post(URLGET, text_name, (respuesta, estado) => {
                if (estado === "success") {
                    $("#envioExitoso").prepend(`<p>¡Gracias ${text_name}! Tu turno se confirmó correctamente</p>`);
                    alertas(1, 'envioExitoso');
                }
            });
            fncEnviar();
        } else {
            $('#alerta').append("<p class='alertText'>La hora seleccionada está ocupada</p>");
            alertas(1, 'alerta');
        }
    }
});
// Slider del Index
$(document).ready(function () {
    var imgItems = $('.slider li').length; //Numero de items
    var imgPosition = 1 // Posición de la imagen al hacer click con las flechas
    for (i = 1; i <= imgItems; i++) {
        $('.pagination').append('<li><span><img src="./media/paginacion.png" width="10px"></span></li>') //Iteración del ciclo para que se creen tantos como slides haya
    }
    $('.slider li').hide();
    $('.slider li:first').show();
    $('.pagination img:first').css({ "width": "12px" }); // Estilo del slide seleccionado

    //Ejecutar funciones

    $('.pagination li').click(pagination);
    $('.right img').click(nextSlider);
    $('.left img').click(prevSlider);

    setInterval(function () {
        nextSlider();
    }, 8000);

    // Funciones declaradas del slider
    //click de la paginación
    function pagination() {
        var paginationPosition = $(this).index() + 1;

        $('.slider li').hide();
        $('.slider li:nth-child(' + paginationPosition + ')').fadeIn();

        $('.pagination img').css({ "width": "10px" });  // Cambiando tamaño únicamente del slider activo
        $('img', this).css({ "width": "12px" });

        imgPosition = paginationPosition
    }
    //click de las flechas
    function nextSlider() {
        if (imgPosition >= imgItems) {
            imgPosition = 1
        } else {
            imgPosition++;
        }

        $('.pagination img').css({ "width": "10px" });  // Cambiando tamaño únicamente del slider activo
        $('img', '.pagination li:nth-child(' + imgPosition + ')').css({ "width": "12px" });

        $('.slider li').hide();
        $('.slider li:nth-child(' + imgPosition + ')').fadeIn();
    }

    function prevSlider() {
        if (imgPosition <= 1) {
            imgPosition = imgItems
        } else {
            imgPosition--;
        }

        $('.pagination img').css({ "width": "10px" });  // Cambiando tamaño únicamente del slider activo
        $('img', '.pagination li:nth-child(' + imgPosition + ')').css({ "width": "12px" });

        $('.slider li').hide();
        $('.slider li:nth-child(' + imgPosition + ')').fadeIn();
    }
});