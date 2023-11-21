// .....................................................................
// logicaWeb.js
// .....................................................................
// .....................................................................
// Hugo Martin Escrihuela
// .....................................................................

// .......................................................
// .......................................................
// .......................GET.............................
// .......................................................
// .......................................................
// .......................................................
// Texto --> buscarMedicionPorDispositivo() --> Medicion
// .......................................................
function buscarMedicionPorDispositivo(dispositivo_id) {
    fetch('http://localhost:8080/medicion/' + dispositivo_id, {
        method: "GET"
    }).then(function (respuesta) {

        if (respuesta.ok) {

            return respuesta.json()
        } else {
            enviarDatos("hubo un fallo")
        }

    }).then(function (datos) {
        enviarDatos(datos)
    })
}
// .......................................................
// getUltimaMedicion() --> Medicion
// .......................................................
function getUltimaMedicion() {
    console.log("Repite")
    fetch('http://localhost:8080/ultimaMedicion', {
        method: "GET"
    }).then(function (respuesta) {

        if (respuesta.ok) {

            return respuesta.json()
        } else {
            enviarDatos("hubo un fallo")
        }

    }).then(function (datos) {
        // Obtener el elemento div por su ID
        var valorGasDiv = document.getElementById("valorGas")
        var valorTempDiv = document.getElementById("valorTemp")

        // Cambiar el texto del div
        valorGasDiv.textContent = "El valor del gas es: " + datos.Vgas
        valorTempDiv.textContent = "El valor de la temperatura es: " + datos.Vtemp
    })
}
// .......................................................
// fecha, fecha
// -->
// buscarMedicionesEntreFechas()
// -->
// Lista<Medicion>
// .......................................................
function buscarMedicionesEntreFechas(fechaInicio, fechaFin) {
    fetch('http://localhost:8080/medicionEntreFechas/' + fechaInicio + "/" + fechaFin, {
        method: "GET"
    }).then(function (respuesta) {

        if (respuesta.ok) {

            return respuesta.json()
        } else {
            enviarDatos("hubo un fallo")
        }

    }).then(function (datos) {
        enviarDatos(datos)
    })
}
// .......................................................
// getTodasLasMediciones() -> Lista<Medicion>
// .......................................................
function getTodasLasMediciones() {
    fetch('http://localhost:8080/todasMediciones', {
        method: "GET"
    }).then(function (respuesta) {

        if (respuesta.ok) {

            return respuesta.json()
        } else {
            enviarDatos("hubo un fallo")
        }

    }).then(function (datos) {
        enviarDatos(datos)
    })
}

// .......................................................
// .......................POST............................
// .......................................................
// .......................................................
// .......................................................
// R, R, fecha, Texto
// -->
// insertarMedicion()
// .......................................................
function insertarMedicion(Vgas, Vtemp, fecha, dispositivo_id) {
    var datos = {Vgas: Vgas, Vtemp: Vtemp, fecha: fecha, dispositivo_id: dispositivo_id}
    console.log(datos)
    fetch('http://localhost:8080/medicion', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {

        if (respuesta.ok) {
            enviarDatos("Todo introducido con éxito");
        } else {
            enviarDatos("hubo un fallo")
        }
    })
}
// .......................................................
// .......................................................
// ......................DELETE...........................
// .......................................................
// .......................................................
// .......................................................
// .......................................................
// borrarMediciones()
// .......................................................
function borrarMediciones() {
    var datos = {}
    console.log("Borrar mediciones")
    fetch('http://localhost:8080/borrarMediciones', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {

        if (respuesta.ok) {
            enviarDatos("Todo introducido con éxito");
        } else {
            enviarDatos("hubo un fallo")
        }
    })
}
// .......................................................
// Texto --> borrarMedicionesPorDispositivo()
// .......................................................
function borrarMedicionesPorDispositivo(dispositivo) {
    var datos = {dispositivo_id: dispositivo}
    console.log(datos)
    fetch('http://localhost:8080/borrarMedicionesPorDispositivo', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {

        if (respuesta.ok) {
            enviarDatos("Todo introducido con éxito");
        } else {
            enviarDatos("hubo un fallo")
        }
    })
}