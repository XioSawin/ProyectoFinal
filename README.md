# Curso Backend - MERN Stack: Proyecto Final
E-commerce project

***currently problem: unable to login/register - req.isAuthenticated() always returns FALSE***

## **Endpoints**

**MAIN ROUTE = /api**

### MAIN (/api/auth)

* GET /login - formulario de login. If sesión iniciada/usuario autenticado: redirección a "welcome" screen.
* POST /login - formulario de login. If logged in ok: redirección a "welcome" screen. 
  * body: {username, password} - enviar token via POSTMAN.
* GET /faillogin - redirección cuando el login is unsuccesful.
* POST /logout - cerrar sesión activa.

* GET /register - formulario de registro. If sesión iniciada/usuario autenticado: redirección a "welcome" screen.
* POST /register - formulario de registro. 
  * body: {username, password, passwordConfirm*, name, address, phoneNumber}. (*verificación de pwrd correcta - por defecto, admin = 'user'*)
* GET /failregistro - redirección cuando el registro is unsuccesful.

### PRODUCTS (/api/products)

* GET /:id? - obtener array de productos. Todos o por ID (pasado por parámetros)
* GET /cat/:categoria - obtener array de productos por categoría (pasado por parámetros)
* POST / - addProducto a la base de datos.
  * body: {nombre, descripcion, precio, foto (http url), categoria, stock} 
* PATCH /:id - actualizar producto en la base de datos enviando el "_id" (mongo) por parámetro.
  * body: {nombre, descripcion, precio, foto (http url), categoria, stock} 
* DELETE /:id - eliminar el producto de la base de datos enviando el "_id" por parámetro

### ORDERS (/api/orders)

* GET /:userID - obtener array de órdenes relacionadas al userID (pasado por parámetros). 
* GET /:numOrden - obtener órden por su numOrden (pasado por parámetros)
* POST /checkout/:userID - enviar orden completa, pasar userID por parámetros para encontrar el carrito relacionado. Obtiene datos del carrito.
* POST /complete/:numOrden - pasar la orden a estado completed. (numOrden pasado por parámetros).

### CART (/api/cart)

* GET /:userID - obtener carrito relacionado al userID (pasar por parámetros).
* POST / - agregar producto al carrito.
  * body: { userID, productID, cantidad, userEmail, direccion }.
* DELETE /:product:ID - eliminar producto del carrito. pasar por body userID (para encontrar carrito relacionado) y por parámetros productID (del producto que se quiere eliminar del carrito).
 * body: {userID}

### CHAT (/api/chat)

* Para utilizar el chat hay que ingresar a la URL desde el navegador y hacer uso del formulario de entrada de los mensajes: {email, timestamp, tipo, mensaje}. (*tipo se refiere a si es el mensaje es enviado por 'user' o por 'system'*).
* GET / - obtener todos los chats ingresados.
* GET /:email - obtener chats enviados desde/hacia el email del usuario en cuestión (pasado por parámetros).

### SYSTEM (/api/system)

* GET / - obtener información del sistema provista por 'process'.

## Info adicional

Heroku URL: https://coderhouse-sawin-ecommerce.herokuapp.com/

