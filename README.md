# Baldur Documentacion

## Introduccion

    Baldur es una aplicacion web de mensajeria, diseñada para pequeños a moderados grupos de trabajo.
    El enfoque utilizado para su desarrollo es el de la simplicidad, manteniendo el scope de proyecto acotado, permitiendo asi su agil desarrollo.

### Mensajeria

    Baldur se presenta como una herramienta de mensajeria privada, imitando la propagacion de boca-a-boca del mundo real.
    Como afecta esto al usuario?
    Debido a nuestro enfoque dinamico, el usuario es capaz de enviar mensajes a multiples destinatarios, o a uno solo. Pero solo es capaz de recibir un mensaje una unica vez, y tras ser leido, este mensaje es descartado para siempre.

## API

### Endpoints

A continuacion se presenta una lista con la ruta y descripcion de los distintos endpoints:

| Ruta | Descripcion |
| ---- | ----------- |
| /api/setup | "Crea un usuario con permisos de administrador. Solo utilizado por back-office." |
| /api/users | "Devuelve la lista de usuarios." |
| /api/online | "Devuelve la lista de los usuarios online." |
| /api/sendMessage | "Envia mensaje a otro usuario." |
| /api/getMessages | "Recive los mensajes de un usuario." |
| /register | "Registra un nuevo usuario. Solo utilizado por back-office." |
| /authenticate | "Autentica a un usuario en la sesion, devolviendo su correspondiente token." |



#### Parametros de endpoint y respuesta esperada
##### /api/setup
 * Metodo: GET
 * Parametros: - 
 * Respuesta esperada: {    success: true     }
##### /api/users
 * Metodo: POST
 * Parametros: token
 * Respuesta esperada: { users }
##### /api/online
 * Metodo: POST
 * Parametros: token
 * Respuesta esperada: { users }
##### /api/sendMessage
 * Metodo: POST
 * Parametros: token, message, name
 * Respuesta esperada: {
                        "succes": true,
                        "message": "Mensaje enviado a destinatario correctamente"
                    }
##### /api/getMessage
 * Metodo: POST
 * Parametros: token
 * Respuesta esperada: { users }
##### /api/register
 * Metodo: POST
 * Parametros: name, password
 * Respuesta esperada: { success: true , message: 'Usuario registrado'}
##### /api/authenticate
 * Metodo: POST
 * Parametros: name, password
 * Respuesta esperada: {
                        success: true,
                        message: 'Token generado',
                        token: token
                     }



## Deploy

### Backend

1. Para correr el backend es necesario posicionarse sobre la carpeta raiz del proyecto:
    > BALDUR/

2. Luego se procede a realizar la instalacion de los paquetes necesarios:
    > npm install

3. Una vez instalados las dependencias, se procede a levantar el servidor:
    > npm start

### Frontend

1. Para correr el frontend es necesario posicionarse sobre la carpeta:
    > BALDUR/web/baldurweb/

2. Luego se procede a realizar la instalacion de los paquetes necesarios:
    > npm install

3. Una vez instalados las dependencias, se procede a levantar el servidor:
    > npm start

## Requerimientos:

    Implementar los distintos métodos de la API, para poder cumplir con las siguientes funcionalidades:

* Registro de usuario. (POST)
* Login y generar un token, para la utilizacion de la API y validarlo.
* Actualizar el estado del usuario conectado.
* Mostrar mensajes recibidos.(GET)
* Listar los contactos disponibles para el envio de mensajes. (GET)
* Enviar un mensaje a uno o mas usuarios. (POST)
* Inhabilitacion del token, luego de 10 minutos.

* Todas las respuestas deben respetar la estructura en formato JSON definida en el anexo.
* Implementar una interface de cliente que permita probar la API.
* Generar tests unitarios, sobre los metodos/modulos que considere criticos.

## Condiciones de entrega:

* Codigo fuente comentado.
* Tests implementados. Minimo 2.
* Documentacion necesaria para el deploy.
* Informe. El informe debera incluir un breve resumen del proyecto y justificacion de la implementacion realizada. Consideraciones particulares.
* La API rest, puede ser generada utilizando JAVA, Javascript o .net.
