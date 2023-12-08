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



document.addEventListener('DOMContentLoaded', function() {
  const botonContrasenya = document.getElementById('botonContrasenya');
  const passwordCard = document.getElementById('password-card');
  
// Function to show the password card
function showPasswordCard() {
  passwordCard.style.display = 'block';
}
// Event listener to show the password card when the button is clicked
botonContrasenya.addEventListener('click', showPasswordCard);
});

function validatePasswords() {
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("passwordConfirm").value;
  var passwordold = document.getElementById("passwordold").value;

  if (passwordold !== "2015") {
    alert("Contraseña equivocada");
    return false;
  } else if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return false;
  }

  return true;
}




