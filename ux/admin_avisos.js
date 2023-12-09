//funciones para pagina de admin.html ---------------------------------------------
function checkNumeroAvisos() {

    fetch('http://localhost:8080/usuarioSesion', {
        method: "GET"
    }).then(function (respuesta) {

        if (respuesta.ok) {
            return respuesta.text()
        } else {
            console.log("hubo un fallo")
        }

    }).then(function (datos) {
        //datos contiene el dni del admin que ha iniciado sesion

        //obtenemos la cantidad de anuncios que no se han leido
        fetch('http://localhost:8080/anuncioNoLeido/' + datos)
            .then(response => response.json())
            .then(data => {
                console.log("anuncioooo " + data);
                var anunciosSinLeerContador=0;
                data.forEach(item => {
                    anunciosSinLeerContador++;
                });
                console.log("anuncioooo " + anunciosSinLeerContador);

                if (anunciosSinLeerContador==0){
                    return;
                }
                const marcadorAvisosSinLeer = document.getElementById('marcaNotifAvisos')
                const marcadorAvisosSinLeerTexto = document.getElementById('numeroAvisos')

                marcadorAvisosSinLeerTexto.innerText = anunciosSinLeerContador;
                marcadorAvisosSinLeer.style.visibility='visible'
            })
            .catch(error => console.error('Error fetching data:', error));
    })
}
function enviarAPagAnuncios(){
    location.href="admin_avisos.html";
}

