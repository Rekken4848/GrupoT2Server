// ........................................................
// mainTest5.js
// ........................................................
var request = require('request')
var assert = require('assert')
// ........................................................
// ........................................................
const IP_PUERTO = "http://localhost:8080"
// ........................................................
// Hugo Martin Escrihuela
// ........................................................
// ........................................................
// main ()
// ........................................................
describe( "Tarea 2: Funciones basicas de Dispositivo", function() {
    // ....................................................
    // ....................................................
    it( "Primero borro dispositivos que pueda haber en la bbdd", function( hecho ) {
        var dispositivo = {  }
        request.post(
            { url : IP_PUERTO+"/borrarDispositivos",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( dispositivo )
            },
            function( err, respuesta, carga ) {
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Inserto una persona para que funcione el dispositivo", function( hecho ) {
        var persona = { dni: '12345678A', nombre: 'Juan', apellidos: 'Mata', correo: 'juanmata@gmail.com', telefono: '666666666' }
        request.post(
            { url : IP_PUERTO+"/persona",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( persona )
            },
            function( err, respuesta, carga ) {
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Inserto el dispositivo", function( hecho ) {
        var dispositivo = { dispositivo_id: 'FFFFFFFFFF', dni_empleado: '12345678A' }
        request.post(
            { url : IP_PUERTO+"/dispositivo",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( dispositivo )
            },
            function( err, respuesta, carga ) {
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Actualizo el dispositivo", function( hecho ) {
        var dispositivo = { dispositivo_id: 'GGGGGGGGG', dni_empleado: '12345678A' }
        request.post(
            { url : IP_PUERTO+"/actualizarDispositivo",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( dispositivo )
            },
            function( err, respuesta, carga ) {
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco el dispositivo anteriormente introducido", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/dispositivo/12345678A",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal(solucion.dni, "12345678A", "¿El dni del dispositivo no es 12345678A?")
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco todas las zonas", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/todosDispositivos",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal( solucion.length, 1, "¿no hay un resulado?" )
                assert.equal(solucion.dni, "12345678A", "¿El dni del dispositivo no es 12345678A?")
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Borro dispositivo por id", function( hecho ) {
        var dispositivo = { dispositivo_id: 'GGGGGGGGG' }
        request.post(
            { url : IP_PUERTO+"/borrarDispositivoPorId",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( dispositivo )
            },
            function( err, respuesta, carga ) {
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Compruebo que la zona se ha borrado", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/dispositivo/12345678A",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 404, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal( solucion.length, 0, "¿hay un resulado?" )
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Inserto el dispositivo otra vez para borrar de otra forma", function( hecho ) {
        var dispositivo = { dispositivo_id: 'FFFFFFFFFF', dni_empleado: '12345678A' }
        request.post(
            { url : IP_PUERTO+"/dispositivo",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( dispositivo )
            },
            function( err, respuesta, carga ) {
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Borro dispositivo por persona", function( hecho ) {
        var dispositivo = { dni_empleado: '12345678A' }
        request.post(
            { url : IP_PUERTO+"/borrarDispositivoPorPersona",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( dispositivo )
            },
            function( err, respuesta, carga ) {
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Compruebo que la zona se ha borrado de la otra forma", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/dispositivo/12345678A",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 404, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal( solucion.length, 0, "¿hay un resulado?" )
                hecho()
            } // callback
        ) //
    }) // it
})