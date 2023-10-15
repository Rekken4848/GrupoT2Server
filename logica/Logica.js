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
    borrarMedicionesPorDispositivo( dispositivo_id ) {
        var valoresParaSQL = { $dispositivo_id: dispositivo_id }
        return new Promise( (resolver, rechazar) => {
            this.laConexion.run(
                "delete from Medicion where dispositivo_id=$dispositivo_id;",

                (err)=> ( err ? rechazar(err) : resolver() )
            )
        })
    } // ()
    // .................................................................
    // datos:{dni:Texto, nombre:Texto: apellidos:Texto}
    // -->
    // insertarMedicion() -->
    // .................................................................
    insertarMedicion( datos ) {
        var textoSQL =
            'insert into Medicion (Vgas, Vtemp, fecha, dispositivo_id) values( $Vgas, $Vtemp, $fecha, $dispositivo_id );'
        var valoresParaSQL = { $Vgas: datos.Vgas, $Vtemp: datos.Vtemp, $fecha: datos.fecha, $dispositivo_id: datos.dispositivo_id  }
        return new Promise( (resolver, rechazar) => {
            this.laConexion.run( textoSQL, valoresParaSQL, function( err ) {
                ( err ? rechazar(err) : resolver() )
            })
        })
    } // ()
    // .................................................................
    // dispositivo_id:Texto
    // -->
    // buscarMedicionPorDispositivo() <--
    // <--
    // {$id:N, $Vgas:R, $Vtemp:R, $fecha:fecha, $dispositivo_id:Texto}
    // .................................................................
    buscarMedicionPorDispositivo( dispositivo_id ) {
        var textoSQL = "select * from Medicion where dispositivo_id=$dispositivo_id";
        var valoresParaSQL = { $dispositivo_id: dispositivo_id }
        return new Promise( (resolver, rechazar) => {
            this.laConexion.all( textoSQL, valoresParaSQL,
                ( err, res ) => {
                    ( err ? rechazar(err) : resolver(res) )
            })
        })
    } // ()
    // .................................................................
    // getUltimaMedicion() <--
    // <--
    // {$id:N, $Vgas:R, $Vtemp:R, $fecha:fecha, $dispositivo_id:Texto}
    // .................................................................
    getUltimaMedicion() {
        var textoSQL = "select * from Medicion order by fecha desc limit 1";
        return new Promise( (resolver, rechazar) => {
            this.laConexion.all( textoSQL,
                ( err, res ) => {
                    ( err ? rechazar(err) : resolver(res) )
            })
        })
    } // ()
    // .................................................................
    // getTodasLasMediciones() <--
    // <--
    // Lista<{$id:N, $Vgas:R, $Vtemp:R, $fecha:fecha, $dispositivo_id:Texto}>
    // .................................................................
    getTodasLasMediciones() {
        var textoSQL = "select * from Medicion";
        return new Promise( (resolver, rechazar) => {
            this.laConexion.all( textoSQL,
                ( err, res ) => {
                    ( err ? rechazar(err) : resolver(res) )
            })
        })
    } // ()
    // .................................................................
    // fechaInicio:fecha, fechaFin:fecha
    // -->
    // buscarMedicionesEntreFechas() <--
    // <--
    // Lista<{$id:N, $Vgas:R, $Vtemp:R, $fecha:fecha, $dispositivo_id:Texto}>
    // .................................................................
    buscarMedicionesEntreFechas( fechaInicio, fechaFin ) {
        var textoSQL = "select * from Medicion where fecha between $fechaInicio and $fechaFin";
        var valoresParaSQL = { $fechaInicio: fechaInicio, $fechaFin: fechaFin }
        return new Promise( (resolver, rechazar) => {
            this.laConexion.all( textoSQL, valoresParaSQL,
                ( err, res ) => {
                    ( err ? rechazar(err) : resolver(res) )
            })
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