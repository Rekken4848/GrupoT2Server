function getCustomIcon(type) {
    const color = getColorMarcador(type);
    return L.divIcon({
        className: 'custom-icon',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
        popupAnchor: [0, -10],
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%;"></div>`
    });
}

//----------------------------------------------------------------------------------------------
/*
function filtrarPorFechas(fechaInicio, fechaFin) {
    fetch(`http://localhost:8080/medicionConTipoValorEntreFechas/${fechaInicio}/${fechaFin}`, {
        method: "GET"
    }).then(function(respuesta) {
        if (respuesta.ok) {
            return respuesta.json();
        } else {
            console.log("Hubo un fallo");
        }
    }).then(function(datos) {
        // ... (Your existing logic to handle data and markers)
    });
}

// Function to update markers based on selected date range
function actualizarMapaConFiltroDeFecha() {
    const fechaInicio = document.getElementById('fecha-inicio').value;
    const fechaFin = document.getElementById('fecha-fin').value;
    filtrarPorFechas(fechaInicio, fechaFin);
}*/
//----------------------------------------------------------------------------------------------

function addToLegend(type) {
    const legendContent = document.getElementById('zonaMapa');
    const entry = document.createElement('div');
    entry.innerHTML = `<span class="legend-marker" style="background-color: ${getColor(type)};"></span>${type}`;
    legendContent.appendChild(entry);
}

function getColorMarcador(nivel) {
    // Asigna colores diferentes según el tipo de medición
    return nivel === 'alto' ? 'red' : nivel === 'medio' ? 'yellow' : nivel === 'bajo' ? 'green' : 'blue';
}

function getColor(type) {
    // Asigna colores diferentes según el tipo de medición
    return type === 'CO2' ? 'red' : type === 'CO3' ? 'blue' : type === 'N' ? 'yellow' : type === 'C8' ? 'pink' : 'green';
}

let mymap;

function generarYGenerarMapa() {
    if (mymap) {
        mymap.remove();
    }

     mymap = L.map('zonaMapa').setView([39.5, -0.5], 8); // Set initial view for Valencia

    // Add OpenStreetMap tiles to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);
    
    // Add the air quality stations WMS layer-----------------------------
    L.tileLayer.wms('https://wms.mapama.gob.es/sig/EvaluacionAmbiental/CalidadAire/RedEstacionesCa/wms.aspx?', {
        layers: 'ESTACIONES_CA',
        format: 'image/png',
        transparent: true
    }).addTo(mymap);

     var stations = [
    { name: 'Prat de Cabanes', coordinates: [40.137222, 0.165556] },
    { name: 'Aras de los Olmos', coordinates: [39.950278, -1.108889] },
    { name: 'Valencia', coordinates: [39.472222, -0.413333] },
    { name: 'Denia', coordinates: [38.821944, 0.035833] },
    { name: 'Torrevieja', coordinates: [38.008333, -0.658611] }
  ];

  // Agrega marcadores para cada estación
  stations.forEach(function(station) {
    L.marker(station.coordinates).addTo(mymap).bindPopup(station.name);
  });
    //----------------------------------------------------------------------

    L.marker([51.505, -0.09]).addTo(mymap)
        .bindPopup('¡Hola, mundo!').openPopup();
    
        mostrarLeyendaYMarcadores(mymap);
}

// Función para obtener el color según la clasificación
function getColorByClasificacion(clasificacion) {
    // Define colores según la clasificación
    const colores = {
        alto: 'red',
        medio: 'yellow',
        bajo: 'green'
    };
    return colores[clasificacion] || 'gray'; // Color por defecto
}

// Función para obtener la clasificación según el valor
function getClasificacion(valor) {
    const umbralAlto = 30;
    const umbralMedio = 15;
    if (valor > umbralAlto) {
        return 'alto';
    } else if (valor > umbralMedio) {
        return 'medio';
    } else {
        return 'bajo';
    }
}

