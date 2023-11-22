//alert("Gas")

/*function getAlert() {

    // get all scripts
    //var elem = document.scripts;
    var elem = alert("Gas")
  
    // loop and check
    for (var i = 0, len = elem.length; i < len; i++) {
  
      var txt = elem[i].textContent.match(/alert\(['"]([^'"]+)['"]\)/);
      if (txt) { return txt[1]; } // if matched, return the alert text and stop
    }
} 
console.log(getAlert())*/


// Wrap the original window.alert function...
const windowAlert = window.alert;

window.alert = function(message) {
  console.log(`window.alert called with message: ${message}`);
  return windowAlert(message);
};
//alert('FOO');
// Console Output:
// window.alert called with message: FOO
// ========================================================
var user

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
        console.log(respuesta);
        if (respuesta === true) {
            console.log("Todo introducido con éxito");
            //var URLactual = window.location;
            location.href='http://localhost:8080/pruebaAdmin.html'
        } else if(respuesta === false) {
            console.log("hubo un fallo")
            location.href='http://localhost:8080/login.html'
        }
    })
}
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
//prompt('BAR');
prompt('User')
prompt('Password')
// Console Output:
// window.prompt called with message: BAR
// user entered: xxx
// ========================================================


// Wrap the original window.confirm function...
const windowConfirm = window.confirm;

window.confirm = function(message) {
  console.log(`window.confirm called with message: ${message}`);

  const choice = windowConfirm(message) ? 'ok' : 'cancel';
  console.log(`user clicked: ${choice}`);
  
  return choice;
};
//confirm('BAZ');
// Console Output:
// window.confirm called with message: BAZ
// user clicked: ok (or 'cancel' if you click 'cancel')