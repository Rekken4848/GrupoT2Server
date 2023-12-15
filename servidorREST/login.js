const bcrypt = require('bcrypt');
const https = require("https");

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

    // Texto, contrasenyaEncriptada
    // -->
    // actualizarAdminEncriptado()
    // .......................................................
    function actualizarAdminEncriptado(dni, contrasenyaEncriptada) {
        var datos = { dni_admin: dni, contrasenya: contrasenyaEncriptada }
        console.log(datos)
        fetch('http://localhost:8080/actualizarAdmin', {
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
        '/actualizarContrasenya',
        async function (peticion, respuesta) {
            console.log(" * POST /register ")

            var datos = JSON.parse(peticion.body)

            var username = datos.username
            var password = datos.password

            console.log("Usuario: " + username + ". Contrasena: " + password)

            // Encriptar la contraseña antes de almacenarla en la base de datos
            const hashedPassword = await bcrypt.hash(password, 10);

            actualizarAdminEncriptado(username, hashedPassword)

            // todo ok
            respuesta.send("Contrasenya cambiada")
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

    servidorExpress.get(
        '/usuarioSesion',
        function (peticion, respuesta) {
            console.log("Usuario sesion backend: " + peticion.session.username)
            // Verificar si el usuario está autenticado
            respuesta.send(peticion.session.username)
        });

    servidorExpress.get(
        '/estaciones',
        function (peticion, respuesta) {
            console.log("Usuario sesion backend: " + peticion.session.username)
            // Verificar si el usuario está autenticado
            respuesta.send(peticion.session.username)
        });

    servidorExpress.get("/obtenerDatosAEMET", (req, res) => {
        const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJodWdvbWFyZXNjcmlodWVsYUBnbWFpbC5jb20iLCJqdGkiOiI2Mjg0MGYzMC0xZjQ0LTRkNDUtOWM5NC1jMTI5ZTE2MDVhODciLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcwMjU4MzY4NCwidXNlcklkIjoiNjI4NDBmMzAtMWY0NC00ZDQ1LTljOTQtYzEyOWUxNjA1YTg3Iiwicm9sZSI6IiJ9.allKURdnpgt9buh2KVTzaoWyO32C2FeuEmeirK3Xk3I";

        if (!apiKey) {
            return res.status(400).send("Se requiere la clave API");
        }

        const metadatos = {
            campos: [
                { id: "Fecha", descripcion: "Fecha dd-mm-aaaa", tipo_datos: "string", requerido: true, posicion_txt: "1-10" },
                { id: "Hora", descripcion: "Hora (UTC) hh:mm", tipo_datos: "string", requerido: true, posicion_txt: "12-16" },
                // ... otros campos ...
                { id: "PM10", descripcion: "PM10 en microgramos/m3", tipo_datos: "string", requerido: true, posicion_txt: "441-449" },
                { id: "Codigo_validacion_O3", descripcion: "Código de validación de la medida de PM10.", tipo_datos: "string", requerido: true, posicion_txt: "461" }
            ]
        };

        /*const options = {
            method: "GET",
            hostname: "opendata.aemet.es",
            path:
                `/opendata/api/valores/climatologicos/inventarioestaciones/todasestaciones/?api_key=${apiKey}`,
            headers: {
                "cache-control": "no-cache",
            },
        };*/
        /*const options = {
            method: "GET",
            hostname: "opendata.aemet.es",
            path:
                `/opendata/api/observacion/convencional/datos/estacion/8416X/?api_key=${apiKey}`,
            headers: {
                "cache-control": "no-cache",
            },
        };*/
        const options = {
            method: "GET",
            hostname: "opendata.aemet.es",
            path:
                `/opendata/api/red/especial/contaminacionfondo/estacion/12/?api_key=${apiKey}`,
            headers: {
                "cache-control": "no-cache",
            },
        };

        const aemetRequest = https.request(options, (aemetResponse) => {
            let chunks = [];

            aemetResponse.on("data", (chunk) => {
                chunks.push(chunk);
            });

            /*aemetResponse.on("end", () => {
                const body = Buffer.concat(chunks);
                res.send(body.toString());
            });*/
            /*aemetResponse.on("end", () => {
                const body = Buffer.concat(chunks);
                const responseData = JSON.parse(body.toString());
          
                // Verificar si la solicitud fue exitosa (código de estado 200)
                if (responseData.estado === 200) {
                  // Obtener la URL de los datos
                  const dataUrl = responseData.datos;
          
                  // Realizar una segunda solicitud para obtener los datos reales
                  https.get(dataUrl, (dataResponse) => {
                    let dataChunks = [];
          
                    dataResponse.on("data", (dataChunk) => {
                      dataChunks.push(dataChunk);
                    });
          
                    dataResponse.on("end", () => {
                      const dataBody = Buffer.concat(dataChunks);
                      res.send(dataBody.toString());
                    });
                  });
                } else {
                  // Si la solicitud no fue exitosa, devolver el mensaje de error
                  res.status(responseData.estado).send(responseData.descripcion);
                }
              });*/
            /*aemetResponse.on("end", () => {
                const body = Buffer.concat(chunks);
                const responseData = JSON.parse(body.toString());

                // Verificar si la solicitud fue exitosa (código de estado 200)
                if (responseData.estado === 200) {
                    // Obtener la URL de los datos
                    const dataUrl = responseData.datos;

                    // Realizar una segunda solicitud para obtener los datos reales
                    https.get(dataUrl, (dataResponse) => {
                        let dataChunks = [];

                        dataResponse.on("data", (dataChunk) => {
                            dataChunks.push(dataChunk);
                        });

                        dataResponse.on("end", () => {
                            const dataBody = Buffer.concat(dataChunks);

                            // Convertir los datos a un array de líneas
                            const dataLines = dataBody.toString().split('\n');

                            // Obtén las posiciones de cada campo según los metadatos
                            const posiciones = metadatos.campos.reduce((acc, campo) => {
                                acc[campo.id] = {
                                    inicio: parseInt(campo.posicion_txt.split('-')[0]),
                                    fin: parseInt(campo.posicion_txt.split('-')[1])
                                };
                                return acc;
                            }, {});

                            // Función para procesar una línea de datos
                            const procesarLinea = (dataLine) => {
                                const datos = {};

                                // Itera sobre cada campo en los metadatos
                                metadatos.campos.forEach((campo) => {
                                    // Extrae el valor del campo según las posiciones
                                    const valorCampo = dataLine.substring(posiciones[campo.id].inicio - 1, posiciones[campo.id].fin);
                                    datos[campo.id] = valorCampo.trim(); // Elimina espacios en blanco alrededor del valor
                                });

                                // Haz lo que quieras con los datos, por ejemplo, imprímelos
                                console.log(datos);
                            };

                            // Itera sobre todas las líneas de datos
                            dataLines.forEach((dataLine) => {
                                procesarLinea(dataLine);
                            });

                            // Envía la respuesta al cliente (puedes ajustar esto según tus necesidades)
                            res.send("Datos procesados con éxito.");
                        });
                    });
                } else {
                    // Si la solicitud no fue exitosa, devolver el mensaje de error
                    res.status(responseData.estado).send(responseData.descripcion);
                }
            });*/
            aemetResponse.on("end", () => {
                const body = Buffer.concat(chunks);
                const responseData = JSON.parse(body.toString());

                if (responseData.estado === 200) {
                    const dataUrl = responseData.datos;

                    https.get(dataUrl, (dataResponse) => {
                        let dataChunks = [];

                        dataResponse.on("data", (dataChunk) => {
                            dataChunks.push(dataChunk);
                        });

                        /*dataResponse.on("end", () => {
                            const dataBody = Buffer.concat(dataChunks);
                            const dataString = dataBody.toString();

                            // Dividir el string en líneas y procesar cada línea
                            const lineas = dataString.split('\n');
                            lineas.forEach((linea) => {
                                // Dividir la línea en segmentos basados en el espacio
                                const segmentos = linea.split(' ');

                                // Filtrar los segmentos que contienen información relevante (mediciones y códigos de validación)
                                const datosRelevantes = segmentos.filter(seg => seg.includes('(0') || seg.includes('CV:'));

                                // Crear un objeto para almacenar las mediciones y códigos de validación
                                const medicionesYCodigos = {};

                                // Iterar sobre los datosRelevantes y agregarlos al objeto
                                for (let i = 0; i < datosRelevantes.length; i += 2) {
                                    const medicion = datosRelevantes[i].replace(':', ''); // Eliminar el ":" al final de las mediciones
                                    const codigo = datosRelevantes[i + 1];
                                    medicionesYCodigos[medicion] = codigo;
                                }

                                console.log(medicionesYCodigos);
                            });

                            res.send(dataBody.toString());
                        });*/
                        aemetResponse.on("end", () => {
                            const body = Buffer.concat(chunks);
                            const responseData = JSON.parse(body.toString());

                            if (responseData.estado === 200) {
                                const dataUrl = responseData.datos;

                                https.get(dataUrl, (dataResponse) => {
                                    let dataChunks = [];

                                    dataResponse.on("data", (dataChunk) => {
                                        dataChunks.push(dataChunk);
                                    });

                                    dataResponse.on("end", () => {
                                        const parseData = (rawData) => {
                                            const metadata = {
                                                "unidad_generadora": "Servicio de Redes Especiales y Vigilancia Atmosférica",
                                                "periodicidad": "Cada 1h",
                                                "descripcion": "Ficheros diarios con datos diezminutales de las estaciones de la red de contaminación de fondo EMEP/VAG/CAMP, de temperatura, presión, humedad, viento (dirección y velocidad), radiación global, precipitación y 4 componentes químicos: O3, SO2, NO, NO2 y PM10. Los datos se encuentran en formato FINN (propio del Ministerio de Medio Ambiente)",
                                                "formato": "ascii/txt",
                                                "copyright": "© AEMET. Autorizado el uso de la información y su reproducción citando a AEMET como autora de la misma.",
                                                "notaLegal": "https://www.aemet.es/es/nota_legal",
                                                "campos": [
                                                    { "id": "Fecha", "descripcion": "Fecha dd-mm-aaaa", "tipo_datos": "string", "requerido": true, "posición_txt": "1-10" },
                                                    { "id": "Hora", "descripcion": "Hora (UTC)  hh:mm", "tipo_datos": "string", "requerido": true, "posicion_txt": "12-16" },
                                                    { "id": "SO2", "descripcion": "SO2 en microgramos/m3", "tipo_datos": "string", "requerido": true, "posicion_txt": "28-36" },
                                                    // ... (todos los demás campos)
                                                    { "id": "PM10", "descripcion": "PM10 en microgramos/m3", "tipo_datos": "string", "requerido": true, "posicion_txt": "441-449" }
                                                ]
                                            };

                                            const dataLines = rawData.trim().split('\n');

                                            const result = {
                                                metadata: metadata,
                                                data: [],
                                            };

                                            for (const line of dataLines) {
                                                const entry = {};

                                                for (const field of metadata.campos) {
                                                    const startPos = field.posicion_txt.split('-')[0] - 1;
                                                    const endPos = field.posicion_txt.split('-')[1];
                                                    const value = line.slice(startPos, endPos).trim();
                                                    entry[field.id] = value;
                                                }

                                                result.data.push(entry);
                                            }

                                            return result;
                                        };
                                        const dataBody = Buffer.concat(dataChunks);
                                        const dataString = dataBody.toString();

                                        const parsedData = parseData(dataString);

                                        console.log(parsedData);

                                        res.send(parsedData);
                                    });
                                });
                            } else {
                                res.status(responseData.estado).send(responseData.descripcion);
                            }
                        });
                    });
                } else {
                    res.status(responseData.estado).send(responseData.descripcion);
                }
            });
        });

        aemetRequest.on("error", (error) => {
            console.error(error);
            res.status(500).send("Error al obtener datos de AEMET");
        });

        aemetRequest.end();
    });

    function procesarCodigoValidacionO3(codigoValidacion) {
        const valores = codigoValidacion.split(' ');

        const resultado = {
            fecha: valores[0],
            hora: valores[1],
            SO2: extraerValor(valores[2]),
            NO: extraerValor(valores[4]),
            NO2: extraerValor(valores[6]),
            O3: extraerValor(valores[8]),
            velocidadViento: extraerValor(valores[10]),
            direccionViento: extraerValor(valores[12]),
            temperatura: extraerValor(valores[14]),
            humedad: extraerValor(valores[16]),
            presion: extraerValor(valores[18]),
            radiacionGlobal: extraerValor(valores[20]),
            precipitacion: extraerValor(valores[22]),
            PM10: extraerValor(valores[24])
        };

        return resultado;
    }

    function extraerValor(codigo) {
        // Extraer el valor numérico desde el código
        return codigo.match(/[+\-]?\d+(\.\d+)?/)[0];
    }
}