// funciones para admin_avisos.html -------------------------------------------
function refrescarTablaAvisos(){
    fetch('http://localhost:8080/usuarioSesion', {
        method: "GET"
    }).then(function (respuesta) {

        if (respuesta.ok) {
            return respuesta.text()
        } else {
            console.log("hubo un fallo")
        }

    }).then(function (datos) {
        //datos contiene el dni del admin que ha iniciado sesion

        //obtenemos la cantidad de anuncios que no se han leido
        fetch('http://localhost:8080/anuncioAdmin/' + datos)
        .then(response => response.json())
        .then(data => {
            
            const contenedorListaAnuncios = document.getElementById('contenedorGeneral')
            contenedorListaAnuncios.innerHTML = "";

            var tituloListaAnuncios = document.createElement('p');
            tituloListaAnuncios.setAttribute("id", "tituloPagAnuncios")
            tituloListaAnuncios.innerText="Peticiones";

            contenedorListaAnuncios.appendChild(tituloListaAnuncios)

            data.forEach(item => {
                console.log(item.anuncio_id + ", " + item.titulo + ", " + item.problemas + ", " + item.contenido + ", " + item.estado)

                var contenedorAnuncio = document.createElement('div');
                contenedorAnuncio.setAttribute("class", "contenedorAnuncios")

                var imagenSeparadora = document.createElement('img');
                imagenSeparadora.src = "images/linea_horizontal.svg"

                var anuncio = document.createElement('div');
                anuncio.setAttribute("class", "anuncio")

                var empleado = document.createElement('div');
                empleado.setAttribute("class", "empleado")

                var DNIEmpleado = document.createElement('p');
                DNIEmpleado.setAttribute("id", "DNIEmpleadoAnuncio")

                var iconoborrar = document.createElement('button');
                iconoborrar.setAttribute("id", "iconoBorrar")
                iconoborrar.onclick = function() {
                    mostrarPopupEliminarAnuncio(item.anuncio_id)
                }

                var imagenBorrar = document.createElement('img');
                imagenBorrar.src = "images/papelera_icono.svg"

                var tituloanuncio = document.createElement('div');
                tituloanuncio.setAttribute("class", "tituloAnuncio")

                var tituloAnuncioDiv = document.createElement('div');
                tituloAnuncioDiv.setAttribute("class", "tituloAnuncioDiv")

                var TituloAnuncioTexto = document.createElement('p');
                TituloAnuncioTexto.setAttribute("id", "TituloAnuncio")
                TituloAnuncioTexto.innerText=item.titulo

                var telefonodiv = document.createElement('div');
                telefonodiv.setAttribute("class", "telefono")

                var TelefonoAnuncioTexto = document.createElement('p');
                TelefonoAnuncioTexto.setAttribute("id", "telefonoAnuncio")

                var contenidoAnuncio = document.createElement('div');
                contenidoAnuncio.setAttribute("class", "contenidoAnuncio")

                var problemasAnuncio = document.createElement('div');
                problemasAnuncio.setAttribute("class", "contenedorAsuntoAnuncio")

                var problemasAnuncioTexto = document.createElement('p');
                problemasAnuncioTexto.setAttribute("id", "asuntoAnuncio")
                problemasAnuncio.innerText=item.problemas

                var contenedorDescripcion = document.createElement('div');
                contenedorDescripcion.setAttribute("class", "contenedorDescripcion")

                var descripcionAnuncio = document.createElement('p');
                descripcionAnuncio.setAttribute("id", "descripcionAnuncio")
                descripcionAnuncio.innerText = item.contenido

                var botonCompletar = document.createElement('button');
                botonCompletar.setAttribute("class", "botonCompletarAviso")
                if(item.estado=="Completado"){
                    botonCompletar.innerText = "Ya completado"
                } else{
                    botonCompletar.innerText = "Completar"
                    botonCompletar.onclick = function () {
                        var anuncioLeido = {
                            anuncio_id: item.anuncio_id,
                            titulo: item.titulo,
                            problemas: item.problemas,
                            contenido: item.contenido,
                            estado: "Completado"
                        }
                        console.log(anuncioLeido)
                        fetch('http://localhost:8080/actualizarAnuncio', {
                            method: "POST",
                            body: JSON.stringify(anuncioLeido),
                            credentials: 'same-origin',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(function (respuesta) {
                            refrescarTablaAvisos()
                        })
                    };

                }

                //obtenemos la persona para poder mostrar su dni y su telefono
                fetch('http://localhost:8080/personaAnuncio/' + item.anuncio_id)
                    .then(response => response.json())
                    .then(datos2 => {
                        datos2.forEach(item2=>{

                            DNIEmpleado.innerText = "DNI Empleado: " + item2.dni
                            TelefonoAnuncioTexto.innerText = "Telefono: " + item2.telefono

                            iconoborrar.appendChild(imagenBorrar)

                            empleado.appendChild(DNIEmpleado)
                            empleado.appendChild(iconoborrar)

                            tituloAnuncioDiv.appendChild(TituloAnuncioTexto)

                            telefonodiv.appendChild(TelefonoAnuncioTexto)

                            tituloanuncio.appendChild(tituloAnuncioDiv)
                            tituloanuncio.appendChild(telefonodiv)

                            problemasAnuncio.appendChild(problemasAnuncioTexto)

                            contenedorDescripcion.appendChild(descripcionAnuncio)

                            contenidoAnuncio.appendChild(problemasAnuncio)
                            contenidoAnuncio.appendChild(contenedorDescripcion)

                            anuncio.appendChild(empleado)
                            anuncio.appendChild(tituloanuncio)
                            anuncio.appendChild(contenidoAnuncio)
                            anuncio.appendChild(botonCompletar)

                            contenedorAnuncio.appendChild(imagenSeparadora)
                            contenedorAnuncio.appendChild(anuncio)

                            contenedorListaAnuncios.appendChild(contenedorAnuncio)
                            
                            //modificamos aquellos avisos cuyo estado son "No leido"
                            if(item.estado=="No leido"){
                                var anuncioLeido = {
                                    anuncio_id: item.anuncio_id,
                                    titulo: item.titulo,
                                    problemas: item.problemas,
                                    contenido: item.contenido,
                                    estado: "Leido"
                                }
                                console.log(anuncioLeido)
                                fetch('http://localhost:8080/actualizarAnuncio', {
                                    method: "POST",
                                    body: JSON.stringify(anuncioLeido),
                                    credentials: 'same-origin',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                }).then(function (respuesta) {
                                })
                            }

                        })
                        
                    })
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    })

}

function mostrarPopupEliminarAnuncio(anuncioID){

    console.log(anuncioID)
    const contenedorConfirmarEliminar = document.getElementById('contenedorConfirmarEliminar')
    contenedorConfirmarEliminar.style.visibility="visible"

    const botoneliminarDefinitivo = document.getElementById('botonConfirmarEliminar')
    botoneliminarDefinitivo.onclick = function () {
        var anuncioABorrar = {
            anuncio_id: anuncioID
        }
        fetch('http://localhost:8080/borrarAdminAnuncioPorAnuncio', {
            method: "POST",
            body: JSON.stringify(anuncioABorrar),
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (respuesta) {
            contenedorConfirmarEliminar.style.visibility = "hidden"
            refrescarTablaAvisos()
        })
    };

}