function mostrarLeyendaYMarcadores(mymap) {
    fetch('http://localhost:8080/medicionConTipoValorEntreFechas/2023-10-14 16:32:40/2023-10-16 16:32:40', {
        method: "GET"
    }).then(function (respuesta) {

        if (respuesta.ok) {
            return respuesta.json()
        } else {
            console.log("hubo un fallo")
        }

    }).then(function (datos) {
        console.log("Los datos del mapa bien" + JSON.stringify(datos));
        const datosJSON = JSON.stringify(datos)
        // Crea un objeto para almacenar las capas
        const capas = {};

        // Crea el control de capas y añádelo al mapa
        const controlCapas = L.control.layers(null, capas).addTo(mymap);

        const alto = [];
        const medio = [];
        const bajo = [];

        const umbralAlto = 30;
        const umbralMedio = 15;

        datos.forEach(markerData => {
            const tipo = `${markerData.tipo_valor}`;
            // ... (resto del código)

            // Clasifica la medición en la lista correspondiente
            if (markerData.valor > umbralAlto) {
                alto.push(markerData);
            } else if (markerData.valor > umbralMedio) {
                medio.push(markerData);
            } else {
                bajo.push(markerData);
            }
        });

        datos.forEach(markerData => {
            const tipo = `${markerData.tipo_valor}`;
            if (!capas[tipo]) {
                capas[tipo] = L.layerGroup(); // Crea una capa de grupo para cada tipo de dato
                console.log("Número de tipo_valor:", Number(tipo.split(' ')[1]));
                const cuadroColor = `<span style="display:inline-block; width: 12px; height: 12px; background-color: ${getColor(markerData.tipo_valor)}; margin-right: 5px;"></span>`;
                controlCapas.addOverlay(capas[tipo], `${cuadroColor} ${tipo}`);
            }
        });

        console.log("Alto: " + JSON.stringify(alto));
        console.log("Medio: " + JSON.stringify(medio));
        console.log("Bajo: " + JSON.stringify(bajo));

        alto.forEach(markerData => {
            const tipo = `${markerData.tipo_valor}`;
            
            // Dividir la cadena 'lugar' en latitud y longitud
            const [latitud, longitud] = markerData.lugar.split(',').map(parseFloat);

            console.log("Lat: " + latitud + ", Lon: " + longitud);
            const marker = L.marker([latitud, longitud], { icon: getCustomIcon('alto') }).addTo(mymap);
            marker.bindPopup(`Tipo: ${markerData.tipo_valor}<br>Valor: ${markerData.valor}`);
            addToLegend(markerData.tipo_valor);
            //marker.setIcon(getCustomIcon(markerData.tipo_valor, 'red'));

            // Añade el marcador a la capa correspondiente
            capas[tipo].addLayer(marker);
        });

        medio.forEach(markerData => {
            const tipo = `${markerData.tipo_valor}`;
            
            // Dividir la cadena 'lugar' en latitud y longitud
            const [latitud, longitud] = markerData.lugar.split(',').map(parseFloat);

            console.log("Lat: " + latitud + ", Lon: " + longitud);
            const marker = L.marker([latitud, longitud], { icon: getCustomIcon('medio') }).addTo(mymap);
            marker.bindPopup(`Tipo: ${markerData.tipo_valor}<br>Valor: ${markerData.valor}`);
            addToLegend(markerData.tipo_valor);
            //marker.setIcon(getCustomIcon(markerData.tipo_valor, 'yellow'));

            // Añade el marcador a la capa correspondiente
            capas[tipo].addLayer(marker);
        });

        bajo.forEach(markerData => {
            const tipo = `${markerData.tipo_valor}`;
            
            // Dividir la cadena 'lugar' en latitud y longitud
            const [latitud, longitud] = markerData.lugar.split(',').map(parseFloat);

            console.log("Lat: " + latitud + ", Lon: " + longitud);
            const marker = L.marker([latitud, longitud], { icon: getCustomIcon('bajo') }).addTo(mymap);
            marker.bindPopup(`Tipo: ${markerData.tipo_valor}<br>Valor: ${markerData.valor}`);
            addToLegend(markerData.tipo_valor);
            //marker.setIcon(getCustomIcon(markerData.tipo_valor, 'green'));

            // Añade el marcador a la capa correspondiente
            capas[tipo].addLayer(marker);
        });
    })
}

//-------------------------------------------
//-------------------------------------------

generarYGenerarMapa();
setInterval(generarYGenerarMapa, 50000);
//generarYGenerarMapa();