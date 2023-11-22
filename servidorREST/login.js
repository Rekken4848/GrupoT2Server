const bcrypt = require('bcrypt');
var Users = []

module.exports.cargar = function (servidorExpress) {
    // Crear un nuevo usuario en la base de datos
    // Texto, contrasenyaEncriptada
    // -->
    // insertarAdminEncriptado()
    // .......................................................
    function insertarAdminEncriptado(dni, contrasenyaEncriptada) {
        var datos = { dni_admin: dni, contrasenya: contrasenyaEncriptada }
        console.log(datos)
        fetch('http://localhost:8080/admin', {
            method: "POST",
            body: JSON.stringify(datos),
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (respuesta) {

            if (respuesta.ok) {
                console.log("Todo introducido con éxito");
            } else {
                console.log("hubo un fallo")
            }
        })
    }

    // .......................................................
    // getUsuario() -> Lista<Medicion>
    // .......................................................
    function getUsuario(dni, password) {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:8080/admin/' + dni, {
                method: "GET"
            }).then(function (respuesta) {

                if (respuesta.ok) {

                    return respuesta.json()
                } else {
                    console.log("hubo un fallo")
                }

            }).then(function (datos) {
                console.log("Los datos de la persona: " + datos)
                if (datos !== null && datos !== undefined) {
                    bcrypt.compare(password, datos.contrasenya, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            //respuesta.send("Usuario Correcto")
                            resolve(result)
                        }
                    });
                } else {
                    console.log("Todo horrible")
                    resolve(false)
                }
                /*console.log("Todo horrible")
                resolve(false)*/
            }).catch(function (error) {
                reject(error);
            })
        })
    }

    servidorExpress.post(
        '/register',
        async function (peticion, respuesta) {
            console.log(" * POST /register ")

            var datos = JSON.parse(peticion.body)

            var username = datos.username
            var password = datos.password

            console.log("Usuario: " + username + ". Contrasena: " + password)

            // Encriptar la contraseña antes de almacenarla en la base de datos
            const hashedPassword = await bcrypt.hash(password, 10);

            insertarAdminEncriptado(username, hashedPassword)

            // todo ok
            respuesta.send("Usuario Registrado")
        }) //

    servidorExpress.post(
        '/login',
        async function (peticion, respuesta) {
            console.log(" * POST /login ")

            var datos = JSON.parse(peticion.body)

            var username = datos.username
            var password = datos.password


            // Encriptar la contraseña antes de almacenarla en la base de datos
            //const hashedPassword = await bcrypt.hash(password, 10);
            var esto = await getUsuario(username, password)
            console.log("Imprime esto:" + esto)

            if (!esto) {
                //respuesta.send("Usuario Correcto")
                respuesta.status(404).send("Usuario Incorrecto")
                return
            }
            // todo ok
            // Crear una propiedad en la sesión indicando que el usuario está autenticado
            peticion.session.authenticated = true;

            // Puedes almacenar más información del usuario en la sesión si es necesario
            peticion.session.username = username;

            respuesta.send("Usuario Correcto")
        }) //

    servidorExpress.get(
        '/paginaProtegida',
        function (peticion, respuesta) {
            console.log(peticion.session)
            // Verificar si el usuario está autenticado
            if (peticion.session.authenticated) {
                // Acceso permitido, puedes acceder a peticion.session.username si es necesario
                //respuesta.send(`Bienvenido, ${peticion.session.username}!`);
                respuesta.send(true)
            } else {
                // Usuario no autenticado, redirigir a la página de inicio de sesión
                //respuesta.redirect('/login');
                respuesta.send(false)
            }
        });
}