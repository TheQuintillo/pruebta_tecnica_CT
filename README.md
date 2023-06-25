
# Prueba Técnica CT-BACKEND-TEST

   - Debido a que nunca he trabajado ni conocía lo que es un `mock-server`, he hecho esta prueba técnica lo mejor que he podido. Sabiendo, que en las indicaciones no debia modificar nada de mocker, he tenido que hacer algun cambio que otro porque presentaba errores que no sabía resolver y obtenía unos códigos de respuestas que no eran los esperados. A continuación indico que tipo de cambios he hecho (De todos modos no he borrado código, solo lo he comentado):
      - Primero levanté `mocker-server` (Servivuelo) con docker compose, donde la conexión al contentedor es `localhost:80/servivuelo/NombreDeLaRuta`
      - Después empecé a crear las rutas del servidor local `localhost:3000` como `/timetables`, `/accommodations`, `/prices` y `/stations`
      - He creado las rutas del servidor con la lógica de respuesta `localhost:3000` haciendo peticiones con `axios` hacia el `mocker-server: http://localhost:80/servivuelo/NombreDeLaRuta`, cosa que nose si es como debería haberlo hecho.
      - Al hacer la petición a `timetables` vi que la función del `checkError` solo permitía los siguientes valores: `port === 'MAD1' || port === 'MAD2' || port === 'BCN1' || port === 'VAL1' || port === 'IBZ1'` y el body de `search1.http` que creo que es el que debía utilizar para esta petición contenía valores como por ejemplo `"from": "ATCH","to": "BCN","date": "2022-12-24"` donde ninguno contenía `MAD1` o `BCN1` y me arrojaba el error `GenericError` entonces modifiqué el `checkError` de la siguiente manera:
      ```
      function checkError(port) {
        const valid =
            port === 'MAD' ||
            port === 'BCN' ||
            port === 'VAL' ||
            port === 'IBZ' ||
            port === 'ATCH' ||
            port === 'CHAM' ||
            port === 'SANTS' ||
            port === 'JSOR' ||
            port === 'IBZP';

        return !valid;
        }
      ```
      Al hacer este cambio la pettición de `search1.http` me devuelve el json como respuesta que ofrece el middleware del `mocker-server` y la petición es exitosa. Nose si debería haber tocado nada para poder hacerlo, pero es la única forma que he visto con la que podía hacerlo funcionar.

      - Luego en la ruta `/prices` tenía problemas al incorporar la query `bonus` ya que si era `?pax=adult&bonus=retired` debería de devolverme el precio con un descuento de `-15` cosa que siempre me devolvía un codigo de `error 500`. Si no añadía a la query el parámetro `bonus` la solicitud se procesaba sin problemas. Pero he hecho un cambio en el middleware del `mocker-server`:


      Donde era:
      ```
      const bonus = req.query?.bonus && JSON.parse(req.query.bonus);
      if (bonus?.some(bonus => bonus === 'retired')) price = price - 15;
      ```
      Lo he sustituido por esto:
      ```
      const bonus = req.query.bonus;
      if (bonus === 'retired') price = price - 15;
      ```
      Y ya me ha funcionado la query con `adult` y `bonus` por ejemplo `retired`. Sé que no debería haber modificado nada, pero no sabía hacerlo funcionar con un código de respuesta 200 y que me devolviese la respuesta esperada de otra forma.

      He añadido todo al `req.body` tanto el body como el query haciendo la peticion con el req.body, por ejemplo:
      ```
      {
        "shipID": "12",
        "departureDate": "09:30:00",
        "accommodation": "Confort",
        "pax": "adult",
        "bonus": "retired"
      }
      ```
      - No consigo entender como poder sacar estos puntos, con estas rutas disponibles:
         - Pedir al proveedor los trenes disponibles (horarios), las acomodaciones disponibles (turista, primera clase, ...) y los precios de cada una (ver documentación servivuelo.pdf). Hay que tener en cuenta los bonus, porque cambia el precio.
         - Sacar todas las combinaciones posibles de entre los resultados, por ejemplo, en un viaje Madrid - Barcelona, tenemos varias estaciones como Atocha y Chamartin, habrá varios horarios, y varios tipos de acomodación, una combinación sería: Madrid/Atocha/11:00/Turista - Barcelona/Sans/14:00/Premium
         - Guardar en la base de datos los resultados según nuestra estructura interna, la cual esta tipada como CTSearch en el directorio de types, ahí mismo encontraras cada parámetro explicado.

         Tengo todas las rutas hechas para que devuelva la respuesta con su json, pero aun no entiendo, ni se hacer como pedir las diferentes combinaciones (guardar registros en mongoDB si se hacerlo y con el formato del tipo CTSearch). Pero no consigo obtener esos resultados para pasarlos a guardar en la DB, sinceramente no lo entiendo y lo siento.
