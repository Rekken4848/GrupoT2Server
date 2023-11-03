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
describe( "Tarea 1: Funciones basicas de persona", function() {
    // ....................................................
    // ....................................................
    var laLogica = null
    // ....................................................
    // ....................................................

    it("conectar a la base de datos", function (hecho) {
        laLogica = new Logica(
            "../bd/datos.bd",
            function (err) {
                if (err) {
                    throw new Error("No he podido conectar con datos.db")
                }
                hecho()
            })
    }) // it


    // ....................................................
    // ....................................................
    it("Borrar todas las personas", async function () {
        //await laLogica.borrarTodosAdminAnuncio()
        //await laLogica.borrarTodosDispositivoAnuncio()

        //await laLogica.borrarTodosMedicionDispositivo()
        //await laLogica.borrarMediciones()

        //await laLogica.borrarAnuncios()
        //await laLogica.borrarTiposValor()
        //await laLogica.borrarDispositivos()
        //await laLogica.borrarDirecciones()
        //await laLogica.borrarTodasLasZonas()
        //await laLogica.borrarAdmins()
        await laLogica.borrarPersonas()
        
        //assert.equal(res.length, 0, "¿hay un resulado?")
    }) // it

    // ....................................................
    // ....................................................

    it("Inserto una persona", async function () {
        var persona = { dni: '44444444E', nombre: 'Mario', apellidos: 'Casas', correo: 'mariocasas@gmail.com', telefono: '999999999' }
        await laLogica.insertarPersona(persona)
    }) // it

    
    // ....................................................
    // ....................................................
    it( "Buscamos todas las personas",
        async function() {
            await laLogica.getTodasLasPersonas(  )
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