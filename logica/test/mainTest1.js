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

    it("Borro una persona", async function () {
        await laLogica.borrarPersonas()
    }) // it

    // ....................................................
    // ....................................................

    it("Inserto una persona", async function () {
        var persona = { dni: '44444444T', nombre: 'Mario', apellidos: 'Casas', correo: 'mariocasas@gmail.com', telefono: '999999999' }
        await laLogica.insertarPersona(persona)
    }) // it

    // ....................................................
    // ....................................................

    it("Actualizamos una persona", async function () {
        var persona = { dni: '44444444T', nombre: 'Mario2', apellidos: 'Casas2', correo: 'mariocasas2@gmail.com', telefono: '999999991' }
        await laLogica.actualizarPersona(persona)
    }) // it

    // ....................................................
    // ....................................................

    it("Buscamos todas las personas",
        async function () {
            await laLogica.getTodasLasPersonas()
        }) // it

    // ....................................................
    // ....................................................

    it("Buscamos persona por dni",
        async function () {
            await laLogica.getPersonaPorDNI('44444444T')
    }) // it

    // ....................................................
    // ....................................................

    it("Buscamos personas por apellido",
        async function () {
            await laLogica.getPersonasPorApellidos('Casas2')
    }) // it

    // ....................................................
    // ....................................................

    it("Buscamos personas por zona/codigo postal",
        async function () {
            await laLogica.getPersonasPorZona('12345')
    }) // it

    // ....................................................
    // ....................................................

    it("Buscamos personas por Dispositivo",
        async function () {
            await laLogica.getPersonaPorDispositivo('dispositivoInsert2')
    }) // it

    // ....................................................
    // ....................................................

    //----- borrar test para prueba global de todos los tests -------->>
    it("Borramos persona por el dni",
        async function () {
            await laLogica.borrarPersonaPorDNI('44444444T')
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