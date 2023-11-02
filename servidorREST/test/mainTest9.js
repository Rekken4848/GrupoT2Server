// ........................................................
// mainTest9.js
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
describe( "Tarea 2: Funciones basicas de anuncio", function() {
    // ....................................................
    // ....................................................
    it( "Primero borro anuncios que pueda haber en la bbdd", function( hecho ) {
        var zonas = {  }
        request.post(
            { url : IP_PUERTO+"/borrarAnuncios",
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
    it( "Inserto un anuncio", function( hecho ) {
        var anuncio = { contenido: 'Se me ha roto muy fuerte el sensor.', titulo: 'Se rompió el sensor' }
        request.post(
            { url : IP_PUERTO+"/anuncio",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( anuncio )
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
    it( "Actualizo el anuncio", function( hecho ) {
        var anuncio = { contenido: 'Se me ha roto muy fuerte el sensor.', titulo: 'Se arreglo el sensor' }
        request.post(
            { url : IP_PUERTO+"/actualizarAnuncio",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( anuncio )
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
    it( "Busco todos los anuncios", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/todosAnuncios",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal( solucion.length, 1, "¿no hay un resulado?" )
                assert.equal(solucion.dni, "12345678A", "¿El dni del zona_admin no es 12345678A?")
                hecho()
            } // callback
        ) //
    }) // it
    // ....................................................
    // ....................................................
    it( "Borro anuncio por id", function( hecho ) {
        var anuncio = { anuncio_id: 1 }
        request.post(
            { url : IP_PUERTO+"/borrarAnuncioPorId",
                headers : { 'User-Agent' : 'hugo', 'Content-Type' : 'application/json' },
                body : JSON.stringify( anuncio )
            },
            function( err, respuesta, carga ) {
                assert.equal( err, null, "¿ha habido un error?" )
                assert.equal( respuesta.statusCode, 200, "¿El código no es 200 (OK)" )
                hecho()
            } // callback
        ) //
    }) // it
})