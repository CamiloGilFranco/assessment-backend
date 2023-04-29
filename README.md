# API FAVS (Assessment-Backend)

## Indice

- [API FAVS (Assessment-Backend)](#api-favs-assessment-backend)
  - [Indice](#indice)
  - [Introducción](#introducción)
  - [Base de datos](#base-de-datos)
  - [Primeros pasos](#primeros-pasos)
  - [Funcionalidades](#funcionalidades)
    - [Registro de un nuevo usuario](#registro-de-un-nuevo-usuario)
    - [Login de usuario](#login-de-usuario)
    - [Crear una lista de favoritos](#crear-una-lista-de-favoritos)
    - [Eliminar una lista de favoritos](#eliminar-una-lista-de-favoritos)
    - [Obtener todas las listas de un usuario (sin su contenido)](#obtener-todas-las-listas-de-un-usuario-sin-su-contenido)
    - [Agregar un item a una lista de favoritos](#agregar-un-item-a-una-lista-de-favoritos)
    - [Eliminar un item de una lista de favoritos](#eliminar-un-item-de-una-lista-de-favoritos)
    - [Obtener todos los items de una lista de favoritos](#obtener-todos-los-items-de-una-lista-de-favoritos)
    - [Actualizar email de usuario](#actualizar-email-de-usuario)
    - [Actualizar contraseña de usuario](#actualizar-contraseña-de-usuario)
    - [Eliminar de usuario](#eliminar-de-usuario)
  - [Preguntas](#preguntas)

## Introducción

¡Bienvenido a la documentación de la API FAVS! Esta API está diseñada para permitir el desarrollo frontend de una aplicación que brinde a los usuarios funciones como crear, modificar y eliminar sus propias listas de favoritos, así como realizar otras acciones relacionadas con su cuenta de usuario.

La API se ha desarrollado utilizando tecnologías modernas como Node.js, Express, JWT y Bcrypt, lo que garantiza la seguridad y escalabilidad de la aplicación. La autenticación se gestiona mediante JWT y Bcrypt, lo que garantiza que solo los usuarios autenticados puedan realizar acciones en su propia cuenta y lista de favoritos.

Es importante destacar que en las respuestas a las peticiones, el dato predominante es el id de las listas o ítems para facilitar el manejo desde el frontend.

En esta documentación, se proporciona una descripción detallada de todas las funciones disponibles en la API, incluidos los parámetros de entrada requeridos y las respuestas de salida esperadas. También se incluyen ejemplos de solicitudes y respuestas en formato JSON.

Es importante mencionar que para la eliminación de usuarios y la modificación de contraseñas, se solicita la confirmación de la contraseña actual del usuario para garantizar la seguridad de la cuenta.

¡Esperamos que esta documentación te ayude a comprender y utilizar la API FAVS! Si tienes alguna pregunta o problema, no dudes en ponerte en contacto [LinkedIn](https://www.linkedin.com/in/adrian-camilo-gil-franco/)

## Base de datos

Para el desarrollo de esta aplicación se realizo el diseño de una base de datos relacional con PostreSQL y Prisma, a continuación se muestra el diagrama entidad relación de la base de datos.

![DB](assets/DB.png)

## Primeros pasos

Para el correcto funcionamiento de la aplicación se deben seguir los siguientes pasos:

- Desde la terminal de comandos, instalar las dependencias del proyecto usando el comando

```
npm install
```

- Crear una nueva base de datos en PostgreSQL
- En la carpeta raíz de la aplicación, crear un archivo llamado `.env`
- dentro de el archivo .env, crear 3 variables con la siguiente estructura, tenga en cuneta que en la primera linea se deben cambiar los datos por los de su base de datos en PostgreSQL

```env
DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@localhost:PUERTO-DE-LA-BASE-DE-DATOS/NOMBRE-DE-LA-BASE-DE-DATOS?schema=public"
PORT=8080
SECRET_KEY="114v3cri19706r4f1c4"
```

- Al momento de la creación de la base de datos esta esta vacía, por lo tanto, debe ser llenada con una lista de items de los cuales los usuarios seleccionaran para elaborar sus listas de favoritos, para esto, la aplicación cuenta con un seeder que llenara la entidad "favorite_items" con 100 artículos. Este se ejecuta desde la terminal con el comando

```
npm run prisma:seed
```

- Iniciar el servidor ejecutando desde la terminal el comando

```
npm run start
```

## Funcionalidades

### Registro de un nuevo usuario

La creación de nuevos usuarios esta protegida con "Json Web Token" y "Bcrypt" haciendo que los datos del usuario permanezcan cifrados.

- ENDPOINT:

```
http://localhost:8080/api/local/signup
```

- TIPO DE PETICIÓN: `Post`

- PETICIÓN:

En el cuerpo de la petición se debe incluir las claves "email" y "password"

```json
{
  "email": "test@gmail.com",
  "password": "Contraseña1234"
}
```

- RESPUESTA:

Si la creación de usuario es exitosa, la respuesta incluirá el email del usuario y el token de autenticación

```json
{
  "message": "User created",
  "data": {
    "email": "test@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZ3p1ajVzbzAwMDA1NTZzaDJldjlmM2ciLCJpYXQiOjE2ODI2NDM1NjJ9.78k-eIvi2eOE6YFpUUK8_55f5vfGLSGR4Cr-bwXHKrg"
}
```

### Login de usuario

- ENDPOINT:

```
http://localhost:8080/api/local/login
```

- TIPO DE PETICIÓN: `Post`

- PETICIÓN:

En el cuerpo de la petición se debe incluir las claves "email" y "password"

```json
{
  "email": "test@gmail.com",
  "password": "Contraseña1234"
}
```

- RESPUESTA:

Si las credenciales del usuario son correctas, la respuesta incluirá el email del usuario y el token de autenticación

```json
{
  "message": "User found",
  "data": {
    "email": "test@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZ3p1ajVzbzAwMDA1NTZzaDJldjlmM2ciLCJpYXQiOjE2ODI2NDM4MTZ9.ZosuH3pWkbqZmX1DLcCsIR1vl_5b4XjGLCtNYj568CA"
}
```

### Crear una lista de favoritos

Para crear una lista de favoritos, el usuario debe estar autenticado y su sesión debe estar activa, es decir, su token de autenticación debe estar vigente

- ENDPOINT:

```
http://localhost:8080/api/list
```

- TIPO DE PETICIÓN: `Post`

- PETICIÓN:

En el cuerpo de la petición se debe incluir el nombre de la nueva lista de favoritos con la clave "name"

```json
{
  "name": "Mi nueva lista"
}
```

En los headers de la petición se debe incluir la llave "Authorization" cuyo valor debe ser "Bearer _TOKEN_"

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZ3loczVudjAwMDY1NTRrNmZ6aGVzN2MiLCJpYXQiOjE2ODI1NjE2ODB9.lhphXDb7Ghaf3-7PX6ozGS0M2tcgKzJX7PC4p3Ys14w"
}
```

- RESPUESTA:

Si la petición es exitosa, la respuesta incluirá el id de la nueva lista y su nombre

```json
{
  "message": "List created",
  "data": {
    "id": "clgzuznnq0003556sixyicrbu",
    "list_name": "Mi nueva lista"
  }
}
```

### Eliminar una lista de favoritos

Para eliminar una lista de favoritos, el usuario debe estar autenticado y su sesión debe estar activa, es decir, su token de autenticación debe estar vigente.

Al eliminar una lista se eliminaran todos los registros que esta contiene

- ENDPOINT:

```
http://localhost:8080/api/list
```

- TIPO DE PETICIÓN: `Delete`

- PETICIÓN:

En el cuerpo de la petición se debe incluir el id de la lista de favoritos a eliminar

```json
{
  "id": "clgzuznnq0003556sixyicrbu"
}
```

En los headers de la petición se debe incluir la llave "Authorization" cuyo valor debe ser "Bearer _TOKEN_"

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZ3loczVudjAwMDY1NTRrNmZ6aGVzN2MiLCJpYXQiOjE2ODI1NjE2ODB9.lhphXDb7Ghaf3-7PX6ozGS0M2tcgKzJX7PC4p3Ys14w"
}
```

- RESPUESTA:

Si la petición es exitosa, la respuesta incluirá el id de la lista eliminada y su nombre

```json
{
  "message": "List deleted",
  "data": {
    "id": "clgzuznnq0003556sixyicrbu",
    "list_name": "Mi nueva lista"
  }
}
```

### Obtener todas las listas de un usuario (sin su contenido)

Para obtener las listas de favoritos, el usuario debe estar autenticado y su sesión debe estar activa, es decir, su token de autenticación debe estar vigente

- ENDPOINT:

```
http://localhost:8080/api/list
```

- TIPO DE PETICIÓN: `Get`

- PETICIÓN:

El cuerpo de la petición debe estar vacío

En los headers de la petición se debe incluir la llave "Authorization" cuyo valor debe ser "Bearer _TOKEN_"

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZ3loczVudjAwMDY1NTRrNmZ6aGVzN2MiLCJpYXQiOjE2ODI1NjE2ODB9.lhphXDb7Ghaf3-7PX6ozGS0M2tcgKzJX7PC4p3Ys14w"
}
```

- RESPUESTA:

Si la petición es exitosa, la respuesta incluirá el id de cada lista y su nombre

```json
{
  "message": "List found",
  "data": [
    {
      "id": "clgzv6dd40005556skmxf9qrm",
      "list_name": "Mi nueva lista 1"
    },
    {
      "id": "clgzv6hh80007556suf4za5f3",
      "list_name": "Mi nueva lista 2"
    },
    {
      "id": "clgzv6kyy0009556s7iaqn3j5",
      "list_name": "Mi nueva lista 3"
    }
  ]
}
```

### Agregar un item a una lista de favoritos

- ENDPOINT:

```
http://localhost:8080/api/favorite
```

- TIPO DE PETICIÓN: `Get`

- PETICIÓN:

En el cuerpo de la petición se debe incluir el id de la lista de favoritos y el id del item a agregar

```json
{
  "favorite_list": "clgyht46u000f554kgiy90ehz",
  "favorite_item": "clgx161in000d55q0r1h5sgd9"
}
```

- RESPUESTA:

Si la petición es exitosa, la respuesta incluirá el id del nuevo registro, el id de la lista y el id del item agregado

```json
{
  "message": "Item created",
  "data": {
    "id": "clgzvh1rv000b556s10q0r3a9",
    "favorite_listsId": "clgzv6dd40005556skmxf9qrm",
    "favorite_itemsId": "clgypoa91000055x4ufctv6sg"
  }
}
```

### Eliminar un item de una lista de favoritos

- ENDPOINT:

```
http://localhost:8080/api/favorite
```

- TIPO DE PETICIÓN: `Delete`

- PETICIÓN:

En el cuerpo de la petición se debe incluir el id del registro a eliminar

```json
{
  "id": "clgyjaytn000155goo0qxo9s3"
}
```

- RESPUESTA:

Si la petición es exitosa, la respuesta incluirá el id del registro eliminado, el id de la lista y el id del item

```json
{
  "message": "Item deleted",
  "data": {
    "id": "clgzvh1rv000b556s10q0r3a9",
    "favorite_listsId": "clgzv6dd40005556skmxf9qrm",
    "favorite_itemsId": "clgypoa91000055x4ufctv6sg"
  }
}
```

### Obtener todos los items de una lista de favoritos

- ENDPOINT:

```
http://localhost:8080/api/favorite
```

- TIPO DE PETICIÓN: `Get`

- PETICIÓN:

En el cuerpo de la petición se debe incluir el id de la lista

```json
{
  "favorite_list": "clgyht46u000f554kgiy90ehz"
}
```

- RESPUESTA:

Si la petición es exitosa, la respuesta incluirá el id de cada registro, el id de la lista y el id del item

```json
{
  "message": "List items found",
  "data": [
    {
      "id": "clgzvofbo000d556sx45iyjch",
      "favorite_listsId": "clgzv6dd40005556skmxf9qrm",
      "favorite_itemsId": "clgypoa91000055x4ufctv6sg"
    },
    {
      "id": "clgzvoug7000f556s78m0mug0",
      "favorite_listsId": "clgzv6dd40005556skmxf9qrm",
      "favorite_itemsId": "clgypoa91000955x4bv0of5th"
    },
    {
      "id": "clgzvp480000h556s7fgswofb",
      "favorite_listsId": "clgzv6dd40005556skmxf9qrm",
      "favorite_itemsId": "clgypoa91000b55x4quge8giv"
    }
  ]
}
```

### Actualizar email de usuario

Para actualizar el email, el usuario debe estar autenticado y su sesión debe estar activa, es decir, su token de autenticación debe estar vigente

- ENDPOINT:

```
http://localhost:8080/api/users/email
```

- TIPO DE PETICIÓN: `Put`

- PETICIÓN:

En el cuerpo de la petición se debe incluir el nuevo email del usuario

```json
{
  "email": "minuevoemail@gmail.com"
}
```

En los headers de la petición se debe incluir la llave "Authorization" cuyo valor debe ser "Bearer _TOKEN_"

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZ3loczVudjAwMDY1NTRrNmZ6aGVzN2MiLCJpYXQiOjE2ODI1NjE2ODB9.lhphXDb7Ghaf3-7PX6ozGS0M2tcgKzJX7PC4p3Ys14w"
}
```

- RESPUESTA:

Si la petición es exitosa, la respuesta incluirá el nuevo email del usuario

```json
{
  "message": "email updated",
  "data": {
    "email": "minuevoemail@gmail.com"
  }
}
```

### Actualizar contraseña de usuario

Para actualizar la contraseña, el usuario debe estar autenticado y su sesión debe estar activa, es decir, su token de autenticación debe estar vigente

- ENDPOINT:

```
http://localhost:8080/api/users/password
```

- TIPO DE PETICIÓN: `Put`

- PETICIÓN:

En el cuerpo de la petición se debe incluir la contraseña antigua y la nueva

```json
{
  "old_password": "Contraseña1234",
  "new_password": "Contraseña4321"
}
```

En los headers de la petición se debe incluir la llave "Authorization" cuyo valor debe ser "Bearer _TOKEN_"

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZ3loczVudjAwMDY1NTRrNmZ6aGVzN2MiLCJpYXQiOjE2ODI1NjE2ODB9.lhphXDb7Ghaf3-7PX6ozGS0M2tcgKzJX7PC4p3Ys14w"
}
```

- RESPUESTA:

Si la petición es exitosa, la respuesta incluirá el email del usuario

```json
{
  "message": "password updated",
  "data": {
    "email": "minuevoemail@gmail.com"
  }
}
```

### Eliminar de usuario

Para eliminar su cuenta, el usuario debe estar autenticado y su sesión debe estar activa, es decir, su token de autenticación debe estar vigente.

Al eliminar un usuario, se eliminaran todos sus listas con su respectivo contenido

- ENDPOINT:

```
http://localhost:8080/api/users
```

- TIPO DE PETICIÓN: `Delete`

- PETICIÓN:

En el cuerpo de la petición se debe incluir la contraseña del usuario

```json
{
  "password": "Contraseña4321"
}
```

En los headers de la petición se debe incluir la llave "Authorization" cuyo valor debe ser "Bearer _TOKEN_"

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsZ3loczVudjAwMDY1NTRrNmZ6aGVzN2MiLCJpYXQiOjE2ODI1NjE2ODB9.lhphXDb7Ghaf3-7PX6ozGS0M2tcgKzJX7PC4p3Ys14w"
}
```

- RESPUESTA:

Si la petición es exitosa, la respuesta incluirá el email del usuario eliminado

```json
{
  "message": "User deleted",
  "data": {
    "user": "minuevoemail@gmail.com"
  }
}
```

## Preguntas

1. Indique cuales son las partes de la siguiente url: https://backend.mega-app.com.co:8080/api/articles/search?docid=1020&hl=en#dayone
   ![](assets/url.png)

- **PROTOCOLO:** http://
- **DOMINIO:** backend.mega-app.com.co
- **PUERTO:** :8080
- **RUTA:** /api/articles/
- **PARÁMETROS DE BÚSQUEDA:** search?docid=1020&hl=en
- **ETIQUETA:** #dayone

2. Definir qué es una Web API, Restful y cuáles son los códigos de estado 200-, 400-, 500-

   REST (Representational State Transfer) es un estilo de arquitectura de software que se utiliza para crear servicios web escalables y mantenibles. Una API RESTful es una interfaz de programación de aplicaciones que sigue los principios de REST y utiliza el protocolo HTTP para permitir que diferentes aplicaciones se comuniquen y compartan información a través de la web.

   Los código 200 indican que la solicitud ha sido exitosa, los 400 indican un error en la solicitud del cliente y los 500 indican un error interno del servidor.

3. Cuando hablamos de CRUD, ¿qué significa?

   CRUD significa "Create, Read, Update, Delete" y se utiliza para describir las cuatro operaciones básicas que se pueden realizar en una base de datos.

   - Create: Crear o agregar nuevos registros o datos a la base de datos o sistema.
   - Read: Leer o recuperar datos existentes de la base de datos o sistema.
   - Update: Actualizar o modificar los datos existentes en la base de datos o sistema.
   - Delete: Eliminar o borrar los datos existentes en la base de datos o sistema.
