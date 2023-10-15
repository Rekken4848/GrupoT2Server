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
describe( "Tarea 2: Insertar distintas Mediciones y filtrar", function() {
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
    it( "Primero borro todas las mediciones",
        async function() {
            await laLogica.borrarMediciones()
                var res = await laLogica.getTodasLasMediciones()
                assert.equal( res.length, 0, "¿hay resulados?" )
    }) // it
    // ....................................................
    // ....................................................
    it( "Inserto distintas mediciones para probar posteriormente los filtros",
        async function() {
            await laLogica.insertarMedicion( {Vgas: 10.45, Vtemp: 20.45, fecha: '2023-10-15 19:00:00', dispositivo_id: "Id_para_Test" } )
            await laLogica.insertarMedicion( {Vgas: 11.45, Vtemp: 21.45, fecha: '2023-10-15 20:00:00', dispositivo_id: "Id_para_Test2" } )
            await laLogica.insertarMedicion( {Vgas: 12.45, Vtemp: 22.45, fecha: '2023-10-15 21:00:00', dispositivo_id: "Id_para_Test3" } )
            await laLogica.insertarMedicion( {Vgas: 13.45, Vtemp: 23.45, fecha: '2023-10-15 22:00:00', dispositivo_id: "Id_para_Test4" } )
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco la medida mas reciente",
        async function() {
            var res = await laLogica.getUltimaMedicion()
                assert.equal( res.length, 1, "¿no hay un resulado?" )
                assert.equal( res[0].fecha, '2023-10-15 22:00:00', "¿no es 2023-10-15 22:00:00?" )
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco todas las medidas",
        async function() {
            var res = await laLogica.getTodasLasMediciones()
                assert.equal( res.length, 4, "¿no hay cuatro resulados?" )
                assert.equal( res[0].fecha, '2023-10-15 19:00:00', "¿no es 2023-10-15 19:00:00?" )
                assert.equal( res[1].fecha, '2023-10-15 20:00:00', "¿no es 2023-10-15 20:00:00?" )
                assert.equal( res[2].fecha, '2023-10-15 21:00:00', "¿no es 2023-10-15 21:00:00?" )
                assert.equal( res[3].fecha, '2023-10-15 22:00:00', "¿no es 2023-10-15 22:00:00?" )
    }) // it
    // ....................................................
    // ....................................................
    it( "Busco las medidas entre unas determinadas fechas",
        async function() {
            var res = await laLogica.buscarMedicionesEntreFechas('2023-10-15 19:30:00', '2023-10-15 22:00:00')
                assert.equal( res.length, 3, "¿no hay dos resulados?" )
                assert.equal( res[0].fecha, '2023-10-15 20:00:00', "¿no es 2023-10-15 20:00:00?" )
                assert.equal( res[1].fecha, '2023-10-15 21:00:00', "¿no es 2023-10-15 21:00:00?" )
                assert.equal( res[2].fecha, '2023-10-15 22:00:00', "¿no es 2023-10-15 22:00:00?" )
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