// .......................................................
// .......................................................
// ..................ADMIN_FILTRAR........................
// .......................................................
// .......................................................

// .......................................................
// N --> visibilidadFormAnyadir()
// .......................................................
function visibilidadFormAnyadir(modo) {
    switch (modo) {
        case 0:
            document.getElementById("formAnyadirAdmin").hidden = false;
            document.getElementById("formAnyadirPersona").hidden = true;
            //document.getElementById("formAnyadirDispositivo").hidden = true;

            document.getElementById("personTitulo").style.color = 'red';
            document.getElementById("personTitulo").style.backgroundColor = 'white';
            document.getElementById("adminTitulo").style.color = 'white';
            document.getElementById("adminTitulo").style.backgroundColor = 'rgb(76, 156, 130)';
            break
        case 1:
            document.getElementById("formAnyadirAdmin").hidden = true;
            document.getElementById("formAnyadirPersona").hidden = false;
            //document.getElementById("formAnyadirDispositivo").hidden = true;

            document.getElementById("adminTitulo").style.color = 'red';
            document.getElementById("adminTitulo").style.backgroundColor = 'white';
            document.getElementById("personTitulo").style.color = 'white';
            document.getElementById("personTitulo").style.backgroundColor = 'rgb(76, 156, 130)';
            break
    }
}

// .......................................................
// Texto --> yaExisteDNI()
// .......................................................
async function yaExisteDNI(dni) {
    console.log("comprobando " + dni);
    await fetch('http://localhost:8080/persona/' + dni) // Replace with your API endpoint
        // return if the response is 404
        .then(response => {
            console.log(response.status);
            if (response.status == 404) {
                return false;
            }
            return true;
        })
        .then(data => { })
        .catch(error => console.error('Error fetching data:', error));
}

// .......................................................
// anyadirAdminyPersonayDireccion()
// .......................................................
function anyadirAdminyPersonayDireccion() {
    // if ya existe dni (document.getElementById("dnianyadiradmin").value) return

    var datos = {
        dni: document.getElementById("dnianyadiradmin").value,
        nombre: document.getElementById("nameanyadiradmin").value,
        apellidos: document.getElementById("surnameanyadiradmin").value,
        correo: document.getElementById("emailanyadiradmin").value,
        telefono: document.getElementById("telanyadiradmin").value,
    }
    console.log(datos)
    fetch('http://localhost:8080/persona', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {
    })

    var datos = {
        contrasena: document.getElementById("contrasenaanyadiradmin").value,
        dni: document.getElementById("dnianyadiradmin").value,
    }
    console.log(datos)
    fetch('http://localhost:8080/admin', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {
    })

    var datos = {
        dni: document.getElementById("dnianyadiradmin").value,
        ccaa: document.getElementById("ccaaanyadiradmin").value,
        provincia: document.getElementById("provinceanyadiradmin").value,
        codigo_postal: document.getElementById("postalCodeanyadiradmin").value,
        calle: document.getElementById("streetanyadiradmin").value,
    }
    console.log(datos)
    fetch('http://localhost:8080/direccion', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {
    })
    document.getElementById("contenedorPopUpsAnyadir").style.visibility = "hidden";

}

// .......................................................
// anyadirPersonayDireccion()
// .......................................................
function anyadirPersonayDireccion() {
    var datos = {
        dni: document.getElementById("dnianyadir").value,
        nombre: document.getElementById("nameanyadir").value,
        apellidos: document.getElementById("surnameanyadir").value,
        correo: document.getElementById("emailanyadir").value,
        telefono: document.getElementById("telanyadir").value,
    }
    console.log(datos)
    fetch('http://localhost:8080/persona', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) { 
        console.log(respuesta);
    })

    var datos = {
        dni: document.getElementById("dnianyadir").value,
        ccaa: document.getElementById("ccaaanyadir").value,
        provincia: document.getElementById("provinceanyadir").value,
        codigo_postal: document.getElementById("postalCodeanyadir").value,
        calle: document.getElementById("streetanyadir").value,
    }
    console.log(datos)
    fetch('http://localhost:8080/direccion', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {
        console.log(respuesta);
    })

    var datos = {
        dni_empleado: document.getElementById("dnianyadir").value,
        dispositivo_id: document.getElementById("serialnumberanyadir").value,
    }
    console.log(datos)
    fetch('http://localhost:8080/dispositivo', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {
        console.log(respuesta);
    })
    document.getElementById("contenedorPopUpsAnyadir").style.visibility = "hidden";
}

// .......................................................
// showAlert()
// .......................................................
function showAlert() {
    alert('Se ha añadido correctamente');
}

// .......................................................
// Evento --> submitFormPersona()
// .......................................................
function submitFormPersona(event) {
    event.preventDefault();
    anyadirPersonayDireccion() 
    setTipoTags('persona');  
    showAlert();
}

// .......................................................
// Evento --> submitFormAdmin()
// .......................................................
function submitFormAdmin(event) {
    event.preventDefault();
    anyadirAdminyPersonayDireccion() 
    setTipoTags('persona');  
    showAlert(); 
}

// .......................................................
// anyadirCodigoPostal()
// .......................................................
function anyadirCodigoPostal() {
    fetch('http://localhost:8080/usuarioSesion', {
      method: "GET"
    }).then(function (respuesta) {
      if (respuesta.ok) {
        return respuesta.text();
      } else {
        console.log("Hubo un fallo");
      }
    }).then(function (datos) {
      console.log("Datos de la sesion1: " + datos);
      fetch('http://localhost:8080/zona/' + datos, {
        method: "GET"
      }).then(function (respuesta) {
        if (respuesta.ok) {
          return respuesta.json();
        } else {
          console.log("Hubo un fallo");
        }
      }).then(function (datos) {
        console.log("Datos de la sesion2: " + datos);
        console.log("Datos de la sesion3: " + datos.zona);

        document.getElementById("postalCodeanyadir").value = datos.zona
        // Now you can continue your logic here
        // Add further fetch or data handling as needed
      }).catch(function (error) {
        console.error("Error en la tercera llamada:", error);
      });
    }).catch(function (error) {
      console.error("Error en la primera llamada:", error);
    });
    document.getElementById('contenedorPopUpsAnyadir').style.visibility = 'visible';
}