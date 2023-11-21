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
                    <td><img class="wifiIcono" src="images/wifi_icono.png"></td>
                  `;
                  tableBody.appendChild(row);
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
    