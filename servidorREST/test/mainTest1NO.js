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
describe( "Tarea 1: Insertar Medicion y buscar por dispositivo en el servidor", function() {
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
    it( "Primero borro las mediciones que pueda haber de ese dispositivo", function( hecho ) {
        var medicion = { dispositivo_id: "Id_para_Test" }
        request.post(
            { url : IP_PUERTO+"/borrarMedicionesPorDispositivo",
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
    it( "Inserto la medicion", function( hecho ) {
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
    it( "Busco la medida anteriormente introducida", function (hecho) {
        request.get(
            {
                url: IP_PUERTO + "/medicion/Id_para_Test",
                headers: { 'User-Agent': 'hugo' }
            },
            function (err, respuesta, carga) {
                assert.equal(err, null, "¿ha habido un error?")
                assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)")
                var solucion = JSON.parse(carga)
                assert.equal(solucion.dispositivo_id, "Id_para_Test", "¿La id del dispositivo no es Id_para_Test?")
                hecho()
            } // callback
        ) //
    }) // it
})