function checkNumeroAvisos() {

    fetch('http://localhost:8080/usuarioSesion', {
        method: "GET"
    }).then(function (respuesta) {

        if (respuesta.ok) {
            return respuesta.text()
        } else {
            console.log("hubo un fallo")
        }

    }).then(function (datos) {
        //datos contiene el dni del admin que ha iniciado sesion
        
        //obtenemos la cantidad de anuncios que no se han leido
        fetch('http://localhost:8080/anuncioNoLeido/' + datos)
            .then(response => response.json())
            .then(data => {
                console.log("anuncioooo " + data);
                var anunciosSinLeerContador=0;
                data.forEach(item => {
                    anunciosSinLeerContador++;
                });
                console.log("anuncioooo " + anunciosSinLeerContador);

                if (anunciosSinLeerContador==0){
                    return;
                }
                const marcadorAvisosSinLeer = document.getElementById('marcaNotifAvisos')
                const marcadorAvisosSinLeerTexto = document.getElementById('numeroAvisos')

                marcadorAvisosSinLeerTexto.innerText = anunciosSinLeerContador;
                marcadorAvisosSinLeer.style.visibility='visible'
            })
            .catch(error => console.error('Error fetching data:', error));

    })
    
}
function enviarAPagAnuncios(){
    location.href="admin_avisos.html";
}