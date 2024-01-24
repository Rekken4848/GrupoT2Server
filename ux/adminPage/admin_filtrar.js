// .......................................................
// .......................................................
// ..................ADMIN_FILTRAR........................
// .......................................................
// .......................................................

// .......................................................
// redirectToURLEditAdmin()
// .......................................................
function redirectToURLEditAdmin() {
  window.location.href = 'cuenta/admin_editarUsuario.html';
}

function redirectToURLEditAdmin2() {
  window.location.href = '../cuenta/admin_editarUsuario.html';
}

var tipoBusqueda = "persona"; // posibles: persona, dispositivo, lugar
var tipoTags = "persona";

// .......................................................
// Texto --> setTipoBusqueda()
// .......................................................
function setTipoBusqueda(nuevoTipo) {
  if (typeof nuevoTipo !== "string" && nuevoTipo !== "persona" && nuevoTipo !== "dispositivo" && nuevoTipo !== "lugar") {
    console.log("Error: tipo de busqueda no valido");
    return;
  }
  tipoBusqueda = nuevoTipo;
  var barraBusqueda = document.getElementById("searchBar");

  switch (nuevoTipo) {
    case "persona":
      barraBusqueda.placeholder = "Buscar por DNI...";
      break;
    case "dispositivo":
      barraBusqueda.placeholder = "Buscar por Id...";
      break;
    case "lugar":
      barraBusqueda.placeholder = "Buscar por CP...";
      break;
  }
}

// .......................................................
// Texto --> setTipoTags()
// .......................................................
function setTipoTags(nuevoTipo) {
  if (typeof nuevoTipo !== "string" && nuevoTipo !== "persona" && nuevoTipo !== "dispositivo" && nuevoTipo !== "lugar") {
    console.log("Error: tipo de tags no valido");
    return;
  }
  tipoTags = nuevoTipo;
  var tablaColumnas = document.getElementById("leyendaTabla");

  switch (nuevoTipo) {
    case "persona":
      document.getElementById('personaFiltro').checked=true;
      tablaColumnas.innerHTML = "<thead><th onclick='ordenarTabla(0, 0)'>DNI</th><th onclick='ordenarTabla(1, 0)'>Nombre</th><th onclick='ordenarTabla(2, 0)'>Apellidos</th><th onclick='ordenarTabla(3, 0)'>Correo</th><th onclick='ordenarTabla(4, 0)'>Telefono</th></thead>";
      break;
    case "dispositivo":
      tablaColumnas.innerHTML = "<thead><th onclick='ordenarTabla(0, 0)'>DNI</th><th onclick='ordenarTabla(1, 0)'>Id dispositivo</th><th onclick='ordenarTabla(2, 0)'>Mediciones</th><th onclick='ordenarTabla(3, 0)' id='conectionTable'><img src='../images/coverturaSenyal_icono.svg'></th><th onclick='ordenarTabla(4, 0)'>Fecha Ultima Medicion</th></thead>"
      break;
    case "lugar":
      tablaColumnas.innerHTML = "<thead><th th onclick='ordenarTabla(0, 0)'>DNI</th><th onclick='ordenarTabla(1, 0)'>CCAA</th><th onclick='ordenarTabla(2, 0)'>Provincia</th><th onclick='ordenarTabla(3, 0)'>CP</th><th onclick='ordenarTabla(4, 0)' >Calle</th></thead>";
      break;
  }

  refrescarTabla();
}

