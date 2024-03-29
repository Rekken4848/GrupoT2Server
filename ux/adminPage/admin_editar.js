// .......................................................
// .......................................................
// ..................ADMIN_EDITAR.........................
// .......................................................
// .......................................................

var editando = false;
var dni_persona_editando = "";

// .......................................................
// cursorLapiz()
// .......................................................
function cursorLapiz() {
    editando = !editando;
    if (editando) {
        //document.getElementById('botonEditarTrabajador').style.background = 'rgb(156, 222, 222)';

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        // Establece las dimensiones del canvas
        canvas.width = 32; // ajusta según sea necesario
        canvas.height = 32;

        // Carga la imagen PNG
        var img = new Image();
        img.src = '../images/customIcons/pencil-shorter-2.png';

        // Cuando la imagen se carga, dibújala en el canvas
        img.onload = function () {
            context.drawImage(img, 0, 0, 32, 32); // ajusta según sea necesario

            // Establece el cursor personalizado con la imagen del canvas
            document.getElementById('fondoPagina').style.cursor = 'url(' + canvas.toDataURL() + '), help';
        };

        //document.getElementById('fondoPagina').style.cursor = "url(../images/customIcons/pencil-shorter-2.png), help";

    } else {
        document.getElementById('botonEditarTrabajador').style.background = 'white';
        document.getElementById('fondoPagina').style.cursor = 'default';
    }
}

// .......................................................
// Texto --> editarFila()
// .......................................................
function editarFila(dni_persona) {
    if (!editando) return;

    if (typeof dni_persona !== "string" || dni_persona.length > 10 || dni_persona.length < 1) {
        console.log("Error: dni_persona no valido");
        return;
    }

    document.getElementById("contenedorPopUpsEditar").style.visibility = "visible";
    dni_persona_editando = dni_persona;

    // Fetch data from the API endpoint
    fetch('http://localhost:8080/persona/' + dni_persona) // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
            document.getElementById("dnieditar").value = data.dni;
            document.getElementById("nameeditar").value = data.nombre;
            document.getElementById("surnameeditar").value = data.apellidos;
            document.getElementById("teleditar").value = data.telefono;
            document.getElementById("emaileditar").value = data.correo;
        })
        .catch(error => console.error('Error fetching data:', error));

    // Fetch data from the API endpoint
    fetch('http://localhost:8080/direccion/' + dni_persona) // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
            document.getElementById("ccaaeditar").value = data.ccaa;
            document.getElementById("provinceeditar").value = data.provincia;
            document.getElementById("postalCodeeditar").value = data.codigo_postal;
            document.getElementById("streeteditar").value = data.calle;
        })
        .catch(error => console.error('Error fetching data:', error));

    // Fetch data from the API endpoint
    fetch('http://localhost:8080/dispositivo/' + dni_persona) // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
            document.getElementById("deviceAssociadoTitulo").value = data.dispositivo_id;
        })
        .catch(error => console.error('Error fetching data:', error));
}

// .......................................................
// confirmarEditarPersona()
// .......................................................
function confirmarEditarPersona() {
    var datos = {
        dni: document.getElementById("dnieditar").value,
        nombre: document.getElementById("nameeditar").value,
        apellidos: document.getElementById("surnameeditar").value,
        correo: document.getElementById("emaileditar").value,
        telefono: document.getElementById("teleditar").value,
    }
    console.log(datos)
    fetch('http://localhost:8080/actualizarPersona', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {
    })

    var datos = {
        dni: document.getElementById("dnieditar").value,
        ccaa: document.getElementById("ccaaeditar").value,
        provincia: document.getElementById("provinceeditar").value,
        codigo_postal: document.getElementById("postalCodeeditar").value,
        calle: document.getElementById("streeteditar").value,
    }
    console.log(datos)
    fetch('http://localhost:8080/actualizarDireccion', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {
    })

    var datos = {
        dni_empleado: document.getElementById("dnieditar").value,
        dispositivo_id: document.getElementById("deviceAssociadoTitulo").value,
    }
    console.log(datos)
    fetch('http://localhost:8080/actualizarDispositivo', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {
    })

    document.getElementById("contenedorPopUpsEditar").style.visibility = "hidden";
    dni_persona_editando = "";
}

// .......................................................
// eliminarPersona()
// .......................................................
function eliminarPersona() {
    document.getElementById("contenedorPopUpsEditar").style.visibility = "hidden";
    dni_persona_editando = "";

    var datos = {
        dni: document.getElementById("dnieditar").value
    }
    console.log(datos)
    fetch('http://localhost:8080/borrarDireccionPorDNI', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {
    })

    document.getElementById("contenedorPopUpsEditar").style.visibility = "hidden";
    dni_persona_editando = "";

    var datos = {
        dni_empleado: document.getElementById("dnieditar").value
    }
    console.log(datos)
    fetch('http://localhost:8080/borrarDispositivoPorPersona', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {
    })

    var datos = {
        dni: document.getElementById("dnieditar").value
    }
    console.log(datos)
    fetch('http://localhost:8080/borrarPersonaPorDNI', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {
    })

    document.getElementById("contenedorPopUpsEditar").style.visibility = "hidden";
    document.getElementById("contenedorConfirmarEliminar").style.visibility = "hidden";
    dni_persona_editando = "";
}

// .......................................................
// showAlertEliminar()
// .......................................................
function showAlertEliminar() {
    alert('Se ha eliminado correctamente');
}

// .......................................................
// eliminarAndSetTags()
// .......................................................
function eliminarAndSetTags() {
    eliminarPersona();
    setTipoTags('persona');
    showAlertEliminar();
}

// .......................................................
// showAlertEditar()
// .......................................................
function showAlertEditar() {
    alert('Se ha editado correctamente');
}

// .......................................................
// editarAndSetTags()
// .......................................................
function editarAndSetTags() {
    confirmarEditarPersona();
    setTipoTags('persona');
    showAlertEditar();
}