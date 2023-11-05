// ........................................................
// mainTest2.js
// ........................................................
const Logica = require( "../Logica.js" )
var assert = require ('assert')
// ........................................................
// Hugo Martin Escrihuela
// ........................................................
// ........................................................
// main ()
// ........................................................
describe( "Tarea 3: Funciones basicas de Anuncio", function() {
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
    // ....................................................
    // ....................................................

    it("Inserto un anuncio", async function () {
        await laLogica.insertarAnuncio({ anuncio_id: 10, contenido: "Prueba", titulo: 'Titulo prueba' })
    }) // it

    // ....................................................
    // ....................................................

    it("Actualizamos un anuncio", async function () {
        await laLogica.actualizarAnuncio({ anuncio_id: 10, contenido: "Prueba2", titulo: 'Titulo prueba 2' })
    }) // it

    // ....................................................
    // ....................................................

    it( "Busco todos los anuncios",
        async function() {
            await laLogica.getTodosLosAnuncios()
    }) // it

    // ....................................................
    // ....................................................

    it("Busco anuncios por admin",
        async function () {
            await laLogica.getAnunciosPorAdmin('44444443Insert')
        }) // it

    // ....................................................
    // ....................................................

    it("Busco anuncios por dispositivos",
        async function () {
            await laLogica.getAnunciosPorDispositivo('dispositivoInsert2')
        }) // it

    // ....................................................
    // ....................................................

    //----- borrar test para prueba global de todos los tests -------->>
    it("Borramos anuncio por el id",
        async function () {
            await laLogica.borrarAnunciosPorId(10)
        }) // it
    //----- borrar test para prueba global de todos los tests --------<<


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