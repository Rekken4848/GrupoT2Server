function actualizarDatos(){
    getTodasLasPeronas()
    //comprobarElEstado()
}


function enviarDatos(datos) {
    alert(datos)
}

function comprobarElEstado(){
    //getDispositivosPorAdmin().then(function(respuesta){ })
    buscarMedicionPorDispositivo(1)
    //getTodasLasMediciones()
    //datos[0].fecha

}

function llenarTablaPersonas(respuesta){
    //getTodasLasPeronas()
    var table = document.getElementById("tablaEmpleados")

    for (var i =0;i<respuesta.length; i++){
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
        imgconexionceldaerror.setAttribute("id", "errorConexionTablaImagen")
        imgconexionceldaerror.setAttribute("title", "Conexion error with device")
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


    }
}
