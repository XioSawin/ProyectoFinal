# Curso Backend - MERN Stack: Proyecto Final
E-commerce project

***currently pending final testing. will be completed by 10/08 or 11/08***

## **Endpoints**

**MAIN ROUTE = /api**

### MAIN (/api/auth/)

* POST /login - formulario de login. If logged in ok: redirección a "welcome" screen. 
  * body: {username, password}.
* GET /faillogin - redirección cuando el login is unsuccesful.
* POST /logout - cerrar sesión activa.
* POST /register - formulario de registro. If registro ok: redirección a "welcome" screen.
  * body: {username, password, name, address, phoneNumber, admin (string - "admin" o "user"}.
* GET /failregistro - redirección cuando el registro is unsuccesful.

### PRODUCTS (/api/products)

* GET /:id? - obtener array de productos. Todos o por ID (pasado por parámetros)
* GET /:categoria - obtener array de productos por categoría (pasado por parámetros)
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

* GET /:id - obtener carrito relacionado al userID (pasar por parámetros).
* POST / - agregar producto al carrito.
  * body: { userID, productID, cantidad, userEmail, direccion }.
* DELETE /:userID/:product:ID - eliminar producto del carrito. pasar por parámatetros userID (para encontrar carrito relacionado) y productID (del producto que se quiere eliminar del carrito).

### CHAT (/api/chat)

* GET / - obtener todos los chats ingresados.
* GET /:email - obtener chats enviados desde/hacia el email del usuario en cuestión (pasado por parámetros).

## Info adicional

Heroku URL: https://server-xio-ecommerce-finalproy.herokuapp.com/