// .......................................................
// refrescarTabla()
// .......................................................
function refrescarTabla() {
  fetch('http://localhost:8080/usuarioSesion', {
    method: "GET"
  }).then(function (respuesta) {

    if (respuesta.ok) {
      return respuesta.text()
    } else {
      console.log("hubo un fallo")
    }

  }).then(function (datos) {
    console.log("Datos de la sesion1: " + datos)
    fetch('http://localhost:8080/zona/' + datos, {
      method: "GET"
    }).then(function (respuesta) {

      if (respuesta.ok) {
        return respuesta.json()
      } else {
        console.log("hubo un fallo")
      }

    }).then(function (datos) {
      console.log("Datos de la sesion2: " + datos)
      console.log("Datos de la sesion3: " + datos.zona)
      switch (tipoTags) {
        case "persona":
          // Fetch data from the API endpoint
          fetch('http://localhost:8080/personaZona/' + datos.zona)
            .then(response => response.json())
            .then(data => {
              // Function to populate the table with data
              function populateTable(data) {
                const tableBody = document.getElementById('table-body');
                tableBody.innerHTML = "";
                // Iterate through the data and create table rows
                data.forEach(item => {
                  const row = document.createElement('tr');
                  row.onclick = function () { editarFila(item.dni) };
                  row.innerHTML = `
                        <td>${item.dni}</td>
                        <td>${item.nombre}</td>
                        <td>${item.apellidos}</td>
                        <td>${item.correo}</td>
                        <td>${item.telefono}</td>
                      `;
                  tableBody.appendChild(row);
                });
              }

              // Call the function to populate the table
              populateTable(data);
            })
            .catch(error => console.error('Error fetching data:', error));
          break;
        case "dispositivo":
          // Fetch data from the API endpoint
          fetch('http://localhost:8080/dispositivoZona/' + datos.zona)
            .then(response => response.json())
            .then(data => {
              // Function to populate the table with data
              function populateTable(data) {
                const tableBody = document.getElementById('table-body');
                tableBody.innerHTML = "";
                // Iterate through the data and create table rows
                data.forEach(item => {
                  const row = document.createElement('tr');
                  row.onclick = function () { editarFila(item.dni_empleado) };
                  row.innerHTML = `
                        <td>${item.dni_empleado}</td>
                        <td>${item.dispositivo_id}</td>
                        <td>v</td>
                        
                      `;


                  fetch('http://localhost:8080/medicion/' + item.dispositivo_id)
                    .then(function (respuesta) {
                      if (respuesta.ok) {
                        return respuesta.json()
                      } else {
                        console.log("ha habido un error al obtener las mediciones")

                        //al no tener mediciones, no tenemos conexion ni ultima medicion
                        //dejamos los campos vacios

                        //ultima conexion como error de conexion
                        var conexioncelda = document.createElement("td")
                        conexioncelda.setAttribute("id", "conectionTable")

                        var imgconexioncelda = document.createElement("img")
                        imgconexioncelda.src = "../images/customIcons/wifi.png"
                        imgconexioncelda.setAttribute("class", "wifiIcono")
                        conexioncelda.appendChild(imgconexioncelda)

                        var imgconexionceldaerror = document.createElement("img")
                        imgconexionceldaerror.src = "../images/trianguloPeligro_icono.svg"
                        imgconexionceldaerror.setAttribute("class", "errorConexionTablaImagen")
                        imgconexionceldaerror.setAttribute("title", "Conexion error with device")
                        imgconexionceldaerror.setAttribute("class", "errorConexionTablaImagen")
                        conexioncelda.appendChild(imgconexionceldaerror)

                        //la celda de ultima medicion vacia
                        var fechaUltimaMedicionCelda = document.createElement("td")

                        row.appendChild(conexioncelda);
                        row.appendChild(fechaUltimaMedicionCelda);
                        tableBody.appendChild(row);
                      }
                    })
                    .then(datos => {

                      var today = new Date();
                      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                      var dateTime = date + ' ' + time;

                      var currentTimeMillis = new Date(dateTime).getTime()
                      var medicionTime = datos[datos.length - 1].fecha
                      var medicionTimeMillis = new Date(medicionTime).getTime()

                      var diferencia = currentTimeMillis - medicionTimeMillis

                      var conexioncelda = document.createElement("td")
                      var imgconexioncelda = document.createElement("img")
                      imgconexioncelda.src = "../images/customIcons/wifi.png"
                      imgconexioncelda.setAttribute("class", "wifiIcono")
                      conexioncelda.appendChild(imgconexioncelda)
                      conexioncelda.setAttribute("id", "conectionTable")
                      // 1 hora = 3600000 milisegundos
                      // 30 minutos = 1800000 milisegundos
                      // 1 minuto = 60000 milisegundos
                      // 2 minutos = 120000 milisegundos
                      // 1 hora y media = 5400000 milisegundos
                      // 1 dia (24 horas) = 86400000 milisegundos
                      if (diferencia > 86400000) {
                        var imgconexionceldaerror = document.createElement("img")
                        imgconexionceldaerror.src = "../images/trianguloPeligro_icono.svg"
                        imgconexionceldaerror.setAttribute("class", "errorConexionTablaImagen")
                        imgconexionceldaerror.setAttribute("title", "Conexion error with device")
                        imgconexionceldaerror.setAttribute("class", "errorConexionTablaImagen")
                        conexioncelda.appendChild(imgconexionceldaerror)

                      }

                      var fechaUltimaMedicionCelda = document.createElement("td")
                      fechaUltimaMedicionCelda.innerHTML = medicionTime


                      row.appendChild(conexioncelda);
                      row.appendChild(fechaUltimaMedicionCelda);
                      tableBody.appendChild(row);
                    });

                  //tableBody.appendChild(row);
                });
              }

              // Call the function to populate the table
              populateTable(data);
            })
            .catch(error => console.error('Error fetching data:', error));
          break;
        case "lugar":
          // Fetch data from the API endpoint
          fetch('http://localhost:8080/direccionCP/' + datos.zona) // Replace with your API endpoint
            .then(response => response.json())
            .then(data => {
              // Function to populate the table with data
              function populateTable(data) {
                const tableBody = document.getElementById('table-body');
                tableBody.innerHTML = "";
                // Iterate through the data and create table rows
                data.forEach(item => {
                  const row = document.createElement('tr');
                  row.onclick = function () { editarFila(item.dni) };
                  row.innerHTML = `
                        <td>${item.dni}</td>
                        <td>${item.ccaa}</td>
                        <td>${item.provincia}</td>
                        <td>${item.codigo_postal}</td>
                        <td>${item.calle}</td>
                      `;
                  tableBody.appendChild(row);
                });
              }

              // Call the function to populate the table
              populateTable(data);
            })
            .catch(error => console.error('Error fetching data:', error));
          break;
      }
    })
  })
}

