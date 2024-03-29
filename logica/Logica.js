// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require("sqlite3")
// .....................................................................
// Hugo Martin Escrihuela
// .....................................................................
module.exports = class Logica {
    // .................................................................
    // nombreBD: Texto
    // -->
    // constructor () -->
    // .................................................................
    constructor(nombreBD, cb) {
        this.laConexion = new sqlite3.Database(
            nombreBD,
            (err) => {
                if (!err) {
                    this.laConexion.run("PRAGMA foreign_keys = ON")
                }
                cb(err)
            })
    } // ()

    // .................................................................
    // borrarTodasLasTablas() -->
    // .................................................................
    async borrarTodasLasTablas() {
        await this.borrarTodosAdminAnuncio()
        await this.borrarTodosDispositivoAnuncio()
        await this.borrarAnuncios()
        await this.borrarTodosMedicionDispositivo()
        await this.borrarMediciones()
        await this.borrarTiposValor()
        await this.borrarDispositivos()
        await this.borrarDirecciones()
        await this.borrarTodasLasZonas()
        await this.borrarAdmins()
        await this.borrarPersonas()
    } // ()

    // .................................................................
    //
    // <<recurso>>
    // mediciones
    //
    // .................................................................

    // .................................................................
    //  << POST >>
    // .................................................................

    // .................................................................
    // datos:{valor:float, tipo_valor_id:int, fecha:DATETIME, lugar:POINT}
    // -->
    // insertarMedicion() -->
    // .................................................................
    insertarMedicion(datos) {
        var textoSQL =
            'insert into Medicion (valor, tipo_valor_id, fecha, lugar) values( $valor, $tipo_valor_id, $fecha, $lugar );'
        var valoresParaSQL = { $valor: datos.valor, $tipo_valor_id: datos.tipo_valor_id, $fecha: datos.fecha, $lugar: datos.lugar }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << GET >>
    // .................................................................

    // .................................................................
    // dispositivo_id:Texto
    // -->
    // buscarMedicionPorDispositivo() <--
    // <--
    // Lista<{$id:N, $valor:R, $tipo_valor_id:N, $fecha:fecha, $lugar:lugar}>
    // .................................................................
    buscarMedicionPorDispositivo(dispositivo) {
        var textoSQL = "select Medicion.* from Medicion, Medicion_Dispositivo where Medicion.id=Medicion_Dispositivo.medicion_id and Medicion_Dispositivo.dispositivo_id=$dispositivo_id";
        var valoresParaSQL = { $dispositivo_id: dispositivo }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // getUltimaMedicion() <--
    // <--
    // {$id:N, $valor:R, $tipo_valor_id:N, $fecha:fecha, $lugar:lugar}
    // .................................................................
    getUltimaMedicion() {
        var textoSQL = "select * from Medicion order by fecha desc limit 1";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // getTodasLasMediciones() <--
    // <--
    // Lista<{$id:N, $valor:R, $tipo_valor_id:N, $fecha:fecha, $lugar:lugar}>
    // .................................................................
    getTodasLasMediciones() {
        var textoSQL = "select * from Medicion";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // fechaInicio:fecha, fechaFin:fecha
    // -->
    // getMedicionesEntreFechas() <--
    // <--
    // Lista<{$id:N, $valor:R, $tipo_valor_id:N, $fecha:fecha, $lugar:lugar}>
    // .................................................................
    getMedicionesEntreFechas(fechaInicio, fechaFin) {
        var textoSQL = "select * from Medicion where fecha between $fechaInicio and $fechaFin";
        var valoresParaSQL = { $fechaInicio: fechaInicio, $fechaFin: fechaFin }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // fechaInicio:fecha, fechaFin:fecha, tipo_valor:N
    // -->
    // getMedicionesEntreFechasYTipoValor() <--
    // <--
    // Lista<{$id:N, $valor:R, $tipo_valor_id:N, $fecha:fecha, $lugar:lugar}>
    // .................................................................
    getMedicionesEntreFechasYTipoValor(fechaInicio, fechaFin, tipo_valor) {
        var textoSQL = "select Medicion.* from Medicion, TipoValor where Medicion.tipo_valor_id=TipoValor.tipo_valor_id and TipoValor.tipo_valor=$tipo_valor and Medicion.fecha between $fechaInicio and $fechaFin";
        var valoresParaSQL = { $fechaInicio: fechaInicio, $fechaFin: fechaFin, $tipo_valor: tipo_valor }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // fechaInicio:fecha, fechaFin:fecha
    // -->
    // getMedicionesConTipoValorEntreFechas() <--
    // <--
    // Lista<{$id:N, $valor:R, $tipo_valor_id:N, $fecha:fecha, $lugar:lugar, $tipo_valor_id:N, $tipo_valor:tipo_valor}>
    // .................................................................
    getMedicionesConTipoValorEntreFechas(fechaInicio, fechaFin) {
        var textoSQL = "select * from Medicion INNER JOIN TipoValor ON Medicion.tipo_valor_id = TipoValor.tipo_valor_id where fecha between $fechaInicio and $fechaFin";
        var valoresParaSQL = { $fechaInicio: fechaInicio, $fechaFin: fechaFin }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // fechaInicio:fecha, fechaFin:fecha, dispositivo_id:N
    // -->
    // getMedicionesConTipoValorEntreFechas() <--
    // <--
    // Lista<{$id:N, $valor:R, $tipo_valor_id:N, $fecha:fecha, $lugar:lugar, $tipo_valor_id:N, $tipo_valor:tipo_valor}>
    // .................................................................
    getMedicionesConTipoValorEntreFechasYDispositivo(fechaInicio, fechaFin, dispositivo_id) {
        var textoSQL = "select  Medicion.*, TipoValor.* from Medicion INNER JOIN TipoValor ON Medicion.tipo_valor_id = TipoValor.tipo_valor_id INNER JOIN Medicion_Dispositivo ON Medicion.id = Medicion_Dispositivo.medicion_id where fecha between $fechaInicio and $fechaFin AND  Medicion_Dispositivo.dispositivo_id = $dispositivo_id";
        var valoresParaSQL = { $fechaInicio: fechaInicio, $fechaFin: fechaFin, $dispositivo_id: dispositivo_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // fechaInicio:fecha, fechaFin:fecha, dispositivo_id:N
    // -->
    // getMedicionesEntreFechasYDispositivo() <--
    // <--
    // Lista<{$id:N, $valor:R, $tipo_valor_id:N, $fecha:fecha, $lugar:lugar}>
    // .................................................................
    getMedicionesEntreFechasYDispositivo(fechaInicio, fechaFin, dispositivo_id) {
        var textoSQL = "select Medicion.* from Medicion, Medicion_Dispositivo where Medicion.id=Medicion_Dispositivo.medicion_id and Medicion_Dispositivo.dispositivo_id=$dispositivo_id and Medicion.fecha between $fechaInicio and $fechaFin";
        var valoresParaSQL = { $fechaInicio: fechaInicio, $fechaFin: fechaFin, $dispositivo_id: dispositivo_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // tipoValor:texto
    // -->
    // getMedicionesPorTipoValor() <--
    // <--
    // Lista<{$id:N, $valor:R, $tipo_valor_id:N, $fecha:fecha, $lugar:lugar}>
    // .................................................................
    getMedicionesPorTipoValor(tipoValor) {
        var textoSQL = "select Medicion.* from Medicion, TipoValor where Medicion.tipo_valor_id=TipoValor.tipo_valor_id and TipoValor.tipo_valor=$tipo_valor";
        var valoresParaSQL = { $tipo_valor: tipoValor }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // dni_admin:texto
    // -->
    // getMedicionesPorAdmin() <--
    // <--
    // Lista<{$id:N, $valor:R, $tipo_valor_id:N, $fecha:fecha, $lugar:lugar}>
    // .................................................................
    getMedicionesPorAdmin(dni_admin) {
        var textoSQL = "select Medicion.* from Medicion, Medicion_Dispositivo, Dispositivo, Persona, Direccion, Zona_Admin, Admin  where Medicion.id=Medicion_Dispositivo.medicion_id and Medicion_Dispositivo.dispositivo_id=Dispositivo.dispositivo_id and Dispositivo.dni_empleado=Persona.dni and Persona.dni=Direccion.dni and Direccion.codigo_postal=Zona_Admin.zona and Zona_Admin.dni=Admin.dni_admin and Admin.dni_admin=$dni_admin";
        var valoresParaSQL = { $dni_admin: dni_admin }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()


    // .................................................................
    //  << DELETE >>
    // .................................................................

    // .................................................................
    // borrarMediciones() -->
    // .................................................................
    borrarMediciones() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from Medicion;",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // datos:{dispositivo_id:texto, dni_empleado:texto}
    // -->
    // borrarMedicionesPorDispositivo() -->
    // .................................................................
    borrarMedicionesPorDispositivo(datos) {
        var valoresParaSQL = { $dispositivo_id: datos.dispositivo_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from Medicion, Medicion_Dispositivo where Medicion.id=Medicion_Dispositivo.medicion_id and Medicion_Dispositivo.dispositivo_id=$dispositivo_id;",
                valoresParaSQL,
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // fechaInicio:DATETIME, fechaFin:DATETIME
    // -->
    // borrarMedicionesEntreFechas() -->
    // .................................................................
    borrarMedicionesEntreFechas(fechaInicio, fechaFin) {
        var valoresParaSQL = { $fechaInicio: fechaInicio, $fechaFin: fechaFin }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from Medicion where fecha between $fechaInicio and $fechaFin;",
                valoresParaSQL,
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()

    // .................................................................
    //
    // <<recurso>>
    // admin
    //
    // .................................................................

    // .................................................................
    //  << POST >>
    // .................................................................

    // .................................................................
    // datos:{dni_admin:texto, contrasenya:texto}
    // -->
    // insertarAdmin() -->
    // .................................................................
    insertarAdmin(datos) {
        var textoSQL =
            'insert into Admin (dni_admin, contrasenya) values( $dni_admin, $contrasenya );'
        var valoresParaSQL = { $dni_admin: datos.dni_admin, $contrasenya: datos.contrasenya }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << UPDATE >>
    // .................................................................

    // .................................................................
    // datos:{dni_admin:texto, contrasenya:texto}
    // -->
    // actualizarAdmin() -->
    // .................................................................
    actualizarAdmin(datos) {
        var textoSQL =
            'update Admin set contrasenya=$contrasenya where dni_admin=$dni_admin;'
        var valoresParaSQL = { $dni_admin: datos.dni_admin, $contrasenya: datos.contrasenya }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << GET >>
    // .................................................................

    // .................................................................
    // getTodosLosAdmins() <--
    // <--
    // Lista<{$dni_admin:texto, $contrasenya:texto }>
    // .................................................................
    getTodosLosAdmins() {
        var textoSQL = "select * from Admin";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // dni:texto
    // -->    
    // getAdminPorDNI() <--
    // <--
    // {$dni_admin:texto, $contrasenya:texto }
    // .................................................................
    getAdminPorDNI(dni) {
        var textoSQL = "select * from Admin where dni_admin=$dni_admin";
        var valoresParaSQL = { $dni_admin: dni }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // correo:texto
    // -->    
    // getAdminPorCorreo() <--
    // <--
    // {$dni_admin:texto, $contrasenya:texto }
    // .................................................................
    getAdminPorCorreo(correo) {
        var textoSQL = "select * from Admin, Persona where Admin.dni_admin=Persona.dni and Persona.correo=$correo";
        var valoresParaSQL = { $correo: correo }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // dispositivo_id:texto
    // -->    
    // getAdminPorDispositivo() <--
    // <--
    // {$dni_admin:texto, $contrasenya:texto }
    // .................................................................
    getAdminPorDispositivo(dispositivo_id) {
        var textoSQL = "select Admin.* from Admin, Zona_Admin, Direccion, Persona, Dispositivo where Admin.dni_admin=Zona_Admin.dni_admin and Zona_Admin.zona=Direccion.codigo_postal and Direccion.dni=Persona.dni and Persona.dni=Dispositivo.dni_empleado and Dispositivo.dispositivo_id=$dispositivo_id";
        var valoresParaSQL = { $dispositivo_id: dispositivo_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // zona:texto
    // -->    
    // getAdminPorZona() <--
    // <--
    // {$dni_admin:texto, $contrasenya:texto }
    // .................................................................
    getAdminPorZona(zona) {
        var textoSQL = "select Admin.* from Admin, Zona_Admin where Admin.dni_admin=Zona_Admin.dni_admin and Zona_Admin.zona=$zona";
        var valoresParaSQL = { $zona: zona }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()

    // .................................................................
    //  << DELETE >>
    // .................................................................

    // .................................................................
    // borrarAdmins() -->
    // .................................................................
    borrarAdmins() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from Admin;",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // dni:texto
    // --> 
    // borrarAdminPorDNI() -->
    // .................................................................
    borrarAdminPorDNI(dni) {
        var textoSQL = "delete from Admin where dni_admin=$dni;"
        var valoresParaSQL = { $dni: dni }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //
    // <<recurso>>
    // persona
    //
    // .................................................................

    // .................................................................
    //  << POST >>
    // .................................................................

    // .................................................................
    // datos:{dni:texto, nombre:texto, apellidos:texto, correo:texto, telefono:texto}
    // -->
    // insertarPersona() -->
    // .................................................................
    insertarPersona(datos) {
        var textoSQL =
            'insert into Persona (dni, nombre, apellidos, correo, telefono ) values( $dni, $nombre, $apellidos, $correo, $telefono );'
        var valoresParaSQL = { $dni: datos.dni, $nombre: datos.nombre, $apellidos: datos.apellidos, $correo: datos.correo, $telefono: datos.telefono }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << UPDATE >>
    // .................................................................

    // .................................................................
    // datos:{dni:texto, nombre:texto, apellidos:texto, correo:texto, telefono:texto}
    // -->
    // actualizarPersona() -->
    // .................................................................
    actualizarPersona(datos) {
        var textoSQL =
            'update Persona set nombre=$nombre, apellidos=$apellidos, correo=$correo, telefono=$telefono where dni=$dni;'
        var valoresParaSQL = { $dni: datos.dni, $nombre: datos.nombre, $apellidos: datos.apellidos, $correo: datos.correo, $telefono: datos.telefono }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << GET >>
    // .................................................................

    // .................................................................
    // getTodasLasPersonas() <--
    // <--
    // Lista<{dni:texto, nombre:texto, apellidos:texto, correo:texto, telefono:texto}>
    // .................................................................
    getTodasLasPersonas() {
        var textoSQL = "select * from Persona";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // dni:texto
    // -->    
    // getPersonaPorDNI() <--
    // <--
    // {dni:texto, nombre:texto, apellidos:texto, correo:texto, telefono:texto}
    // .................................................................
    getPersonaPorDNI(dni) {
        var textoSQL = "select * from Persona where dni=$dni";
        var valoresParaSQL = { $dni: dni }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // zona:texto
    // -->    
    // getPersonaPorZona() <--
    // <--
    // Lsta<{dni:texto, nombre:texto, apellidos:texto, correo:texto, telefono:texto}>
    // .................................................................
    getPersonasPorZona(zona) {
        var textoSQL = "select Persona.* from Persona, Direccion where Persona.dni=Direccion.dni and Direccion.codigo_postal=$zona";
        var valoresParaSQL = { $zona: zona }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // dispositivo_id:texto
    // -->    
    // getPersonaPorDispositivo() <--
    // <--
    // {dni:texto, nombre:texto, apellidos:texto, correo:texto, telefono:texto}
    // .................................................................
    getPersonaPorDispositivo(dispositivo_id) {
        var textoSQL = "select Persona.* from Persona, Dispositivo where Persona.dni=Dispositivo.dni_empleado and Dispositivo.dispositivo_id=$dispositivo_id";
        var valoresParaSQL = { $dispositivo_id: dispositivo_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // apellidos:texto
    // -->    
    // getPersonaPorApellidos() <--
    // <--
    // {dni:texto, nombre:texto, apellidos:texto, correo:texto, telefono:texto}
    // .................................................................
    getPersonasPorApellidos(apellidos) {
        var textoSQL = "select * from Persona where apellidos=$apellidos";
        var valoresParaSQL = { $apellidos: apellidos }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // anuncio_id:texto
    // -->    
    // getPersonaPorAnuncio() <--
    // <--
    // {dni:texto, nombre:texto, apellidos:texto, correo:texto, telefono:texto}
    // .................................................................
    getPersonaPorAnuncio(anuncio_id) {
        var textoSQL = "select Persona.* from Persona, Dispositivo, Dispositivo_Anuncio where Persona.dni=Dispositivo.dni_empleado and Dispositivo.dispositivo_id=Dispositivo_Anuncio.dispositivo_id and Dispositivo_Anuncio.anuncio_id=$anuncio_id";
        var valoresParaSQL = { $anuncio_id: anuncio_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()

    // .................................................................
    //  << DELETE >>
    // .................................................................

    // .................................................................
    // borrarPersonas() -->
    // .................................................................
    borrarPersonas() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from Persona;",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // dni:texto
    // --> 
    // borrarAdminsPorDNI() -->
    // .................................................................
    borrarPersonaPorDNI(dni) {
        var textoSQL = "delete from Persona where dni=$dni;"
        var valoresParaSQL = { $dni: dni }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // dispositivo_id:texto
    // --> 
    // borrarPersonaPorDispositivo() -->
    // .................................................................
    borrarPersonaPorDispositivo(dispositivo_dni) {
        var textoSQL = "delete Persona.* from Persona, Dispositivo where Persona.dni=Dispositivo.dni_empleado and Dispositivo.dispositivo_id=$dispositivo_id;"
        var valoresParaSQL = { $dispositivo_dni: dispositivo_dni }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //
    // <<recurso>>
    // direccion
    //
    // .................................................................

    // .................................................................
    //  << POST >>
    // .................................................................

    // .................................................................
    // datos:{dni:texto, codigo_postal:texto, ccaa:texto, provincia:texto, calle:texto}
    // -->
    // insertarDireccion() -->
    // .................................................................
    insertarDireccion(datos) {
        var textoSQL =
            'insert into Direccion (dni, codigo_postal, ccaa, provincia, calle ) values( $dni, $codigo_postal, $ccaa, $provincia, $calle );'
        var valoresParaSQL = { $dni: datos.dni, $codigo_postal: datos.codigo_postal, $ccaa: datos.ccaa, $provincia: datos.provincia, $calle: datos.calle }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << UPDATE >>
    // .................................................................

    // .................................................................
    // datos:{dni:texto, codigo_postal:texto, ccaa:texto, provincia:texto, calle:texto}
    // -->
    // actualizarDireccion() -->
    // .................................................................
    actualizarDireccion(datos) {
        var textoSQL =
            'update Direccion set codigo_postal=$codigo_postal, ccaa=$ccaa, provincia=$provincia, calle=$calle where dni=$dni;'
        var valoresParaSQL = { $dni: datos.dni, $codigo_postal: datos.codigo_postal, $ccaa: datos.ccaa, $provincia: datos.provincia, $calle: datos.calle }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << GET >>
    // .................................................................

    // .................................................................
    // getTodasLasDirecciones() <--
    // <--
    // Lista<{dni:texto, codigo_postal:texto, ccaa:texto, provincia:texto, calle:texto}>
    // .................................................................
    getTodasLasDirecciones() {
        var textoSQL = "select * from Direccion";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // dni:texto
    // -->    
    // getDireccionPorDNI() <--
    // <--
    // {dni:texto, codigo_postal:texto, ccaa:texto, provincia:texto, calle:texto}
    // .................................................................
    getDireccionPorDNI(dni) {
        var textoSQL = "select * from Direccion where dni=$dni";
        var valoresParaSQL = { $dni: dni }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // cp:texto
    // -->    
    // getDireccionesPorCodigoPostal() <--
    // <--
    // List<{dni:texto, codigo_postal:texto, ccaa:texto, provincia:texto, calle:texto}>
    // .................................................................
    getDireccionesPorCodigoPostal(cp) {
        var textoSQL = "select * from Direccion where codigo_postal=$cp";
        var valoresParaSQL = { $cp: cp }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // ccaa:texto
    // -->    
    // getDireccionesPorCCAA() <--
    // <--
    // List<{dni:texto, codigo_postal:texto, ccaa:texto, provincia:texto, calle:texto}>
    // .................................................................
    getDireccionesPorCCAA(ccaa) {
        var textoSQL = "select * from Direccion where ccaa=$ccaa";
        var valoresParaSQL = { $ccaa: ccaa }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // provincia:texto
    // -->    
    // getDireccionesPorProvincia() <--
    // <--
    // Lista<{dni:texto, codigo_postal:texto, ccaa:texto, provincia:texto, calle:texto}>
    // .................................................................
    getDireccionesPorProvincia(provincia) {
        var textoSQL = "select * from Direccion where provincia=$provincia";
        var valoresParaSQL = { $provincia: provincia }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()

    // .................................................................
    //  << DELETE >>
    // .................................................................

    // .................................................................
    // borrarDirecciones() -->
    // .................................................................
    borrarDirecciones() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from Direccion;",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // dni:texto
    // --> 
    // borrarDireccionPorDNI() -->
    // .................................................................
    borrarDireccionPorDNI(dni) {
        var textoSQL = "delete from Direccion where dni=$dni;"
        var valoresParaSQL = { $dni: dni }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // zona:texto
    // --> 
    // borrarDireccionesPorZona() -->
    // .................................................................
    borrarDireccionesPorZona(zona) {
        var textoSQL = "delete from Direccion where codigo_postal=$zona;"
        var valoresParaSQL = { $zona: zona }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //
    // <<recurso>>
    // anuncio
    //
    // .................................................................

    // .................................................................
    //  << POST >>
    // .................................................................

    // .................................................................
    // datos:{contenido:texto, titulo:texto}
    // -->
    // insertarAnuncio() -->
    // .................................................................
    insertarAnuncio(datos) {
        var textoSQL =
            'insert into Anuncio (contenido, titulo, problemas, estado ) values( $contenido, $titulo, $problemas, $estado );'
        var valoresParaSQL = { $contenido: datos.contenido, $titulo: datos.titulo, $problemas: datos.problemas, $estado: datos.estado }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << UPDATE >>
    // .................................................................

    // .................................................................
    // datos:{anuncio_id:texto, contenido:texto, titulo:texto}
    // -->
    // actualizarAnuncio() -->
    // .................................................................
    actualizarAnuncio(datos) {
        var textoSQL =
            'update Anuncio set contenido=$contenido, titulo=$titulo, problemas=$problemas, estado=$estado where anuncio_id=$anuncio_id;'
        var valoresParaSQL = { $anuncio_id: datos.anuncio_id, $contenido: datos.contenido, $titulo: datos.titulo, $problemas: datos.problemas, $estado: datos.estado }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << GET >>
    // .................................................................

    // .................................................................
    // getTodosLosAnuncios() <--
    // <--
    // Lista<{anuncio_id:texto, contenido:texto, titulo:texto}>
    // .................................................................
    getTodosLosAnuncios() {
        var textoSQL = "select * from Anuncio";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // dni_admin:texto
    // getAnunciosSinLeer() <--
    // <--
    // Lista<{anuncio_id:texto, contenido:texto, titulo:texto}>
    // .................................................................
    getAnunciosSinLeer(dni_admin) {
        var textoSQL = "select Anuncio.* from Anuncio, Admin_Anuncio where Anuncio.anuncio_id=Admin_Anuncio.anuncio_id and Admin_Anuncio.dni_admin=$dni_admin and Anuncio.estado=$noLeido";
        var valoresParaSQL = { $dni_admin: dni_admin, $noLeido: "No leido" }
        return new Promise((resolver, rechazar) => {

            console.log(" * GET /anuncioNoLeido/:dni_admin justo entes de hacer el sql")
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // dni_admin:texto
    // -->    
    // getAnunciosPorAdmin() <--
    // <--
    // Lista<{anuncio_id:texto, contenido:texto, titulo:texto}>
    // .................................................................
    getAnunciosPorAdmin(dni_admin) {
        var textoSQL = "select Anuncio.* from Anuncio, Admin_Anuncio, Admin where Anuncio.anuncio_id=Admin_Anuncio.anuncio_id and Admin_Anuncio.dni_admin=Admin.dni_admin and Admin.dni_admin=$dni_admin";
        var valoresParaSQL = { $dni_admin: dni_admin }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // dispositivo_id:texto
    // -->    
    // getAnunciosPorDispositivo() <--
    // <--
    // List<{anuncio_id:texto, contenido:texto, titulo:texto}>
    // .................................................................
    getAnunciosPorDispositivo(dispositivo_id) {
        var textoSQL = "select Anuncio.* from Anuncio, Dispositivo_Anuncio where Anuncio.anuncio_id=Dispositivo_Anuncio.anuncio_id and Dispositivo_Anuncio.dispositivo_id=$dispositivo_id";
        var valoresParaSQL = { $dispositivo_id: dispositivo_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()

    // .................................................................
    //  << DELETE >>
    // .................................................................

    // .................................................................
    // borrarAnuncios() -->
    // .................................................................
    borrarAnuncios() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from Anuncio;",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // dni_admin:texto
    // -->    
    // borrarAnunciosPorAdmin() <--
    // .................................................................
    borrarAnunciosPorAdmin(dni_admin) {
        var textoSQL = "delete Anuncio.* from Anuncio, Admin_Anuncio, Admin where Anuncio.anuncio_id=Admin_Anuncio.anuncio_id and Anuncio.dni_admin=Admin.dni_admin and Admin.dni_admin=$dni_admin;"
        var valoresParaSQL = { $dni_admin: dni_admin }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // dispositivo_id:texto
    // -->    
    // borrarAnunciosPorDispositivo() <--
    // .................................................................
    borrarAnunciosPorDispositivo(dispositivo_id) {
        var textoSQL = "delete Anuncio.* from Anuncio, Dispositivo_Anuncio where Anuncio.anuncio_id=Dispositivo_Anuncio.anuncio_id and Dispositivo_Anuncio.dispositivo_id=$dispositivo_id;"
        var valoresParaSQL = { $dispositivo_id: dispositivo_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // anuncio_id:texto
    // -->    
    // borrarAnuncioPorId() <--
    // .................................................................
    borrarAnuncioPorId(anuncio_id) {
        var textoSQL = "delete from Anuncio where anuncio_id=$anuncio_id;"
        var valoresParaSQL = { $anuncio_id: anuncio_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //
    // <<recurso>>
    // dispositivo
    //
    // .................................................................

    // .................................................................
    //  << POST >>
    // .................................................................

    // .................................................................
    // datos:{dispositivo_id:texto, dni_empleado:texto}
    // -->
    // insertarDispositivo() -->
    // .................................................................
    insertarDispositivo(datos) {
        var textoSQL =
            'insert into Dispositivo (dispositivo_id, dni_empleado ) values( $dispositivo_id, $dni_empleado );'
        var valoresParaSQL = { $dispositivo_id: datos.dispositivo_id, $dni_empleado: datos.dni_empleado }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << UPDATE >>
    // .................................................................

    // .................................................................
    // datos:{dispositivo_id:texto, dni_empleado:texto}
    // -->
    // actualizarDispositivo() -->
    // .................................................................
    actualizarDispositivo(datos) {
        var textoSQL =
            'update Dispositivo set dni_empleado=$dni_empleado where dispositivo_id=$dispositivo_id;'
        var valoresParaSQL = { $dispositivo_id: datos.dispositivo_id, $dni_empleado: datos.dni_empleado }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << GET >>
    // .................................................................

    // .................................................................
    // getTodosLosDispositivos() <--
    // <--
    // Lista<{dispositivo_id:texto, dni_empleado:texto}>
    // .................................................................
    getTodosLosDispositivos() {
        var textoSQL = "select * from Dispositivo";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // dni:texto
    // -->    
    // getDispositivoPorPersona() <--
    // <--
    // {dispositivo_id:texto, dni_empleado:texto}
    // .................................................................
    getDispositivoPorPersona(dni) {
        var textoSQL = "select Dispositivo.* from Dispositivo, Persona where Dispositivo.dni_empleado=Persona.dni and Persona.dni=$dni";
        var valoresParaSQL = { $dni: dni }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // zona:texto
    // -->    
    // getDispositivosPorZona() <--
    // <--
    // Lista<{dispositivo_id:texto, dni_empleado:texto}>
    // .................................................................
    getDispositivosPorZona(zona) {
        var textoSQL = "select Dispositivo.* from Dispositivo, Persona, Direccion where Dispositivo.dni_empleado=Persona.dni and Persona.dni=Direccion.dni and Direccion.codigo_postal=$zona";
        var valoresParaSQL = { $zona: zona }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // dni_admin:texto
    // -->    
    // getDispositivosPorAdmin() <--
    // <--
    // Lista<{dispositivo_id:texto, dni_empleado:texto}>
    // .................................................................
    getDispositivosPorAdmin(dni_admin) {
        var textoSQL = "select * from Dispositivo, Persona, Direccion, Zona_Admin, Admin where Dispositivo.dni_empleado=Persona.dni and Persona.dni=Direccion.dni and Direccion.codigo_postal=Zona_Admin.zona and Zona_Admin.dni_admin=Admin.dni_admin and Admin.dni_admin=$dni_admin";
        var valoresParaSQL = { $dni_admin: dni_admin }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()
    // .................................................................
    // medicion_id:texto
    // -->    
    // getDispositivoPorMedicion() <--
    // <--
    // {dispositivo_id:texto, dni_empleado:texto}
    // .................................................................
    getDispositivoPorMedicion(medicion_id) {
        var textoSQL = "select Dispositivo.* from Dispositivo, Medicion_Dispositivo where Dispositivo.dni_empleado=Persona.dni and Persona.dni=$dni";
        var valoresParaSQL = { $medicion_id: medicion_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()

    // .................................................................
    //  << DELETE >>
    // .................................................................

    // .................................................................
    // borrarDispositivos() -->
    // .................................................................
    borrarDispositivos() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from Dispositivo;",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // dispositivo_id:texto
    // -->    
    // borrarDispositivoPorId() <--
    // .................................................................
    borrarDispositivoPorId(dispositivo_id) {
        var textoSQL = "delete from Dispositivo where dispositivo_id=$dispositivo_id;"
        var valoresParaSQL = { $dispositivo_id: dispositivo_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // dni_empleado:texto
    // -->    
    // borrarDispositivoPorPersona() <--
    // .................................................................
    borrarDispositivoPorPersona(dni_empleado) {
        var textoSQL = "delete from Dispositivo where dni_empleado=$dni_empleado;"
        var valoresParaSQL = { $dni_empleado: dni_empleado }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // dni_admin:texto
    // -->    
    // borrarDispositivoPorAdmin() <--
    // .................................................................
    borrarDispositivosPorAdmin(dni_admin) {
        var textoSQL = "delete Dispositivo.* from Dispositivo, Persona, Direccion, Zona_Admin, Admin where Dispositivo.dni_empleado=Persona.dni and Persona.dni=Direccion.dni and Direccion.codigo_postal=Zona_Admin.zona and Zona_Admin.dni_admin=Admin.dni_admin and Admin.dni_admin=$dni_admin;"
        var valoresParaSQL = { $dni_admin: dni_admin }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //
    // <<recurso>>
    // tipoValor
    //
    // .................................................................

    // .................................................................
    //  << POST >>
    // .................................................................

    // .................................................................
    // datos:{tipo_valor_id:int, tipo_valor:texto}
    // -->
    // insertarTipoValor() -->
    // .................................................................
    insertarTipoValor(datos) {
        var textoSQL =
            'insert into TipoValor (tipo_valor_id, tipo_valor ) values( $tipo_valor_id, $tipo_valor );'
        var valoresParaSQL = { $tipo_valor_id: datos.tipo_valor_id, $tipo_valor: datos.tipo_valor }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << GET >>
    // .................................................................

    // .................................................................
    // getTodosLosTipoValor() <--
    // <--
    // Lista<{tipo_valor_id:int, tipo_valor:texto}>
    // .................................................................
    getTodosLosTipoValor() {
        var textoSQL = "select * from TipoValor";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()

    // .................................................................
    //  << DELETE >>
    // .................................................................

    // .................................................................
    // borrarTiposValor() -->
    // .................................................................
    borrarTiposValor() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from TipoValor;",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // datos: { tipo_valor_id: texto, tipo_valor: texto }
    // -->
    // borrarTipoValor() -->
    // .................................................................
    borrarTipoValor(datos) {
        var textoSQL = "delete from TipoValor where tipo_valor=$tipo_valor;"
        var valoresParaSQL = { $tipo_valor: datos }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //
    // <<recurso>>
    // Zona_Admin
    //
    // .................................................................

    // .................................................................
    //  << POST >>
    // .................................................................

    // .................................................................
    // datos:{dni_admin:texto, zona:texto}
    // -->
    // insertarZonaAdmin() -->
    // .................................................................
    insertarZonaAdmin(datos) {
        var textoSQL =
            'insert into Zona_Admin (dni_admin, zona ) values( $dni_admin, $zona );'
        var valoresParaSQL = { $dni_admin: datos.dni_admin, $zona: datos.zona }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << UPDATE >>
    // .................................................................

    // .................................................................
    // datos:{dni_admin:texto, zona:texto}
    // -->
    // actualizarZonaAdmin() -->
    // .................................................................
    actualizarZonaAdmin(datos) {
        var textoSQL =
            'update Zona_Admin set zona=$zona where dni_admin=$dni_admin;'
        var valoresParaSQL = { $dni_admin: datos.dni_admin, $zona: datos.zona }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << GET >>
    // .................................................................

    // .................................................................
    // getTodasLasZonas() <--
    // <--
    // Lista<{dni_admin:texto, zona:texto}>
    // .................................................................
    getTodasLasZonas() {
        var textoSQL = "select * from Zona_Admin";
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL,
                (err, res) => {
                    (err ? rechazar(err) : resolver(res))
                })
        })
    } // ()
    // .................................................................
    // dni:texto
    // -->    
    // getZonaPorDNI() <--
    // <--
    // {dni_admin:texto, zona:texto}
    // .................................................................
    getZonaPorDNI(dni) {
        var textoSQL = "select * from Zona_Admin where dni_admin=$dni";
        var valoresParaSQL = { $dni: dni }
        return new Promise((resolver, rechazar) => {
            this.laConexion.all(textoSQL, valoresParaSQL, function (err, res) {
                (err ? rechazar(err) : resolver(res))
            })
        })
    } // ()

    // .................................................................
    //  << DELETE >>
    // .................................................................

    // .................................................................
    // borrarTodasLasZonas() -->
    // .................................................................
    borrarTodasLasZonas() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from Zona_Admin;",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // dni_admin:texto
    // -->
    // borrarZonaPorDNI() -->
    // .................................................................
    borrarZonaPorDNI(dni_admin) {
        var textoSQL = "delete from Zona_Admin where dni_admin=$dni_admin;"
        var valoresParaSQL = { $dni_admin: dni_admin }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //
    // <<recurso>>
    // Admin_Anuncio
    //
    // .................................................................

    // .................................................................
    //  << POST >>
    // .................................................................

    // .................................................................
    // datos:{dni_admin:texto, anuncio_id:texto}
    // -->
    // insertarAdminAnuncio() -->
    // .................................................................
    insertarAdminAnuncio(datos) {
        var textoSQL =
            'insert into Admin_Anuncio (dni_admin, anuncio_id ) values( $dni_admin, $anuncio_id );'
        var valoresParaSQL = { $dni_admin: datos.dni_admin, $anuncio_id: datos.anuncio_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << DELETE >>
    // .................................................................

    // .................................................................
    // borrarTodosAdminAnuncio() -->
    // .................................................................
    borrarTodosAdminAnuncio() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from Admin_Anuncio;",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // dni_admin:texto
    // -->
    // borrarAdminAnuncioPorAdmin() -->
    // .................................................................
    borrarAdminAnuncioPorAdmin(dni_admin) {
        var textoSQL = "delete from Admin_Anuncio where dni_admin=$dni_admin;"
        var valoresParaSQL = { $dni_admin: dni_admin }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // anuncio_id:texto
    // -->
    // borrarAdminAnuncioPorAnuncio() -->
    // .................................................................
    borrarAdminAnuncioPorAnuncio(anuncio_id) {
        var textoSQL = "delete from Admin_Anuncio where anuncio_id=$anuncio_id;"
        var valoresParaSQL = { $anuncio_id: anuncio_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //
    // <<recurso>>
    // Dispositivo_Anuncio
    //
    // .................................................................

    // .................................................................
    //  << POST >>
    // .................................................................

    // .................................................................
    // datos:{dispositivo_id:texto, anuncio_id:texto}
    // -->
    // insertarDispositivoAnuncio() -->
    // .................................................................
    insertarDispositivoAnuncio(datos) {
        var textoSQL =
            'insert into Dispositivo_Anuncio (dispositivo_id, anuncio_id ) values( $dispositivo_id, $anuncio_id );'
        var valoresParaSQL = { $dispositivo_id: datos.dispositivo_id, $anuncio_id: datos.anuncio_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << DELETE >>
    // .................................................................

    // .................................................................
    // borrarTodosDispositivoAnuncio() -->
    // .................................................................
    borrarTodosDispositivoAnuncio() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from Dispositivo_Anuncio;",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // dispositivo_id:texto
    // -->
    // borrarDispositivoAnuncioPorDispositivo() -->
    // .................................................................
    borrarDispositivoAnuncioPorDispositivo(dispositivo_id) {
        var textoSQL = "delete from Dispositivo_Anuncio where dispositivo_id=$dispositivo_id;"
        var valoresParaSQL = { $dispositivo_id: dispositivo_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // anuncio_id:texto
    // -->
    // borrarDispositivoAnuncioPorAnuncio() -->
    // .................................................................
    borrarDispositivoAnuncioPorAnuncio(anuncio_id) {
        var textoSQL = "delete from Dispositivo_Anuncio where anuncio_id=$anuncio_id;"
        var valoresParaSQL = { $anuncio_id: anuncio_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //
    // <<recurso>>
    // Medicion_Dispositivo
    //
    // .................................................................

    // .................................................................
    //  << POST >>
    // .................................................................

    // .................................................................
    // datos:{medicion_id:texto, dispositivo_id:texto}
    // -->
    // insertarMedicionDispositivo() -->
    // .................................................................
    insertarMedicionDispositivo(datos) {
        var textoSQL =
            'insert into Medicion_Dispositivo (medicion_id, dispositivo_id ) values( $medicion_id, $dispositivo_id );'
        var valoresParaSQL = { $medicion_id: datos.medicion_id, $dispositivo_id: datos.dispositivo_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()

    // .................................................................
    //  << DELETE >>
    // .................................................................

    // .................................................................
    // borrarTodosMedicionDispositivo() -->
    // .................................................................
    borrarTodosMedicionDispositivo() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(
                "delete from Medicion_Dispositivo;",
                (err) => (err ? rechazar(err) : resolver())
            )
        })
    } // ()
    // .................................................................
    // medicion_id:texto
    // -->
    // borrarMedicionDispositivoPorMedicion() -->
    // .................................................................
    borrarMedicionDispositivoPorMedicion(medicion_id) {
        var textoSQL = "delete from Medicion_Dispositivo where medicion_id=$medicion_id;"
        var valoresParaSQL = { $medicion_id: medicion_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
    // .................................................................
    // dispositivo_id:texto
    // -->
    // borrarMedicionDispositivoPorDispositivo() -->
    // .................................................................
    borrarMedicionDispositivoPorDispositivo(dispositivo_id) {
        var textoSQL = "delete from Medicion_Dispositivo where dispositivo_id=$dispositivo_id;"
        var valoresParaSQL = { $dispositivo_id: dispositivo_id }
        return new Promise((resolver, rechazar) => {
            this.laConexion.run(textoSQL, valoresParaSQL, function (err) {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()


    // .................................................................
    // cerrar() -->
    // .................................................................
    cerrar() {
        return new Promise((resolver, rechazar) => {
            this.laConexion.close((err) => {
                (err ? rechazar(err) : resolver())
            })
        })
    } // ()
} // class
// .....................................................................
// .....................................................................