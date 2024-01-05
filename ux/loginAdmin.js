// .......................................................
// .......................................................
// ......................LOGIN............................
// .......................................................
// .......................................................

// .......................................................
// Texto, Texto --> logearse()
// .......................................................
function logearse(username, password) {
    var datos = {username: username, password: password}
    console.log(datos)
    fetch('http://localhost:8080/login', {
        method: "POST",
        body: JSON.stringify(datos),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (respuesta) {

      if (respuesta.ok) {
        return respuesta.text()
      } else {
        console.log("hubo un fallo")
      }

    }).then(function (datos) {
        console.log("Los datos bien"+datos)
        if (datos === "Usuario Correcto") {
            console.log("Todo introducido con éxito");
            //var URLactual = window.location;
            //location.href='http://localhost:8080/pruebaAdmin.html'
            location.href='http://localhost:8080/admin.html'
        } else if(datos === "Usuario Incorrecto") {
            console.log("hubo un fallo")
            location.href='http://localhost:8080/login.html'
        }
    })
}

// Wrap the original window.alert function...
const windowAlert = window.alert;

window.alert = function(message) {
  console.log(`window.alert called with message: ${message}`);
  return windowAlert(message);
};

var user

// Wrap the original window.prompt function...
const windowPrompt = window.prompt;

window.prompt = function(message) {
  console.log(`window.prompt called with message: ${message}`);

  const input = windowPrompt(message);


  console.log(`user entered: ${input}`);
  
  if(message==="User"){
    user = input
  } else if(message==="Password"){
    logearse(user, input)
  }

  return input;
};

// Wrap the original window.confirm function...
const windowConfirm = window.confirm;

window.confirm = function(message) {
  console.log(`window.confirm called with message: ${message}`);

  const choice = windowConfirm(message) ? 'ok' : 'cancel';
  console.log(`user clicked: ${choice}`);
  
  return choice;
};

prompt('User')
prompt('Password')