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
    // POST /borrarPersonas/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarTodasLasTablas',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarTodasLasTablas ")

            await laLogica.borrarTodasLasTablas()

            // todo ok
            respuesta.send("Filas borradas de todas las tablas")
        }) //
    // .......................................................
    // .......................................................
    // ..................<<recursos>>.........................
    // ....................medicion...........................
    // .......................................................
    // .......................................................

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
            respuesta.send(JSON.stringify(res))
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

            var res = await laLogica.getMedicionesEntreFechas(fechaInicio, fechaFin)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no existen mediciones entre esas fechas")
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res))
        }) // get /matricula
    // .......................................................
    // GET /medicionEntreFechasYDispositivo/<fechaInicio, fechaFin, dispositivo_id>
    // .......................................................
    servidorExpress.get(
        '/medicionEntreFechasYDispositivo/:fechaInicio/:fechaFin/:dispositivo_id',
        async function (peticion, respuesta) {
            console.log(" * GET /medicionEntreFechasYDispositivo ")

            var fechaInicio = peticion.params.fechaInicio
            var fechaFin = peticion.params.fechaFin
            var dispositivo_id = peticion.params.dispositivo_id

            var res = await laLogica.getMedicionesEntreFechasYDispositivo(fechaInicio, fechaFin, dispositivo_id)

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
    // GET /medicionTipoValor/<tipo_valor>
    // .......................................................
    servidorExpress.get(
        '/medicionTipoValor/:tipo_valor',
        async function (peticion, respuesta) {
            console.log(" * GET /medicionTipoValor ")

            var tipo_valor = peticion.params.tipo_valor

            var res = await laLogica.getMedicionesPorTipoValor(tipo_valor)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no existen mediciones entre esas fechas")
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res))
        }) // get /matricula
    // .......................................................
    // GET /medicionAdmin/<dni_admin>
    // .......................................................
    servidorExpress.get(
        '/medicionAdmin/:dni_admin',
        async function (peticion, respuesta) {
            console.log(" * GET /medicionAdmin ")

            var dni_admin = peticion.params.dni_admin

            var res = await laLogica.getMedicionesPorAdmin(dni_admin)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no existen mediciones entre esas fechas")
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

            await laLogica.borrarMedicionesPorDispositivo(datos.dispositivo_id)

            // todo ok
            respuesta.send("Filas borradas de la tabla Medicion con dispositivo_id: " + datos.dispositivo_id)
        }) // post /borrarMediciones
    // .......................................................
    // POST /borrarMedicionesEntreFechas/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarMedicionesEntreFechas',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarMedicionesEntreFechas ")

            var datos = JSON.parse(peticion.body)
            console.log(datos.fechaInicio + "EEEEE" + datos.fechaFin)
            await laLogica.borrarMedicionesEntreFechas(datos.fechaInicio, datos.fechaFin)

            // todo ok
            respuesta.send("Filas borradas de la tabla Medicion entre las fechas: " + datos.fechaInicio + "y" + datos.fechaFin)
        }) // post /borrarMediciones
    // ..............................................................................................................
    // ..............................................................................................................

    // .......................................................
    // .......................................................
    // ..................<<recursos>>.........................
    // .....................admin.............................
    // .......................................................
    // .......................................................

    // .......................................................
    // .......................................................
    // .......................GET.............................
    // .......................................................
    // .......................................................
    // .......................................................
    // GET /admin/<dni_admin>
    // .......................................................
    servidorExpress.get(
        '/admin/:dni_admin',
        async function (peticion, respuesta) {
            console.log(" * GET /admin/:dni_admin ")
            // averiguo el dni
            var dni_admin = peticion.params.dni_admin
            console.log(dni_admin)
            // llamo a la función adecuada de la lógica
            var res = await laLogica.getAdminPorDNI(dni_admin)
            // si el array de resultados no tiene una casilla ...
            console.log(res.length)
            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré el admin con dni_admin: " + dni_admin)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res[0]))
        }) //
    // .......................................................
    // GET /adminCorreo/<correo>
    // .......................................................
    servidorExpress.get(
        '/adminCorreo/:correo',
        async function (peticion, respuesta) {
            console.log(" * GET /adminCorreo/:correo ")
            // averiguo el dni
            var correo = peticion.params.correo
            // llamo a la función adecuada de la lógica
            var res = await laLogica.getAdminPorCorreo(correo)
            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré el admin con correo: " + correo)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res[0]))
        }) //
    // .......................................................
    // GET /todosAdmins/
    // .......................................................
    servidorExpress.get(
        '/todosAdmins/',
        async function (peticion, respuesta) {
            console.log(" * GET /todosAdmins ")

            var res = await laLogica.getTodosLosAdmins()

            console.log(res)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no existen admins")
                return
            }

            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // GET /adminDispositivo/<dispositivo_id>
    // .......................................................
    servidorExpress.get(
        '/adminDispositivo/:dispositivo_id',
        async function (peticion, respuesta) {
            console.log(" * GET /adminDispositivo/:dispositivo_id ")

            var dispositivo_id = peticion.params.dispositivo_id

            var res = await laLogica.getAdminPorDispositivo(dispositivo_id)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré el admin con dispositivo_id: " + dispositivo_id)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // GET /adminZona/<zona>
    // .......................................................
    servidorExpress.get(
        '/adminZona/:zona',
        async function (peticion, respuesta) {
            console.log(" * GET /adminZona/:zona ")

            var zona = peticion.params.zona

            var res = await laLogica.getAdminPorZona(zona)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré el admin con zona: " + zona)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // .......................................................
    // .......................POST............................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /admin/<datos>
    // .......................................................
    servidorExpress.post(
        '/admin',
        async function (peticion, respuesta) {
            console.log(" * POST /admin ")

            var datos = JSON.parse(peticion.body)

            await laLogica.insertarAdmin(datos)

            var res = await laLogica.getAdminPorDNI(datos.dni_admin)

            if (res.length != 1) {
                // 404: not found
                respuesta.status(404).send("No se creo el admin.")
                return
            }
            // todo ok
            respuesta.send("Admin añadido correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................UPDATE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /actualizarAdmin/<datos>
    // .......................................................
    servidorExpress.post(
        '/actualizarAdmin',
        async function (peticion, respuesta) {
            console.log(" * POST /actualizarAdmin ")

            var datos = JSON.parse(peticion.body)

            await laLogica.actualizarAdmin(datos)

            var res = await laLogica.getAdminPorDNI(datos.dni_admin)

            if (res.length != 1 && datos != res) {
                // 404: not found
                respuesta.status(404).send("No se actualizó el admin.")
                return
            }
            // todo ok
            respuesta.send("Admin actualizado correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................DELETE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /borrarAdmins/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarAdmins',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarAdmins ")

            await laLogica.borrarAdmins()

            // todo ok
            respuesta.send("Filas borradas de la tabla Admin")
        }) // post /borrarMediciones
    // .......................................................
    // POST /borrarAdminPorDNI/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarAdminPorDNI',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarAdminPorDNI ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarAdminPorDNI(datos.dni_admin)

            // todo ok
            respuesta.send("Filas borradas de la tabla Admin con dni_admin: " + datos.dni_admin)
        }) //
    // ..............................................................................................................
    // ..............................................................................................................

    // .......................................................
    // .......................................................
    // ..................<<recursos>>.........................
    // .....................persona...........................
    // .......................................................
    // .......................................................

    // .......................................................
    // .......................................................
    // .......................GET.............................
    // .......................................................
    // .......................................................
    // .......................................................
    // GET /persona/<dni>
    // .......................................................
    servidorExpress.get(
        '/persona/:dni',
        async function (peticion, respuesta) {
            console.log(" * GET /persona/:dni ")
            // averiguo el dni
            var dni = peticion.params.dni
            // llamo a la función adecuada de la lógica
            var res = await laLogica.getPersonaPorDNI(dni)
            // si el array de resultados no tiene una casilla ...
            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré la persona con dni: " + dni)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res[0]))
        }) //
    // .......................................................
    // GET /personasApellidos/<apellidos>
    // .......................................................
    servidorExpress.get(
        '/personasApellidos/:apellidos',
        async function (peticion, respuesta) {
            console.log(" * GET /personasApellidos/:apellidos ")
            // averiguo el dni
            var apellidos = peticion.params.apellidos
            // llamo a la función adecuada de la lógica
            var res = await laLogica.getPersonasPorApellidos(apellidos)
            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré las personas con apellidos: " + apellidos)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res[0]))
        }) //
    // .......................................................
    // GET /todasPersonas/
    // .......................................................
    servidorExpress.get(
        '/todasPersonas/',
        async function (peticion, respuesta) {
            console.log(" * GET /todasPersonas ")

            var res = await laLogica.getTodasLasPersonas()

            console.log(res)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no existen personas")
                return
            }

            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // GET /personaDispositivo/<dispositivo_id>
    // .......................................................
    servidorExpress.get(
        '/personaDispositivo/:dispositivo_id',
        async function (peticion, respuesta) {
            console.log(" * GET /personaDispositivo/:dispositivo_id ")

            var dispositivo_id = peticion.params.dispositivo_id

            var res = await laLogica.getPersonaPorDispositivo(dispositivo_id)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré la persona con dispositivo_id: " + dispositivo_id)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // GET /personaZona/<zona>
    // .......................................................
    servidorExpress.get(
        '/personaZona/:zona',
        async function (peticion, respuesta) {
            console.log(" * GET /personaZona/:zona ")

            var zona = peticion.params.zona

            var res = await laLogica.getPersonasPorZona(zona)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré las personas con zona: " + zona)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // .......................................................
    // .......................POST............................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /persona/<datos>
    // .......................................................
    servidorExpress.post(
        '/persona',
        async function (peticion, respuesta) {
            console.log(" * POST /persona ")

            var datos = JSON.parse(peticion.body)

            await laLogica.insertarPersona(datos)

            var res = await laLogica.getPersonaPorDNI(datos.dni)

            if (res.length != 1) {
                // 404: not found
                respuesta.status(404).send("No se creo la persona.")
                return
            }
            // todo ok
            respuesta.send("Persona añadida correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................UPDATE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /actualizarPersona/<datos>
    // .......................................................
    servidorExpress.post(
        '/actualizarPersona',
        async function (peticion, respuesta) {
            console.log(" * POST /actualizarPersona ")

            var datos = JSON.parse(peticion.body)

            await laLogica.actualizarPersona(datos)

            var res = await laLogica.getPersonaPorDNI(datos.dni)

            if (res.length != 1 && datos != res) {
                // 404: not found
                respuesta.status(404).send("No se actualizó la persona.")
                return
            }
            // todo ok
            respuesta.send("Persona actualizada correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................DELETE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /borrarPersonas/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarPersonas',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarPersonas ")

            await laLogica.borrarPersonas()

            // todo ok
            respuesta.send("Filas borradas de la tabla Persona")
        }) //
    // .......................................................
    // POST /borrarPersonaPorDNI/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarPersonaPorDNI',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarPersonaPorDNI ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarPersonaPorDNI(datos.dni)

            // todo ok
            respuesta.send("Filas borradas de la tabla Persona con dni: " + datos.dni)
        }) //
    // .......................................................
    // POST /borrarPersonaPorDispositivo/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarPersonaPorDispositivo',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarPersonaPorDispositivo ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarPersonaPorDispositivo(datos.dispositivo_id)

            // todo ok
            respuesta.send("Filas borradas de la tabla Persona con dni: " + datos.dispositivo_id)
        }) //
    // ..............................................................................................................
    // ..............................................................................................................

    // .......................................................
    // .......................................................
    // ..................<<recursos>>.........................
    // ...................direccion...........................
    // .......................................................
    // .......................................................

    // .......................................................
    // .......................................................
    // .......................GET.............................
    // .......................................................
    // .......................................................
    // .......................................................
    // GET /direccion/<dni>
    // .......................................................
    servidorExpress.get(
        '/direccion/:dni',
        async function (peticion, respuesta) {
            console.log(" * GET /direccion/:dni ")
            // averiguo el dni
            var dni = peticion.params.dni
            // llamo a la función adecuada de la lógica
            var res = await laLogica.getDireccionPorDNI(dni)
            // si el array de resultados no tiene una casilla ...
            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré la direccion con dni: " + dni)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res[0]))
        }) //
    // .......................................................
    // GET /direccionCP/<CP>
    // .......................................................
    servidorExpress.get(
        '/direccionCP/:cp',
        async function (peticion, respuesta) {
            console.log(" * GET /direccionCP/:cp ")
            // averiguo el dni
            var cp = peticion.params.cp
            // llamo a la función adecuada de la lógica
            var res = await laLogica.getDireccionesPorCodigoPostal(cp)
            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré las direcciones con cp: " + cp)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // GET /todasDirecciones/
    // .......................................................
    servidorExpress.get(
        '/todasDirecciones/',
        async function (peticion, respuesta) {
            console.log(" * GET /todasDirecciones ")

            var res = await laLogica.getTodasLasDirecciones()

            console.log(res)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no existen direcciones")
                return
            }

            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // GET /direccionCCAA/<ccaa>
    // .......................................................
    servidorExpress.get(
        '/direccionCCAA/:ccaa',
        async function (peticion, respuesta) {
            console.log(" * GET /direccionCCAA/:ccaa ")

            var ccaa = peticion.params.ccaa

            var res = await laLogica.getDireccionesPorCCAA(ccaa)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré la direccion con ccaa: " + ccaa)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // GET /direccionProvincia/<provincia>
    // .......................................................
    servidorExpress.get(
        '/direccionProvincia/:provincia',
        async function (peticion, respuesta) {
            console.log(" * GET /direccionProvincia/:provincia ")

            var provincia = peticion.params.provincia

            var res = await laLogica.getDireccionesPorProvincia(provincia)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré las personas con provincia: " + provincia)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // .......................................................
    // .......................POST............................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /direccion/<datos>
    // .......................................................
    servidorExpress.post(
        '/direccion',
        async function (peticion, respuesta) {
            console.log(" * POST /direccion ")

            var datos = JSON.parse(peticion.body)

            await laLogica.insertarDireccion(datos)

            var res = await laLogica.getDireccionPorDNI(datos.dni)

            if (res.length != 1) {
                // 404: not found
                respuesta.status(404).send("No se creo la direccion.")
                return
            }
            // todo ok
            respuesta.send("Direccion añadida correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................UPDATE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /actualizarDireccion/<datos>
    // .......................................................
    servidorExpress.post(
        '/actualizarDireccion',
        async function (peticion, respuesta) {
            console.log(" * POST /actualizarDireccion ")

            var datos = JSON.parse(peticion.body)

            await laLogica.actualizarDireccion(datos)

            var res = await laLogica.getDireccionPorDNI(datos.dni)

            if (res.length != 1 && datos != res) {
                // 404: not found
                respuesta.status(404).send("No se actualizó la direccion.")
                return
            }
            // todo ok
            respuesta.send("Direccion actualizada correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................DELETE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /borrarPersonas/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarDirecciones',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarDirecciones ")

            await laLogica.borrarDirecciones()

            // todo ok
            respuesta.send("Filas borradas de la tabla Direccion")
        }) //
    // .......................................................
    // POST /borrarDireccionPorDNI/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarDireccionPorDNI',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarDireccionPorDNI ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarDireccionPorDNI(datos.dni)

            // todo ok
            respuesta.send("Filas borradas de la tabla Direccion con dni: " + datos.dni)
        }) //
    // .......................................................
    // POST /borrarDireccionesPorZona/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarDireccionesPorZona',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarDireccionesPorZona ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarDireccionesPorZona(datos.zona)

            // todo ok
            respuesta.send("Filas borradas de la tabla Direccion con zona: " + datos.zona)
        }) //
    // ..............................................................................................................
    // ..............................................................................................................

    // .......................................................
    // .......................................................
    // ..................<<recursos>>.........................
    // .....................anuncio...........................
    // .......................................................
    // .......................................................

    // .......................................................
    // .......................................................
    // .......................GET.............................
    // .......................................................
    // .......................................................
    // .......................................................
    // GET /anuncioAdmin/<dni_admin>
    // .......................................................
    servidorExpress.get(
        '/anuncioAdmin/:dni_admin',
        async function (peticion, respuesta) {
            console.log(" * GET /anuncioAdmin/:dni_admin ")
            // averiguo el dni
            var dni_admin = peticion.params.dni_admin
            // llamo a la función adecuada de la lógica
            var res = await laLogica.getAnunciosPorAdmin(dni_admin)
            // si el array de resultados no tiene una casilla ...
            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré los anuncios con dni_admin: " + dni_admin)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // GET /anuncioDispositivo/<dispositivo_id>
    // .......................................................
    servidorExpress.get(
        '/anuncioDispositivo/:dispositivo_id',
        async function (peticion, respuesta) {
            console.log(" * GET /anuncioDispositivo/:dispositivo_id ")
            // averiguo el dni
            var dispositivo_id = peticion.params.dispositivo_id
            // llamo a la función adecuada de la lógica
            var res = await laLogica.getAnunciosPorDispositivo(dispositivo_id)
            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré los anuncios con dispositivo_id: " + dispositivo_id)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // GET /todosAnuncios/
    // .......................................................
    servidorExpress.get(
        '/todosAnuncios/',
        async function (peticion, respuesta) {
            console.log(" * GET /todosAnuncios ")

            var res = await laLogica.getTodosLosAnuncios()

            console.log(res)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no existen anuncios")
                return
            }

            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // .......................................................
    // .......................POST............................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /anuncio/<datos>
    // .......................................................
    servidorExpress.post(
        '/anuncio',
        async function (peticion, respuesta) {
            console.log(" * POST /anuncio ")

            var datos = JSON.parse(peticion.body)

            await laLogica.insertarAnuncio(datos)

            /*var res = await laLogica.getDireccionPorDNI(datos.dni)

            if (res.length != 1) {
                // 404: not found
                respuesta.status(404).send("No se creo la direccion.")
                return
            }*/
            // todo ok
            respuesta.send("Anuncio añadida correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................UPDATE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /actualizarAnuncio/<datos>
    // .......................................................
    servidorExpress.post(
        '/actualizarAnuncio',
        async function (peticion, respuesta) {
            console.log(" * POST /actualizarAnuncio ")

            var datos = JSON.parse(peticion.body)

            await laLogica.actualizarAnuncio(datos)

            /*var res = await laLogica.getDireccionPorDNI(datos.dni)

            if (res.length != 1 && datos != res) {
                // 404: not found
                respuesta.status(404).send("No se actualizó la direccion.")
                return
            }*/
            // todo ok
            respuesta.send("Anuncio actualizada correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................DELETE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /borrarAnuncios/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarAnuncios',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarAnuncios ")

            await laLogica.borrarDirecciones()

            // todo ok
            respuesta.send("Filas borradas de la tabla Anuncio")
        }) //
    // .......................................................
    // POST /borrarDireccionPorDNI/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarAnunciosPorAdmin',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarAnunciosPorAdmin ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarAnunciosPorAdmin(datos.dni_admin)

            // todo ok
            respuesta.send("Filas borradas de la tabla Anuncio con dni_admin: " + datos.dni_admin)
        }) //
    // .......................................................
    // POST /borrarAnunciosPorDispositivo/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarAnunciosPorDispositivo',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarAnunciosPorDispositivo ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarAnunciosPorDispositivo(datos.dispositivo_id)

            // todo ok
            respuesta.send("Filas borradas de la tabla Anuncio con dispositivo_id: " + datos.dispositivo_id)
        }) //
    // .......................................................
    // POST /borrarAnuncioPorId/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarAnuncioPorId',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarAnuncioPorId ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarAnuncioPorId(datos.anuncio_id)

            // todo ok
            respuesta.send("Filas borradas de la tabla Anuncio con anuncio_id: " + datos.anuncio_id)
        }) //
    // ..............................................................................................................
    // ..............................................................................................................

    // .......................................................
    // .......................................................
    // ..................<<recursos>>.........................
    // ..................dispositivo..........................
    // .......................................................
    // .......................................................

    // .......................................................
    // .......................................................
    // .......................GET.............................
    // .......................................................
    // .......................................................
    // .......................................................
    // GET /dispositivo/<dni>
    // .......................................................
    servidorExpress.get(
        '/dispositivo/:dni',
        async function (peticion, respuesta) {
            console.log(" * GET /dispositivo/:dni ")
            // averiguo el dni
            var dni = peticion.params.dni
            console.log("Dispositivo busco dni:" + dni)
            // llamo a la función adecuada de la lógica
            var res = await laLogica.getDispositivoPorPersona(dni)
            console.log("Dispositivo busco res:" + res.length)
            // si el array de resultados no tiene una casilla ...
            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré el dispositivo con dni: " + dni)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res[0]))
        }) //
    // .......................................................
    // GET /dispositivoAdmin/<dni_admin>
    // .......................................................
    servidorExpress.get(
        '/dispositivoAdmin/:dni_admin',
        async function (peticion, respuesta) {
            console.log(" * GET /dispositivoAdmin/:dni_admin ")
            // averiguo el dni
            var dni_admin = peticion.params.dni_admin
            // llamo a la función adecuada de la lógica
            var res = await laLogica.getDispositivosPorAdmin(dni_admin)
            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré los dispositivos con dni_admin: " + dni_admin)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res[0]))
        }) //
    // .......................................................
    // GET /todosDispositivos/
    // .......................................................
    servidorExpress.get(
        '/todosDispositivos/',
        async function (peticion, respuesta) {
            console.log(" * GET /todosDispositivos ")

            var res = await laLogica.getTodosLosDispositivos()

            console.log(res)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no existen dispositivos")
                return
            }

            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // GET /dispositivoZona/<zona>
    // .......................................................
    servidorExpress.get(
        '/dispositivoZona/:zona',
        async function (peticion, respuesta) {
            console.log(" * GET /dispositivoZona/:zona ")

            var zona = peticion.params.zona

            var res = await laLogica.getDispositivosPorZona(zona)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré los dispositivos con zona: " + zona)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // GET /dispositivoMedicion/<medicion_id>
    // .......................................................
    servidorExpress.get(
        '/dispositivoMedicion/:medicion_id',
        async function (peticion, respuesta) {
            console.log(" * GET /dispositivoMedicion/:medicion_id ")

            var medicion_id = peticion.params.medicion_id

            var res = await laLogica.getDispositivosPorMedicion(medicion_id)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré los dispositivos con medicion_id: " + medicion_id)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // .......................................................
    // .......................POST............................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /dispositivo/<datos>
    // .......................................................
    servidorExpress.post(
        '/dispositivo',
        async function (peticion, respuesta) {
            console.log(" * POST /dispositivo ")

            var datos = JSON.parse(peticion.body)
            
            await laLogica.insertarDispositivo(datos)
            
            var res = await laLogica.getDispositivoPorPersona(datos.dni_empleado)

            if (res.length != 1) {
                // 404: not found
                respuesta.status(404).send("No se creo el dispositivo.")
                return
            }
            // todo ok
            respuesta.send("Dispositivo añadido correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................UPDATE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /actualizarDispositivo/<datos>
    // .......................................................
    servidorExpress.post(
        '/actualizarDispositivo',
        async function (peticion, respuesta) {
            console.log(" * POST /actualizarDispositivo ")

            var datos = JSON.parse(peticion.body)

            await laLogica.actualizarDispositivo(datos)

            var res = await laLogica.getDispositivoPorPersona(datos.dni_empleado)

            if (res.length != 1 && datos != res) {
                // 404: not found
                respuesta.status(404).send("No se actualizó el dispositivo.")
                return
            }
            // todo ok
            respuesta.send("Dispositivo actualizado correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................DELETE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /borrarDispositivos/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarDispositivos',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarDispositivos ")

            await laLogica.borrarDispositivos()

            // todo ok
            respuesta.send("Filas borradas de la tabla Dispositivo")
        }) //
    // .......................................................
    // POST /borrarDispositivoPorId/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarDispositivoPorId',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarDispositivoPorId ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarDispositivoPorId(datos.dispositivo_id)

            // todo ok
            respuesta.send("Filas borradas de la tabla Dispositivo con dispositivo_id: " + datos.dispositivo_id)
        }) //
    // .......................................................
    // POST /borrarDispositivoPorPersona/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarDispositivoPorPersona',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarDispositivoPorPersona ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarDispositivoPorPersona(datos.dni_empleado)

            // todo ok
            respuesta.send("Filas borradas de la tabla Dispositivo con dni: " + datos.dni_empleado)
        }) //
    // .......................................................
    // POST /borrarDispositivoPorAdmin/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarDispositivosPorAdmin',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarDispositivosPorAdmin ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarDispositivosPorAdmin(datos.dni_admin)

            // todo ok
            respuesta.send("Filas borradas de la tabla Dispositivo con dni_admin: " + datos.dni_admin)
        }) //
    // ..............................................................................................................
    // ..............................................................................................................

    // .......................................................
    // .......................................................
    // ..................<<recursos>>.........................
    // ....................tipoValor..........................
    // .......................................................
    // .......................................................

    // .......................................................
    // .......................................................
    // .......................GET.............................
    // .......................................................
    // .......................................................
    // .......................................................
    // GET /todosTipoValor/
    // .......................................................
    servidorExpress.get(
        '/todosTipoValor/',
        async function (peticion, respuesta) {
            console.log(" * GET /todosTipoValor ")

            var res = await laLogica.getTodosLosTipoValor()

            console.log(res)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no existen tipos de valores")
                return
            }

            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // .......................................................
    // .......................POST............................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /tipoValor/<datos>
    // .......................................................
    servidorExpress.post(
        '/tipoValor',
        async function (peticion, respuesta) {
            console.log(" * POST /tipoValor ")

            var datos = JSON.parse(peticion.body)

            await laLogica.insertarTipoValor(datos)

            /*var res = await laLogica.getDispositivoPorPersona(datos.dni)

            if (res.length != 1) {
                // 404: not found
                respuesta.status(404).send("No se creo el tipoValor.")
                return
            }*/
            // todo ok
            respuesta.send("TipoValor añadido correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................DELETE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /borrarTiposValor/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarTiposValor',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarTiposValor ")

            await laLogica.borrarTiposValor()

            // todo ok
            respuesta.send("Filas borradas de la tabla TipoValor")
        }) //
    // .......................................................
    // POST /borrarTipoValor/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarTipoValor',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarTipoValor ")

            var datos = JSON.parse(peticion.body)
            console.log(datos.tipo_valor)
            await laLogica.borrarTipoValor(datos.tipo_valor)

            // todo ok
            respuesta.send("Filas borradas de la tabla TipoValor con tipo_valor: " + datos.tipo_valor)
        }) //
    // ..............................................................................................................
    // ..............................................................................................................

    // .......................................................
    // .......................................................
    // ..................<<recursos>>.........................
    // ...................zona_admin..........................
    // .......................................................
    // .......................................................

    // .......................................................
    // .......................................................
    // .......................GET.............................
    // .......................................................
    // .......................................................
    // .......................................................
    // GET /zona/<dni_admin>
    // .......................................................
    servidorExpress.get(
        '/zona/:dni_admin',
        async function (peticion, respuesta) {
            console.log(" * GET /zona/:dni_admin ")
            // averiguo el dni
            var dni_admin = peticion.params.dni_admin
            // llamo a la función adecuada de la lógica
            var res = await laLogica.getZonaPorDNI(dni_admin)
            // si el array de resultados no tiene una casilla ...
            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no encontré la zona con dni_admin: " + dni_admin)
                return
            }
            // todo ok
            respuesta.send(JSON.stringify(res[0]))
        }) //
    // .......................................................
    // GET /todasZonas/
    // .......................................................
    servidorExpress.get(
        '/todasZonas/',
        async function (peticion, respuesta) {
            console.log(" * GET /todasZonas ")

            var res = await laLogica.getTodasLasZonas()

            console.log(res)

            if (res.length < 1) {
                // 404: not found
                respuesta.status(404).send("no existen zonas")
                return
            }

            // todo ok
            respuesta.send(JSON.stringify(res))
        }) //
    // .......................................................
    // .......................................................
    // .......................POST............................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /zona/<datos>
    // .......................................................
    servidorExpress.post(
        '/zona',
        async function (peticion, respuesta) {
            console.log(" * POST /zona ")

            var datos = JSON.parse(peticion.body)

            await laLogica.insertarZonaAdmin(datos)

            var res = await laLogica.getZonaPorDNI(datos.dni_admin)

            if (res.length != 1) {
                // 404: not found
                respuesta.status(404).send("No se creo la zona.")
                return
            }
            // todo ok
            respuesta.send("Zona añadida correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................UPDATE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /actualizarZona/<datos>
    // .......................................................
    servidorExpress.post(
        '/actualizarZona',
        async function (peticion, respuesta) {
            console.log(" * POST /actualizarZona ")

            var datos = JSON.parse(peticion.body)

            await laLogica.actualizarZonaAdmin(datos)

            var res = await laLogica.getZonaPorDNI(datos.dni_admin)

            if (res.length != 1 && datos != res) {
                // 404: not found
                respuesta.status(404).send("No se actualizó la zona.")
                return
            }
            // todo ok
            respuesta.send("Zona actualizado correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................DELETE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /borrarTodasLasZonas/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarTodasLasZonas',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarTodasLasZonas ")

            await laLogica.borrarTodasLasZonas()

            // todo ok
            respuesta.send("Filas borradas de la tabla Zona_admin")
        }) //
    // .......................................................
    // POST /borrarZonaPorDNI/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarZonaPorDNI',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarZonaPorDNI ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarZonaPorDNI(datos.dni_admin)

            // todo ok
            respuesta.send("Filas borradas de la tabla Zona_admin con dni_admin: " + datos.dni_admin)
        }) //
    // ..............................................................................................................
    // ..............................................................................................................

    // .......................................................
    // .......................................................
    // ..................<<recursos>>.........................
    // ..................admin_anuncio........................
    // .......................................................
    // .......................................................

    // .......................................................
    // .......................................................
    // .......................POST............................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /admin_anuncio/<datos>
    // .......................................................
    servidorExpress.post(
        '/admin_anuncio',
        async function (peticion, respuesta) {
            console.log(" * POST /admin_anuncio ")

            var datos = JSON.parse(peticion.body)

            await laLogica.insertarAdminAnuncio(datos)

            /*var res = await laLogica.getZonaPorDNI(datos.dni_admin)

            if (res.length != 1) {
                // 404: not found
                respuesta.status(404).send("No se creo la zona.")
                return
            }*/
            // todo ok
            respuesta.send("Admin_anuncio añadida correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................DELETE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /borrarTodosAdminAnuncio/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarTodosAdminAnuncio',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarTodosAdminAnuncio ")

            await laLogica.borrarTodosAdminAnuncio()

            // todo ok
            respuesta.send("Filas borradas de la tabla Admin_anuncio")
        }) //
    // .......................................................
    // POST /borrarAdminAnuncioPorAdmin/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarAdminAnuncioPorAdmin',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarAdminAnuncioPorAdmin ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarAdminAnuncioPorAdmin(datos.dni_admin)

            // todo ok
            respuesta.send("Filas borradas de la tabla Admin_anuncio con dni_admin: " + datos.dni_admin)
        }) //
    // .......................................................
    // POST /borrarAdminAnuncioPorAnuncio/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarAdminAnuncioPorAnuncio',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarAdminAnuncioPorAnuncio ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarAdminAnuncioPorAdmin(datos.anuncio_id)

            // todo ok
            respuesta.send("Filas borradas de la tabla Admin_anuncio con anuncio_id: " + datos.anuncio_id)
        }) //
    // ..............................................................................................................
    // ..............................................................................................................

    // .......................................................
    // .......................................................
    // ..................<<recursos>>.........................
    // ...............dispositivo_anuncio.....................
    // .......................................................
    // .......................................................

    // .......................................................
    // .......................................................
    // .......................POST............................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /dispositivo_anuncio/<datos>
    // .......................................................
    servidorExpress.post(
        '/dispositivo_anuncio',
        async function (peticion, respuesta) {
            console.log(" * POST /dispositivo_anuncio ")

            var datos = JSON.parse(peticion.body)

            await laLogica.insertarDispositivoAnuncio(datos)

            /*var res = await laLogica.getZonaPorDNI(datos.dni_admin)

            if (res.length != 1) {
                // 404: not found
                respuesta.status(404).send("No se creo la zona.")
                return
            }*/
            // todo ok
            respuesta.send("Dispositivo_anuncio añadida correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................DELETE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /borrarTodosDispositivoAnuncio/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarTodosDispositivoAnuncio',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarTodosDispositivoAnuncio ")

            await laLogica.borrarTodosDispositivoAnuncio()

            // todo ok
            respuesta.send("Filas borradas de la tabla Dispositivo_anuncio")
        }) //
    // .......................................................
    // POST /borrarDispositivoAnuncioPorDispositivo/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarDispositivoAnuncioPorDispositivo',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarDispositivoAnuncioPorDispositivo ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarDispositivoAnuncioPorDispositivo(datos.dispositivo_id)

            // todo ok
            respuesta.send("Filas borradas de la tabla Dispositivo_anuncio con dispositivo_id: " + datos.dispositivo_id)
        }) //
    // .......................................................
    // POST /borrarDispositivoAnuncioPorAnuncio/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarDispositivoAnuncioPorAnuncio',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarDispositivoAnuncioPorAnuncio ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarDispositivoAnuncioPorAnuncio(datos.anuncio_id)

            // todo ok
            respuesta.send("Filas borradas de la tabla Dispositivo_anuncio con anuncio_id: " + datos.anuncio_id)
        }) //
    // ..............................................................................................................
    // ..............................................................................................................

    // .......................................................
    // .......................................................
    // ..................<<recursos>>.........................
    // ...............medicion_dispositivo....................
    // .......................................................
    // .......................................................

    // .......................................................
    // .......................................................
    // .......................POST............................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /medicion_dispositivo/<datos>
    // .......................................................
    servidorExpress.post(
        '/medicion_dispositivo',
        async function (peticion, respuesta) {
            console.log(" * POST /medicion_dispositivo ")

            var datos = JSON.parse(peticion.body)

            await laLogica.insertarMedicionDispositivo(datos)

            /*var res = await laLogica.getZonaPorDNI(datos.dni_admin)

            if (res.length != 1) {
                // 404: not found
                respuesta.status(404).send("No se creo la zona.")
                return
            }*/
            // todo ok
            respuesta.send("Medicion_dispositivo añadida correctamente.")
        }) //
    // .......................................................
    // .......................................................
    // ......................DELETE...........................
    // .......................................................
    // .......................................................
    // .......................................................
    // POST /borrarTodosMedicionDispositivo/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarTodosMedicionDispositivo',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarTodosMedicionDispositivo ")

            await laLogica.borrarTodosMedicionDispositivo()

            // todo ok
            respuesta.send("Filas borradas de la tabla Medicion_dispositivo")
        }) //
    // .......................................................
    // POST /borrarMedicionDispositivoPorMedicion/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarMedicionDispositivoPorMedicion',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarMedicionDispositivoPorMedicion ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarMedicionDispositivoPorMedicion(datos.medicion_id)

            // todo ok
            respuesta.send("Filas borradas de la tabla Medicion_dispositivo con medicion_id: " + datos.medicion_id)
        }) //
    // .......................................................
    // POST /borrarMedicionDispositivoPorDispositivo/<tabla>
    // .......................................................
    servidorExpress.post(
        '/borrarMedicionDispositivoPorDispositivo',
        async function (peticion, respuesta) {
            console.log(" * POST /borrarMedicionDispositivoPorDispositivo ")

            var datos = JSON.parse(peticion.body)

            await laLogica.borrarMedicionDispositivoPorDispositivo(datos.dispositivo_id)

            // todo ok
            respuesta.send("Filas borradas de la tabla Medicion_dispositivo con dispositivo_id: " + datos.dispositivo_id)
        }) //
    // ..............................................................................................................
    // ..............................................................................................................
} // cargar()
// .....................................................................
// .....................................................................