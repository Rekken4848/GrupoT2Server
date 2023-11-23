var tipoBusqueda = "persona"; // posibles: persona, dispositivo, lugar
var tipoTags = "persona"; 

function setTipoBusqueda(nuevoTipo) {
    if (typeof nuevoTipo !== "string" && nuevoTipo !== "persona" && nuevoTipo !== "dispositivo" && nuevoTipo !== "lugar") {
        console.log("Error: tipo de busqueda no valido");
        return;
    }
    tipoBusqueda = nuevoTipo;
    var barraBusqueda = document.getElementById("searchBar");

    switch (nuevoTipo) {
        case "persona":
            barraBusqueda.placeholder = "Search by DNI...";
            break;
        case "dispositivo":
            barraBusqueda.placeholder = "Search by SN...";
            break;
        case "lugar":
            barraBusqueda.placeholder = "Search by CP...";
            break;
    }
}

function setTipoTags(nuevoTipo) {
    if (typeof nuevoTipo !== "string" && nuevoTipo !== "persona" && nuevoTipo !== "dispositivo" && nuevoTipo !== "lugar") {
        console.log("Error: tipo de tags no valido");
        return;
    }
    tipoTags = nuevoTipo;
    var tablaColumnas = document.getElementById("leyendaTabla");

    switch (nuevoTipo) {
        case "persona":
            tablaColumnas.innerHTML = "<tr><td>DNI</td><td>Nombre</td><td>Apellidos</td><td>Correo</td><td>Telefono</td></tr>";
            break;
        case "dispositivo":
            tablaColumnas.innerHTML = "<tr><td>DNI</td><td>SN</td><td>Mediciones</td><td id='conectionTable'><img src='images/coverturaSenyal_icono.svg'></td></tr>"
            break;
        case "lugar":
            tablaColumnas.innerHTML = "<tr><td>DNI</td><td>CCAA</td><td>Provincia</td><td>CP</td><td>Calle</td>";
            break;
    }

    refrescarTabla();
}

function refrescarTabla() {
    switch (tipoTags) {
        case "persona":
            // Fetch data from the API endpoint
            fetch('http://localhost:8080/personaZona/03670') // Replace with your API endpoint
            .then(response => response.json())
            .then(data => {
              // Function to populate the table with data
              function populateTable(data) {
                const tableBody = document.getElementById('table-body');
                tableBody.innerHTML = "";
                // Iterate through the data and create table rows
                data.forEach(item => {
                  const row = document.createElement('tr');
                  row.onclick = function() {editarFila(item.dni)};
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
            fetch('http://localhost:8080/dispositivoZona/03670') // Replace with your API endpoint
            .then(response => response.json())
            .then(data => {
              // Function to populate the table with data
              function populateTable(data) {
                const tableBody = document.getElementById('table-body');
                tableBody.innerHTML = "";
                // Iterate through the data and create table rows
                data.forEach(item => {
                  const row = document.createElement('tr');
                  row.onclick = function() {editarFila(item.dni_empleado)};
                  row.innerHTML = `
                    <td>${item.dni_empleado}</td>
                    <td>${item.dispositivo_id}</td>
                    <td>v</td>
                    
                  `;
                  

                  fetch('http://localhost:8080/medicion/' + item.dispositivo_id)
                  .then(function(respuesta){
                    if(respuesta.ok){
                      return respuesta.json()
                    } else{
                      console.log("ha habido un error al obtener las mediciones")
                      tableBody.appendChild(row);
                    }
                  })
                  .then(datos =>{

                    var today = new Date();
                    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var dateTime = date + ' ' + time;

                    var currentTimeMillis = new Date(dateTime).getTime()
                    var medicionTimeMillis = new Date(datos[datos.length-1].fecha).getTime()

                    var diferencia = currentTimeMillis - medicionTimeMillis

                    var conexioncelda = document.createElement("td")
                    var imgconexioncelda = document.createElement("img")
                    imgconexioncelda.src = "images/wifi_icono.png"
                    imgconexioncelda.setAttribute("class", "wifiIcono")
                    conexioncelda.appendChild(imgconexioncelda)
                    conexioncelda.setAttribute("id", "conectionTable")
                    // 1 hora = 3600000 milisegundos
                    // 30 minutos = 1800000 milisegundos
                    // 1 minuto = 60000 milisegundos
                    // 2 minutos = 120000 milisegundos
                    // 1 hora y media = 5400000 milisegundos
                    // 1 dia (24 horas) = 86400000 milisegundos
                    if (diferencia > 86400000){
                      var imgconexionceldaerror = document.createElement("img")
                      imgconexionceldaerror.src = "images/trianguloPeligro_icono.svg"
                      imgconexionceldaerror.setAttribute("class", "errorConexionTablaImagen")
                      imgconexionceldaerror.setAttribute("title", "Conexion error with device")
                      imgconexionceldaerror.setAttribute("class", "errorConexionTablaImagen")
                      conexioncelda.appendChild(imgconexionceldaerror)

                    }
                    
                    row.appendChild(conexioncelda);
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
            fetch('http://localhost:8080/direccionCP/03670') // Replace with your API endpoint
            .then(response => response.json())
            .then(data => {
              // Function to populate the table with data
              function populateTable(data) {
                const tableBody = document.getElementById('table-body');
                tableBody.innerHTML = "";
                // Iterate through the data and create table rows
                data.forEach(item => {
                  const row = document.createElement('tr');
                  row.onclick = function() {editarFila(item.dni)};
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
}
    