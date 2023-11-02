// ........................................................
// mainTest1.js
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
describe( "Tarea 1: Funciones basicas de Persona", function() {
    // ....................................................
    // PRUEBA
    // ....................................................
    it("probar que GET /prueba responde ¡Funciona!", function (hecho) {
        request.get(
            { url: IP_PUERTO + "/prueba", headers: { 'User-Agent': 'hugo' } },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                assert.equal(carga, "¡Funciona!", "¿La carga no es ¡Funciona!?")
                hecho()
            } // callback()
        ) // .get
    }) // it
    // ....................................................
    // ....................................................
    it( "Primero borro las personas que pueda haber en la bbdd", function( hecho ) {
        var persona = {  }
        request.post(
            { url : IP_PUERTO+"/borrarPersonas",
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
    it( "Inserto una persona", function( hecho ) {
        var persona = { dni: '44444444B', nombre: 'Mario', apellidos: 'Casas', correo: 'mariocasas@gmail.com', telefono: '999999999' }
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
    it( "Actualizo una persona", function( hecho ) {
        var persona = { dni: '44444444B', nombre: 'Mario', apellidos: 'Casas', correo: 'mariocasas2@gmail.com', telefono: '999999999' }
        request.post(
            { url : IP_PUERTO+"/actualizarPersona",
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
    it( "Busco la persona anteriormente introducida", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/persona/44444444B",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal(solucion.dni, "44444444B", "¿El dni de la persona no es 44444444B?")
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco todas las personas", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/todasPersonas",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal( solucion.length, 1, "¿no hay un resulado?" )
                assert.equal(solucion.dni, "44444444B", "¿El dni de la persona no es 44444444B?")
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco la persona anteriormente introducida por apellidos", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/personasApellidos/Casas",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal(solucion.apellidos, "Casas", "¿Los apellidos de la persona no son Casas?")
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Borro la persona por dni", function( hecho ) {
        var persona = { dni: '44444444B' }
        request.post(
            { url : IP_PUERTO+"/borrarPersonaPorDNI",
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
    it( "Comprobar que la persona se ha borrado", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/persona/44444444B",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 404, "¿El código no es 404 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal( solucion.length, 0, "¿hay un resulado?" )
                hecho()
            } // callback
        ) //
    }) // it
})