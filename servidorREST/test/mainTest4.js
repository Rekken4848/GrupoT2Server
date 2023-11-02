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
describe( "Tarea 2: Funciones basicas de Direccion", function() {
    // ....................................................
    // ....................................................
    it( "Primero borro todas las mediciones", function( hecho ) {
        var medicion = {  }
        request.post(
            { url : IP_PUERTO+"/borrarMediciones",
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
    it( "Inserto distintas mediciones para probar posteriormente los filtros 1", function( hecho ) {
        var medicion = { Vgas: 10.45, Vtemp: 20.45, fecha: '2023-10-15 19:00:00', dispositivo_id: "Id_para_Test" }
        request.post(
            { url : IP_PUERTO+"/medicion",
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
    it( "Inserto distintas mediciones para probar posteriormente los filtros 2", function( hecho ) {
        var medicion = { Vgas: 11.45, Vtemp: 21.45, fecha: '2023-10-15 20:00:00', dispositivo_id: "Id_para_Test2" }
        request.post(
            { url : IP_PUERTO+"/medicion",
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
    it( "Inserto distintas mediciones para probar posteriormente los filtros 3", function( hecho ) {
        var medicion = { Vgas: 12.45, Vtemp: 22.45, fecha: '2023-10-15 21:00:00', dispositivo_id: "Id_para_Test3" }
        request.post(
            { url : IP_PUERTO+"/medicion",
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
    it( "Inserto distintas mediciones para probar posteriormente los filtros 4", function( hecho ) {
        var medicion = { Vgas: 13.45, Vtemp: 23.45, fecha: '2023-10-15 22:00:00', dispositivo_id: "Id_para_Test4" }
        request.post(
            { url : IP_PUERTO+"/medicion",
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
    it( "Busco la medida mas reciente", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/ultimaMedicion",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                //assert.equal( solucion.length, 1, "¿no hay un resulado?" )
                assert.equal( solucion.fecha, '2023-10-15 22:00:00', "¿no es 2023-10-15 22:00:00?" )
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco todas las medidas", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/todasMediciones",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal( solucion.length, 4, "¿no hay cuatro resulados?" )
                assert.equal( solucion[0].fecha, '2023-10-15 19:00:00', "¿no es 2023-10-15 19:00:00?" )
                assert.equal( solucion[1].fecha, '2023-10-15 20:00:00', "¿no es 2023-10-15 20:00:00?" )
                assert.equal( solucion[2].fecha, '2023-10-15 21:00:00', "¿no es 2023-10-15 21:00:00?" )
                assert.equal( solucion[3].fecha, '2023-10-15 22:00:00', "¿no es 2023-10-15 22:00:00?" )
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco las medidas entre unas determinadas fechas", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/medicionEntreFechas/2023-10-15 19:30:00/2023-10-15 22:00:00",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal( solucion.length, 3, "¿no hay tres resulados?" )
                assert.equal( solucion[0].fecha, '2023-10-15 20:00:00', "¿no es 2023-10-15 20:00:00?" )
                assert.equal( solucion[1].fecha, '2023-10-15 21:00:00', "¿no es 2023-10-15 21:00:00?" )
                assert.equal( solucion[2].fecha, '2023-10-15 22:00:00', "¿no es 2023-10-15 22:00:00?" )
                hecho()
            } // callback
        ) //
    }) // it
})