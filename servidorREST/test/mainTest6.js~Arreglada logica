// ........................................................
// mainTest6.js
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
describe( "Tarea 6: Funciones basicas de TipoValor", function() {
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
    it( "Primero borro tipos de valor que pueda haber en la bbdd", function( hecho ) {
        var tipo_valor = {  }
        request.post(
            { url : IP_PUERTO+"/borrarTiposValor",
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
    it( "Inserto el tipo valor", function( hecho ) {
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
    it( "Busco tipo valor anteriormente introducido", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/todosTipoValor",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal(solucion[0].tipo_valor, "CO3", "¿El dni del zona_admin no es CO3?")
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Borro tipo valor", function( hecho ) {
        var tipo_valor = { tipo_valor: 'CO3' }
        request.post(
            { url : IP_PUERTO+"/borrarTipoValor",
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
    it( "Busco tipo valor anteriormente introducido", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/todosTipoValor",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 404, "¿El código no es 200 (OK)")
                assert.equal( carga, "no existen tipos de valores", "¿No se ha borrado el Tipo Valor?" )
                hecho()
            } // callback
        ) //
    }) // it
})