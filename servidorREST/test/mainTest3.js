// ........................................................
// mainTest3.js
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
describe( "Tarea 3: Funciones basicas de Zona_Admin", function() {
    // ....................................................
    // ....................................................
    it( "Primero vacio la bbdd", function( hecho ) {
        var vacio = {  }
        request.post(
            { url : IP_PUERTO+"/borrarTodasLasTablas",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( vacio )
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
    it( "Primero borro zonas que pueda haber en la bbdd", function( hecho ) {
        var zonas = {  }
        request.post(
            { url : IP_PUERTO+"/borrarTodasLasZonas",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( zonas )
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
    it( "Inserto una persona para que funcione el admin", function( hecho ) {
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
    it( "Inserto un admin para que funcione la zona", function( hecho ) {
        var admin = { dni_admin: '12345678A', contrasenya: '123456789' }
        request.post(
            { url : IP_PUERTO+"/admin",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( admin )
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
    it( "Inserto la zona", function( hecho ) {
        var zona = { dni_admin: '12345678A', zona: '03601' }
        request.post(
            { url : IP_PUERTO+"/zona",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( zona )
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
    it( "Actualizo la zona", function( hecho ) {
        var zona = { dni_admin: '12345678A', zona: '03602' }
        request.post(
            { url : IP_PUERTO+"/actualizarZona",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( zona )
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
    it( "Busco la zona anteriormente introducida", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/zona/12345678A",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal(solucion.dni_admin, "12345678A", "¿El dni del zona_admin no es 12345678A?")
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco todas las zonas", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/todasZonas",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal( solucion.length, 1, "¿no hay un resulado?" )
                assert.equal(solucion[0].dni_admin, "12345678A", "¿El dni del zona_admin no es 12345678A?")
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Borro zona por dni", function( hecho ) {
        var zona = { dni_admin: '12345678A' }
        request.post(
            { url : IP_PUERTO+"/borrarZonaPorDNI",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( zona )
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
                url: IP_PUERTO + "/zona/12345678A",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 404, "¿El código no es 200 (OK)")
                assert.equal( carga, "no encontré la zona con dni_admin: " + "12345678A", "¿No se ha borrado la zona?" )
                hecho()
            } // callback
        ) //
    }) // it
})