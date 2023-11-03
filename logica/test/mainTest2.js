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
describe( "Tarea 2: Funciones basicas de Medicion", function() {
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
    it("Borrar todas las mediciones", async function () {
        //await laLogica.borrarTodosAdminAnuncio()
        //await laLogica.borrarTodosDispositivoAnuncio()

        //await laLogica.borrarTodosMedicionDispositivo()
        //await laLogica.borrarMediciones()

        //await laLogica.borrarAnuncios()
        //await laLogica.borrarTiposValor()
        //await laLogica.borrarDispositivos()
        //await laLogica.borrarDirecciones()
        //await laLogica.borrarTodasLasZonas()
        await laLogica.borrarAdmins()
        //await laLogica.borrarPersonas()

        //assert.equal(res.length, 0, "¿hay un resulado?")
    }) // it
    // ....................................................
    // ....................................................
    it("Inserto una medicion", async function () {
        await laLogica.insertarMedicion({ valor: 80, tipo_valor_id: 5, fecha: '2023-10-15 19:00:00', lugar: "Id_para_Test" })
    }) // it


    // ....................................................
    // ....................................................
    it( "Busco la medida mas reciente",
        async function() {
            var res = await laLogica.getUltimaMedicion()
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