// .....................................................................
// ReglasREST.js
// .....................................................................
// .....................................................................
// Hugo Martin Escrihuela
// .....................................................................
module.exports.cargar = function (servidorExpress, laLogica) {
    // .......................................................
    // GET /prueba
    // .......................................................
    servidorExpress.get('/prueba', function (peticion, respuesta) {
        console.log(" * GET /prueba ")
        respuesta.send("¡Funciona!")
    }) // get /prueba
    // .......................................................
    // .......................................................
    // .......................GET.............................
    // .......................................................
    // .......................................................
    // .......................................................
    // GET /medicion/<dispositivo_id>
    // .......................................................
    servidorExpress.get(
        '/medicion/:dispositivo_id',
        async function (peticion, respuesta) {
            console.log(" * GET /medicion/:dispositivo_id ")
            // averiguo el dni
            var dispositivo_id = peticion.params.dispositivo_id
            console.log(dispositivo_id)
            // llamo a la función adecuada de la lógica
            var res = await laLogica.buscarMedicionPorDispositivo(dispositivo_id)
            // si el array de resultados no tiene una casilla ...
            console.log(res.length)
            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré la medicion con dispositivo_id: " + dispositivo_id)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res[0]))
        }) // get /persona
    // .......................................................
    // GET /ultimaMedicion/
    // .......................................................
    servidorExpress.get(
        '/ultimaMedicion/',
        async function (peticion, respuesta) {
            console.log(" * GET /ultimaMedicion ")

            var res = await laLogica.getUltimaMedicion()

            if (res.length != 1) {
                // 404: not found
                respuesta.status(404).send("no encontré la ultima medicion")
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res[0]))
        }) // get /matricula
    // .......................................................
    // GET /medicionEntreFechas/<fechaInicio, fechaFin>
    // .......................................................
    servidorExpress.get(
        '/medicionEntreFechas/:fechaInicio/:fechaFin',
        async function (peticion, respuesta) {
            console.log(" * GET /medicionEntreFechas ")

            var fechaInicio = peticion.params.fechaInicio
            var fechaFin = peticion.params.fechaFin

            var res = await laLogica.buscarMedicionesEntreFechas(fechaInicio, fechaFin)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no existen mediciones entre esas fechas")
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res))
        }) // get /matricula
    // .......................................................
    // GET /todasMediciones/
    // .......................................................
    servidorExpress.get(
        '/todasMediciones/',
        async function (peticion, respuesta) {
            console.log(" * GET /todasMediciones ")

            var res = await laLogica.getTodasLasMediciones()

            console.log(res)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no existen mediciones")
                return
            }

            // todo ok
            respuesta.send(JSON.stringify(res))
        }) // get /matricula
    // .......................................................
    // .......................................................
    // .......................POST............................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /medicion/<datos>
    // .......................................................
    servidorExpress.post(
        '/medicion',
        async function (peticion, respuesta) {
            console.log(" * POST /medicion ")

            var datos = JSON.parse(peticion.body)

            await laLogica.insertarMedicion(datos)

            var res = await laLogica.getUltimaMedicion()

            if (res.length != 1 & datos.fecha == res[0].fecha) {
                // 404: not found
                respuesta.status(404).send("No se creo la medicion.")
                return
            }
            // todo ok
            respuesta.send("Medicion añadida correctamente.")
        }) // post /persona
    // .......................................................
    // .......................................................
    // ......................DELETE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /borrarMediciones/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarMediciones',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarMediciones ")

            await laLogica.borrarMediciones()

            // todo ok
            respuesta.send("Filas borradas de la tabla Medicion")
        }) // post /borrarMediciones
    // .......................................................
    // POST /borrarMedicionesPorDispositivo/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarMedicionesPorDispositivo',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarMedicionesPorDispositivo ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarMediciones(datos.dispositivo_id)

            // todo ok
            respuesta.send("Filas borradas de la tabla Medicion con dispositivo_id: " + datos.dispositivo_id)
        }) // post /borrarMediciones
} // cargar()
// .....................................................................
// .....................................................................