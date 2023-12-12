var textosACambiar = document.querySelectorAll("[data-value]")

function getTextos(){
    textosACambiar = document.querySelectorAll("[data-value]")
    console.log(textosACambiar.length)

    cambiaIdioma("es")
}

async function cambiaIdioma(languaje){
    const requestJson = await fetch('languajes/' + languaje + '.json')

    const texts = await requestJson.json()

    textosACambiar.forEach(function (elementoACambiar){
        var section = elementoACambiar.dataset.section;
        var valor = elementoACambiar.dataset.value;

        if (valor.includes("infoContaminante")){
            if(valor.includes("Ozono")){
                elementoACambiar.innerHTML = <img class="inset" src="images/ozono.png" alt="" /> + texts[section][valor]
            } else if (valor.includes("Nitrogeno")) {
                elementoACambiar.innerHTML = <img class="inset" src="images/nitrogeno.png" alt="" /> + texts[section][valor]
            } else if (valor.includes("Azufre")) {
                elementoACambiar.innerHTML = <img class="inset" src="images/azufre.png" alt="" /> + texts[section][valor]
            } else if (valor.includes("Carbono")) {
                elementoACambiar.innerHTML = <img class="inset" src="images/carbon.png" alt="" /> + texts[section][valor]
            } else if (valor.includes("Benceno")) {
                elementoACambiar.innerHTML = <img class="inset" src="images/benceno.png" alt="" /> + texts[section][valor]
            }
        } else{
            elementoACambiar.innerHTML=texts[section][valor]
        }
        
    })

}