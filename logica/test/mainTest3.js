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
    it("Borrar todos los anuncios", async function () {
        //await laLogica.borrarTodosAdminAnuncio()
        //await laLogica.borrarTodosDispositivoAnuncio()

        //await laLogica.borrarTodosMedicionDispositivo()
        //await laLogica.borrarMediciones()

        await laLogica.borrarAnuncios()
        //await laLogica.borrarTiposValor()
        //await laLogica.borrarDispositivos()
        //await laLogica.borrarDirecciones()
        //await laLogica.borrarTodasLasZonas()
        //await laLogica.borrarAdmins()
        //await laLogica.borrarPersonas()

        //assert.equal(res.length, 0, "¿hay un resulado?")
    }) // it
    // ....................................................
    // ....................................................
    it("Inserto un anuncio", async function () {
        await laLogica.insertarAnuncio({ anuncio_id: 10, contenido: "Prueba", titulo: 'Titulo prueba' })
    }) // it


    // ....................................................
    // ....................................................
    it( "Busco todos los anuncios",
        async function() {
            var res = await laLogica.getTodosLosAnuncios()
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