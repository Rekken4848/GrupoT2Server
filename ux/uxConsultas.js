function actualizarDatos(){
    getTodasLasPeronas()
}


function enviarDatos(datos) {
    alert(datos)
}


function llenarTablaPersonas(respuesta){
    var table = document.getElementById("tablaEmpleados")

    for (var i = 0; i < respuesta.length; i++){
        var row = document.createElement("tr")
        
        var idcelda = document.createElement("td")
        var textoidcelda = document.createTextNode(respuesta[i].dni)
        idcelda.appendChild(textoidcelda)
        idcelda.setAttribute("id", respuesta[i].dni)

        var emailcelda = document.createElement("td")
        var textoemailcelda = document.createTextNode(respuesta[i].correo)
        emailcelda.appendChild(textoemailcelda)
        emailcelda.setAttribute("id", respuesta[i].correo)

        var nombrecelda = document.createElement("td")
        var textonombrecelda = document.createTextNode(respuesta[i].nombre)
        nombrecelda.appendChild(textonombrecelda)
        nombrecelda.setAttribute("id", respuesta[i].nombre)

        var apellidocelda = document.createElement("td")
        var textoapellidocelda = document.createTextNode(respuesta[i].apellidos)
        apellidocelda.appendChild(textoapellidocelda)
        apellidocelda.setAttribute("id", respuesta[i].apellidos)

        var sncelda = document.createElement("td")
        var textosncelda = document.createTextNode("")
        sncelda.appendChild(textosncelda)
        sncelda.setAttribute("id", "SNTable")

        var conexioncelda = document.createElement("td")
        var imgconexioncelda = document.createElement("img")
        imgconexioncelda.src = "images/wifi_icono.png"
        imgconexioncelda.setAttribute("class", "wifiIcono")
        var imgconexionceldaerror = document.createElement("img")
        imgconexionceldaerror.src = "images/trianguloPeligro_icono.svg"
        imgconexionceldaerror.setAttribute("id", "ImagenError" + respuesta[i].dni)
        imgconexionceldaerror.setAttribute("title", "Conexion error with device")
        imgconexionceldaerror.setAttribute("class", "errorConexionTablaImagen")
        conexioncelda.appendChild(imgconexioncelda)
        conexioncelda.appendChild(imgconexionceldaerror)
        conexioncelda.setAttribute("id", "conectionTable")

        row.appendChild(idcelda)
        row.appendChild(emailcelda)
        row.appendChild(nombrecelda)
        row.appendChild(apellidocelda)
        row.appendChild(sncelda)
        row.appendChild(conexioncelda)

        table.appendChild(row)

        getDispositivoPorPersona(respuesta[i].dni)
    }
}

function comprobarElEstado(dni, fechaMedicion) {

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    
    var currentTimeMillis = new Date(dateTime).getTime()
    var medicionTimeMillis = new Date(fechaMedicion).getTime()

    var diferencia = currentTimeMillis-medicionTimeMillis

    // 1 hora = 3600000 milisegundos
    // 30 minutos = 1800000 milisegundos
    // 1 minuto = 60000 milisegundos
    // 2 minutos = 120000 milisegundos
    // 1 hora y media = 5400000 milisegundos
    // 1 dia (24 horas) = 86400000 milisegundos
    if (diferencia > 86400000){
        document.getElementById("ImagenError" + dni).style.visibility="visible"
    }

}