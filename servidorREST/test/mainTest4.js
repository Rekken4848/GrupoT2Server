// ........................................................
// mainTest4.js
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
describe( "Tarea 4: Funciones basicas de Direccion", function() {
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
    it( "Primero borro direcciones que pueda haber en la bbdd", function( hecho ) {
        var zonas = {  }
        request.post(
            { url : IP_PUERTO+"/borrarDirecciones",
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
    it( "Inserto una persona para que funcione la direccion", function( hecho ) {
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
    it( "Inserto un admin para que funcione la dirrecion", function( hecho ) {
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
    it( "Inserto un zona para que funcione la direccion", function( hecho ) {
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
    it( "Inserto la direccion", function( hecho ) {
        var direccion = { dni: '12345678A', codigo_postal: '03601', ccaa: 'Madrid', provincia: 'Madrid', calle: 'Calle De Madrid' }
        request.post(
            { url : IP_PUERTO+"/direccion",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( direccion )
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
    it( "Actualizo la direccion", function( hecho ) {
        var direccion = { dni: '12345678A', codigo_postal: '03601', ccaa: 'Madrid', provincia: 'Getafe', calle: 'Calle De Madrid' }
        request.post(
            { url : IP_PUERTO+"/actualizarDireccion",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( direccion )
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
    it( "Busco la direccion anteriormente introducido", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/direccion/12345678A",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal(solucion.dni, "12345678A", "¿El dni de la direccion no es 12345678A?")
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco todas las direcciones", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/todasDirecciones",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal( solucion.length, 1, "¿no hay un resulado?" )
                assert.equal(solucion[0].dni, "12345678A", "¿El dni de la direccion no es 12345678A?")
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco la direccion anteriormente introducido por cp", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/direccionCP/03601",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal(solucion[0].codigo_postal, "03601", "¿cp no es 03601?")
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco la direccion anteriormente introducido por ccaa", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/direccionCCAA/Madrid",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal(solucion[0].ccaa, "Madrid", "¿ccaa no es Madrid?")
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco la direccion anteriormente introducido por provincia", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/direccionProvincia/Getafe",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal(solucion[0].provincia, "Getafe", "¿provincia no es Getafe?")
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Borro direccion por dni", function( hecho ) {
        var direccion = { dni: '12345678A' }
        request.post(
            { url : IP_PUERTO+"/borrarDireccionPorDNI",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( direccion )
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
    it( "Compruebo que se borro", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/direccion/12345678A",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 404, "¿El código no es 200 (OK)")
                assert.equal( carga, "no encontré la direccion con dni: " + "12345678A", "¿No se ha borrado la direccion?" )
                hecho()
            } // callback
        ) //
    })
    // ....................................................
    // ....................................................
    it( "Inserto la direccion para borrar de otra forma", function( hecho ) {
        var direccion = { dni: '12345678A', codigo_postal: '03601', ccaa: 'Madrid', provincia: 'Madrid', calle: 'Calle De Madrid' }
        request.post(
            { url : IP_PUERTO+"/direccion",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( direccion )
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
    it( "Borro direccion por zona", function( hecho ) {
        var zona = { zona: '03601' }
        request.post(
            { url : IP_PUERTO+"/borrarDireccionesPorZona",
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
    it( "Compruebo que se borro de la otra forma", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/direccion/12345678A",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 404, "¿El código no es 200 (OK)")
                assert.equal( carga, "no encontré la direccion con dni: " + "12345678A", "¿No se ha borrado la direccion?" )
                hecho()
            } // callback
        ) //
    })
})