// ........................................................
// mainTest8.js
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
describe( "Tarea 2: Funciones basicas de admin_anuncio", function() {
    // ....................................................
    // ....................................................
    it( "Primero borro Medicion_Dispositivo que pueda haber en la bbdd", function( hecho ) {
        var Medicion_Dispositivo = {  }
        request.post(
            { url : IP_PUERTO+"/borrarTodosMedicionDispositivo",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( Medicion_Dispositivo )
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
    it( "Inserto un tipo valor para que funcione la medicion", function( hecho ) {
        var tipo_valor = { tipo_valor: 'CO3' }
        request.post(
            { url : IP_PUERTO+"/tipoValor",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( tipo_valor )
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
    it( "Inserto la medicion para continuar", function( hecho ) {
        var zona = { valor: 12.34, tipo_valor_id: 1, fecha: '2023-10-15 16:32:40', lugar: '10.1234,20.5678' }
        request.post(
            { url : IP_PUERTO+"/medicion",
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
    it( "Inserto el dispositivo para continuar", function( hecho ) {
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
    it( "Inserto una Medicion_Dispositivo", function( hecho ) {
        var medicion_dispositivo = { medicion_id: 1, dispositivo_id: 'FFFFFFFFFF' }
        request.post(
            { url : IP_PUERTO+"/medicion_dispositivo",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( medicion_dispositivo )
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
    it( "Borro medicion_dispositivo por medicion", function( hecho ) {
        var medicion = { medicion_id: 1 }
        request.post(
            { url : IP_PUERTO+"/borrarMedicionDispositivoPorMedicion",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( medicion )
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
    it( "Inserto un tipo valor para que funcione la medicion", function( hecho ) {
        var tipo_valor = { tipo_valor: 'CO3' }
        request.post(
            { url : IP_PUERTO+"/tipoValor",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( tipo_valor )
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
    it( "Inserto la medicion para continuar", function( hecho ) {
        var zona = { valor: 12.34, tipo_valor_id: 1, fecha: '2023-10-15 16:32:40', lugar: '10.1234,20.5678' }
        request.post(
            { url : IP_PUERTO+"/medicion",
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
    it( "Inserto el dispositivo para continuar", function( hecho ) {
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
    it( "Inserto una Medicion_Dispositivo", function( hecho ) {
        var medicion_dispositivo = { medicion_id: 1, dispositivo_id: 'FFFFFFFFFF' }
        request.post(
            { url : IP_PUERTO+"/medicion_dispositivo",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( medicion_dispositivo )
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
    it( "Borro medicion_dispositivo por dispositivo", function( hecho ) {
        var dispositivo = { dispositivo_id: 'FFFFFFFFFF' }
        request.post(
            { url : IP_PUERTO+"/borrarMedicionDispositivoPorDispositivo",
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
})