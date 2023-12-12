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
    return type === 'CO' ? 'red' : type === 'O3' ? 'blue' : type === 'NO' ? 'yellow' : type === 'SO2' ? 'pink' : 'green';
}

let mymap;

function generarYGenerarMapa() {
    // Eliminar el mapa si ya está inicializado
    if (mymap) {
        mymap.remove();
    }

    mymap = L.map('zonaMapa').setView([51.505, -0.09], 13);

    // Añade un mosaico de OpenStreetMap al mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);

    mostrarLeyendaYMarcadores(mymap);

    // Añade un marcador al mapa
    L.marker([51.505, -0.09]).addTo(mymap)
        .bindPopup('¡Hola, mundo!').openPopup();
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

var datosMediciones=[];
var marcadores=[];

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
        datosMediciones = datos
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

            marcadores.push(marker)

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

            marcadores.push(marker)

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

            marcadores.push(marker)

            // Añade el marcador a la capa correspondiente
            capas[tipo].addLayer(marker);
        });
    })
}

generarYGenerarMapa();
setInterval(generarYGenerarMapa, 50000);
//generarYGenerarMapa();


function downloadToPNG() {
    
    html2canvas(document.getElementById('zonaMapa'), {
        useCORS: true, // Necesario para capturar mapas de azulejos externos
    }).then(function (canvas) {
        // Crea un enlace temporal y establece la imagen como su contenido
        var link = document.createElement('a');

        // Convierte el canvas a una URL de datos PNG
        link.href = canvas.toDataURL('image/png');

        // Establece el nombre del archivo
        link.download = 'mapa.png';

        // Simula el clic en el enlace para iniciar la descarga
        link.click();
    });
}

function downloadToCSV() {

    var csv = "Latitud;Longitud;Contaminante;Valor;Fecha\n";

    var contador = 0;
    // Agregar datos de marcadores al CSV
    marcadores.forEach(function (medicion) {
        var lat = medicion._latlng.lat;
        var lng = medicion._latlng.lng;
        var valor = datosMediciones[contador].valor;
        var fecha = datosMediciones[contador].fecha
        var tipoValor = datosMediciones[contador].tipo_valor_id
        var contaminante="";
        switch(tipoValor){
            case 0:
                contaminante="Temperatura"
                break;
            case 1:
                contaminante = "Ozono-O3"
                break;
            case 2:
                contaminante = "Monoxido de nitrogeno-NO"
                break;
            case 3:
                contaminante = "Dioxido de Azufre-SO2"
                break;
            case 4:
                contaminante = "Monoxido de carbono-CO"
                break;

        }
        csv += lat + ';' + lng + ';' + contaminante + ';' + valor + ';' + fecha + '\n';
        contador++
    });


    // Crea un blob con el contenido CSV
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

    // Crea un enlace temporal y establece el blob como su contenido
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);

    // Establece el nombre del archivo CSV
    link.download = 'datos_mapa.csv';

    // Simula el clic en el enlace para iniciar la descarga
    link.click();
}

function downloadToExcel() {

    var excelHeaders = ["Latitud", "Longitud", "Contaminante", "Valor", "Fecha"];

    var contador = 0;
    
    var excelData = []
    marcadores.forEach(function (medicion) {
        var lat = medicion._latlng.lat;
        var lng = medicion._latlng.lng;
        var valor = datosMediciones[contador].valor;
        var fecha = datosMediciones[contador].fecha
        var tipoValor = datosMediciones[contador].tipo_valor_id
        var contaminante = "";
        switch (tipoValor) {
            case 0:
                contaminante = "Temperatura"
                break;
            case 1:
                contaminante = "Ozono-O3"
                break;
            case 2:
                contaminante = "Monoxido de nitrogeno-NO"
                break;
            case 3:
                contaminante = "Dioxido de Azufre-SO2"
                break;
            case 4:
                contaminante = "Monoxido de carbono-CO"
                break;

        }
        excelData.push([lat, lng, contaminante, valor, fecha])
        contador++
    });


    // Crear un nuevo libro de Excel
    var workbook = XLSX.utils.book_new();
    var worksheet = XLSX.utils.aoa_to_sheet([excelHeaders].concat(excelData));

    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos del Mapa');

    // Crear un blob con el contenido Excel
    var excelBinaryData = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    var blob = new Blob([s2ab(excelBinaryData)], { type: 'application/octet-stream' });

    // Crear un enlace temporal y establecer el blob como su contenido
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);

    // Establecer el nombre del archivo Excel
    link.download = 'datos_mapa.xlsx';
    // Simular el clic en el enlace para iniciar la descarga
    link.click();
}
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}