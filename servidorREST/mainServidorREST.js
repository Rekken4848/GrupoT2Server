// .....................................................................
// mainServidorREST.js
// .....................................................................
// .....................................................................
// Hugo Martin Escrihuela
// .....................................................................
const express = require('express')
const bodyParser = require('body-parser')
const Logica = require('../logica/Logica.js')
const reglasREST = require('./ReglasREST.js')

const path = require('path');
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
    // Habilita CORS para todas las rutas
    //servidorExpress.use(cors());
    // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
    servidorExpress.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); // Permite cualquier origen de solicitud
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    servidorExpress.use(express.static(path.join(__dirname, '../ux')));
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