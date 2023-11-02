# serverSprint0
Servidor creado por Hugo Martin Escrihuela

En la carpeta docs del servidor esta el disenyo de todo el proyecto.

El servidor tiene como fin contener una base de datos, una logica para contactar con esta, una api REST para comunicar las aplicaciones externas y la logica y la web, tanto la ux como su logica y sus consultas.

-El servidor consta de cuatro partes:
    1. La carpeta bd, donde se almacena la base de datos y la estructura de esta.
    2. La carpeta logica contiene la logica que conecta con la base de datos, ademas de varios test
            --Para ejecutar los test hay que usar el comando 'npm test' en la carpeta logica
    3. La carpeta servidorREST contiene la api REST que sirve de enlace entre aplicaciones externas y la logica, ademas contiene el servidor
            --Para encender el servidor usaremos el comando 'npm run servidor' en la carpeta servidorREST
            --Posteriormente a activar el servidor tenemos test que podemos probar con 'npm test' en la misma carpeta
    4. La carpeta ux contiene la pagina web, tanto su ux como su logica para contactar con la api REST
            --Una vez que el servidor este encendido simplemente se actualizaran los valores mostrados en pantalla