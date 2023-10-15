// ........................................................
// mainTest1.js
// ........................................................
const Logica = require( "../Logica.js" )
var assert = require ('assert')
// ........................................................
// Hugo Martin Escrihuela
// ........................................................
// ........................................................
// main ()
// ........................................................
describe( "Tarea 1: Insertar Medicion y buscar por dispositivo", function() {
    // ....................................................
    // ....................................................
    var laLogica = null
    // ....................................................
    // ....................................................
    it( "conectar a la base de datos", function( hecho ) {
        laLogica = new Logica(
            "../bd/datos.bd",
            function( err ) {
                if ( err ) {
                    throw new Error ("No he podido conectar con datos.db")
                }
                hecho()
            })
    }) // it
    // ....................................................
    // ....................................................
    it( "Primero borro las mediciones que pueda haber de ese dispositivo",
        async function() {
            await laLogica.borrarMedicionesPorDispositivo( "Id_para_Test" )
                var res = await laLogica.buscarMedicionPorDispositivo( "Id_para_Test" )
                assert.equal( res.length, 0, "¿hay un resulado?" )
    }) // it
    // ....................................................
    // ....................................................
    it( "Primero borro las medidas que pueda haber de ese dispositivo",
        async function() {
            await laLogica.insertarMedicion( {Vgas: 10.45, Vtemp: 20.45, fecha: '2023-10-15 19:00:00', dispositivo_id: "Id_para_Test" } )
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco la medida anteriormente introducida",
        async function() {
            var res = await laLogica.buscarMedicionPorDispositivo( "Id_para_Test" )
                assert.equal( res.length, 1, "¿no hay un resulado?" )
                assert.equal( res[0].dispositivo_id, "Id_para_Test", "¿no es Id_para_Test?" )
    }) // it
    // ....................................................
    // ....................................................
    it( "cerrar conexión a la base de datos",
        async function() {
            try {
                await laLogica.cerrar()
            } catch( err ) {
            // assert.equal( 0, 1, "cerrar conexión a BD fallada: " + err)
                throw new Error( "cerrar conexión a BD fallada: " + err)
            }
    }) // it
})