// .......................................................
// N, Texto --> ordenarTabla()
// .......................................................
//funcion para ordenar al clickar sobre el nombre de la columna
function ordenarTabla(n, type) {
  /*
  * n es el numero de la columna de [0 - x] de izquierda a derecha
  *
  * el type 0 = ordenar string
  * el type 1 = ordenar int
  */
  var image = document.getElementById('flecha');

  var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

  var table = document.getElementById('table-body');

  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";

  // un loop que se ejecutara hasta que se haya ordenado todas las filas
  while (switching) {
    //el siguiente valor indica si ya se ha terminado de ordenar toda la tabla
    switching = false;
    rows = table.rows;

    //recorremos todas las filas
    for (i = 0; i < (rows.length - 1); i++) {
      //al principio de cada fila decimos que aun no se ha ordenado
      shouldSwitch = false;
      //obtenemos la fila actual y la siguiente para compararla y ver si tenemos que intercambiarlas para ordenar
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      //miramos si deberian intercambiarse las filas para cumplir el orden ascendente o descendente
      if (dir == "asc") {
        if ((type == 0 && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) || (type == 1 && parseFloat(x.innerHTML) > parseFloat(y.innerHTML))) {
          //si deben cambiarse, lo marcamos y rompemos el bucle para ejecutar el if de abajo
          shouldSwitch = true;
          image.src = '../images/ordenar-arriba.png';
          break;
        }
      } else if (dir == "desc") {
        if ((type == 0 && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) || (type == 1 && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))) {
          //si deben cambiarse, lo marcamos y rompemos el bucle para ejecutar el if de abajo
          shouldSwitch = true;
          image.src = '../images/ordenar-abajo.png';
          break;
        }
      }
    }
    if (shouldSwitch) {
      //si se ha marcado que dos filas deben cambiarse
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Cada vez que haces un intercambio aumentamos el contador
      switchcount++;
    } else {
      //si las filas no deben cambiarse (no han marcado shouldSwitch) y el orden es ascendente (en otras palabras, el orden ya era ascendente antes de llamar a la funcion) se buelve a ejecutar el while
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}