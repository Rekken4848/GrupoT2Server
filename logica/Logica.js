// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require( "sqlite3" )
// .....................................................................
// Hugo Martin Escrihuela
// .....................................................................
module.exports = class Logica {
    // .................................................................
    // nombreBD: Texto
    // -->
    // constructor () -->
    // .................................................................
    constructor( nombreBD, cb ) {
        this.laConexion = new sqlite3.Database(
            nombreBD,
                ( err ) => {
                    if( ! err ) {
                    this.laConexion.run( "PRAGMA foreign_keys = ON" )
                    }
                    cb( err)
                })
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
    // {$id:N, $valor:R, $tipo_valor_id:N, $fecha:fecha, $lugar:lugar}
    // .................................................................
    buscarMedicionPorDispositivo(dispositivo) {
        var textoSQL = "select * from Medicion where dispositivo_id=$dispositivo";
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
    // tipoValor:texto
    // -->
    // getMedicionesPorTipoValor() <--
    // <--
    // Lista<{$id:N, $valor:R, $tipo_valor_id:N, $fecha:fecha, $lugar:lugar}>
    // .................................................................
    getMedicionesPorTipoValor(tipoValor) {
        var textoSQL = "select Medicion.id, Medicion.valor, Medicion.tipo_valor_id, Medicion.fecha, Medicion.lugar from Medicion, TipoValor where Medicion.tipo_valor_id=TipoValor.tipo_valor_id and TipoValor.tipo_valor=$tipo_valor";
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
        var textoSQL = "select Medicion.id, Medicion.valor, Medicion.tipo_valor_id, Medicion.fecha, Medicion.lugar from Medicion, MedicionDispositivo, Dispositivo, Persona, Direccion, Zona_Admin, Admin  where Medicion.id=MedicionDispositivo.medicion_id and MedicionDispositivo.dispositivo_id=Dispositivo.dispositivo_id and Dispositivo.dni_empleado=Persona.dni and Persona.dni=Direccion.dni and Direccion.codigo_postal=Zona_Admin.zona and ZonaAdmin.dni=Admin.dni_admin and Admin.dni_admin=$dni_admin";
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
        return new Promise( (resolver, rechazar) => {
            this.laConexion.run(
                "delete from Medicion;",
                (err)=> ( err ? rechazar(err) : resolver() )
            )
        })
    } // ()
    // .................................................................
    // dispositivo_id:Texto
    // -->
    // borrarMedicionesPorDispositivo() -->
    // .................................................................
    borrarMedicionesPorDispositivo( dispositivo ) {
        var valoresParaSQL = { $dispositivo: dispositivo }
        return new Promise( (resolver, rechazar) => {
            this.laConexion.run(
                "delete from Medicion where dispositivo_id=$dispositivo;",
                valoresParaSQL,
                (err)=> ( err ? rechazar(err) : resolver() )
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
    // cerrar() -->
    // .................................................................
    cerrar() {
        return new Promise( (resolver, rechazar) => {
            this.laConexion.close( (err)=>{
                ( err ? rechazar(err) : resolver() )
            })
        })
    } // ()
} // class
// .....................................................................
// .....................................................................