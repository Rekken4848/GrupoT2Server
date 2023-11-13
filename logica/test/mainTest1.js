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
    it("Primero vacio la bd", async function () {
        await laLogica.borrarTodasLasTablas()
    }) // it
    // ....................................................
    // ....................................................
    it("Primero borro las personas que pueda haber en la bbdd", async function () {
        await laLogica.borrarPersonas()
            var res = await laLogica.getTodasLasPersonas()
            assert.equal( res.length, 0, "¿hay un resulado?" )
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
    it("Busco la persona anteriormente introducida",
        async function () {
            var res = await laLogica.getPersonaPorDNI('44444444T')
                assert.equal( res.length, 1, "¿no hay un resulado?" )
                assert.equal( res[0].nombre, 'Mario2', "¿no es Mario2?" )
    }) // it
    // ....................................................
    // ....................................................
    it("Buscamos todas las personas",
        async function () {
            var res = await laLogica.getTodasLasPersonas()
                assert.equal( res.length, 1, "¿no hay un resulado?" )
                assert.equal( res[0].nombre, 'Mario2', "¿no es Mario2?" )
        }) // it
    // ....................................................
    // ....................................................
    it("Buscamos personas por apellido",
        async function () {
            var res = await laLogica.getPersonasPorApellidos('Casas2')
                assert.equal( res.length, 1, "¿no hay un resulado?" )
                assert.equal( res[0].nombre, 'Mario2', "¿no es Mario2?" )
    }) // it
    // ....................................................
    // ....................................................
    it("Borramos la persona por dni",
        async function () {
            await laLogica.borrarPersonaPorDNI('44444444T')
    }) // it
    // ....................................................
    // ....................................................
    it("Comprobar que la persona se ha borrado",
        async function () {
            var res = await laLogica.getPersonaPorDNI('44444444T')
                assert.equal( res.length, 0, "¿hay un resulado?" )
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