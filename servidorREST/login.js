app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Encriptar la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

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
                enviarDatos("Todo introducido con éxito");
            } else {
                enviarDatos("hubo un fallo")
            }
        })
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // .......................................................
    // getUsuario() -> Lista<Medicion>
    // .......................................................
    function getUsuario() {
        fetch('http://localhost:8080/admin', {
            method: "GET"
        }).then(function (respuesta) {

            if (respuesta.ok) {

                return respuesta.json()
            } else {
                enviarDatos("hubo un fallo")
            }

        }).then(function (datos) {
            // Comparar la contraseña ingresada con la contraseña almacenada usando bcrypt
            //const result = await bcrypt.compare(password, row.password);

            if (bcrypt.compare(password, row.password)) {
                res.json({ success: true, message: 'Inicio de sesión exitoso' });
            } else {
                res.json({ success: false, message: 'Nombre de usuario o contraseña incorrectos' });
            }
        })
    }
});