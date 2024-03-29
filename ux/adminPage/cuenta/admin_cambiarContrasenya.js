// .......................................................
// .......................................................
// ............ADMIN_CAMBIAR_CONTRASENYA..................
// .......................................................
// .......................................................

let dni;

// .......................................................
// mostrarUsuario()
// .......................................................
function mostrarUsuario() {
  fetch('http://localhost:8080/usuarioSesion', {
    method: "GET"
  })
    .then(function (respuesta) {
      if (respuesta.ok) {
        return respuesta.text();
      } else {
        console.log("Hubo un fallo");
      }
    })
    .then(function (dni_persona) {
      document.getElementById("contenedorEditarUsuario").style.visibility = "visible";
      dni_persona_editando = dni_persona;

      // Fetch data from the API endpoint
      fetch('http://localhost:8080/persona/' + dni_persona)
        .then(response => response.json())
        .then(data => {
          dni = data.dni;
          document.getElementById("dnieditar").value = data.dni;
          document.getElementById("nameeditar").value = data.nombre;
          document.getElementById("surnameeditar").value = data.apellidos;
          document.getElementById("teleditar").value = data.telefono;
          document.getElementById("emaileditar").value = data.correo;
        })
        .catch(error => console.error('Error fetching persona data:', error));

      // Fetch data from the API endpoint
      fetch('http://localhost:8080/direccion/' + dni_persona)
        .then(response => response.json())
        .then(data => {
          document.getElementById("ccaaeditar").value = data.ccaa;
          document.getElementById("provinceeditar").value = data.provincia;
          document.getElementById("postalCodeeditar").value = data.codigo_postal;
          document.getElementById("streeteditar").value = data.calle;
        })
        .catch(error => console.error('Error fetching direccion data:', error));

      // Fetch data from the API endpoint
      fetch('http://localhost:8080/dispositivo/' + dni_persona)
        .then(response => response.json())
        .then(data => {
          document.getElementById("deviceAssociadoTitulo").value = data.dispositivo_id;
        })
        .catch(error => console.error('Error fetching dispositivo data:', error));
    })
    .catch(error => console.error('Error fetching usuarioSesion data:', error));
}

document.addEventListener('DOMContentLoaded', function () {
  const botonContrasenya = document.getElementById('botonContrasenya');
  const passwordCard = document.getElementById('password-card');

  function showPasswordCard() {
    passwordCard.style.display = 'block';
  }
  
  botonContrasenya.addEventListener('click', showPasswordCard);
});

// .......................................................
// validatePasswords()
// .......................................................
function validatePasswords() {
  var usuario = document.getElementById("dnieditar").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("passwordConfirm").value;
  var passwordold = document.getElementById("passwordold").value;

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return false;
  }

  var datos = { username: usuario, password: passwordold };
  fetch('http://localhost:8080/login', {
    method: "POST",
    body: JSON.stringify(datos),
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function (respuesta) {
    if (respuesta.ok) {
      return respuesta.text();
    } else {
      alert("Contraseña equivocada");
      console.log("Hubo un fallo en la respuesta:", respuesta);
      return respuesta.text().then(text => { throw new Error(text || 'Network response was not ok') });
    }
  })
  .then(function (datos) {
    console.log("Los datos bien" + datos)
    if (datos === "Usuario Correcto") {
      var datosNuevos = { username: usuario, password: password };
      return fetch('http://localhost:8080/actualizarContrasenya', {
        method: "POST",
        body: JSON.stringify(datosNuevos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
      });
    } else if (datos === "Usuario Incorrecto") {
      alert("Contraseña equivocada");
      throw new Error('Incorrect User');
    }
  })
  .then(function (respuesta) {
    if (respuesta.ok) {
      console.log("Todo introducido con éxito");
      alert("Contraseña actualizada correctamente."); // Notify the user
      window.location.reload(); // Refresh the page
    } else {
      console.log("Hubo un fallo en la actualización:", respuesta);
      return respuesta.text().then(text => { throw new Error(text || 'Network response was not ok') });
    }
  })
  .catch(function (error) {
    console.error('There has been a problem with your fetch operation:', error);
  });

  return false;
}