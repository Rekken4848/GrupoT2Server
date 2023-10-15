// .....................................................................
// mainServidorREST.js
// .....................................................................
const express = require('express')
const bodyParser = require('body-parser')
const Logica = require('../logica/Logica.js')
const reglasREST = require('./ReglasREST.js')

//const path = require('path');
// .....................................................................
// .....................................................................
async function cargarLogica(fichero) {
    return new Promise((resolver, rechazar) => {
        var laLogica = new Logica(fichero, (err) => {
            if (err) {
                rechazar(err);
            } else {
                resolver(laLogica);
            }
        });
    });
}
// .....................................................................
// main()
// .....................................................................
async function main() {
    var laLogica = await cargarLogica('../bd/datos.bd');
    var servidorExpress = express();
    //servidorExpress.use(express.static(path.join(__dirname, '../ux')));
    servidorExpress.use(bodyParser.text({ type: 'application/json' }))
    var reglas = reglasREST.cargar(servidorExpress, laLogica);
    // arrancao el servidor
    var servicio = servidorExpress.listen(8080, function () {
        console.log("servidor REST escuchando en el puerto 8080 ")
    })
    // capturo control-c para cerrar el servicio ordenadamente
    process.on('SIGINT', function () {
        console.log(" terminando ")
        servicio.close()
    })
} // ()
// .....................................................................
// .....................................................................
main()
// .....................................................................
// .....................................................................