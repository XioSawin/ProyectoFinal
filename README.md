# Curso Backend - MERN Stack: Proyecto Final
E-commerce project

***currently pending final testing + websocket application. will be solved by 10/08 or 11/08***

## **Endpoints**

### MAIN

* POST /login - formulario de login. If logged in ok: redirección a "welcome" screen.
* GET /faillogin - redirección cuando el login is unsuccesful.
* POST /logout - cerrar sesión activa.

### USERS

* POST /users/register - formulario de registro. If registro ok: redirección a "welcome" screen.
* GET /users/failregistro - redirección cuando el registro is unsuccesful.

### PRODUCTS

* GET /products/:id?
* GET /products/:categoria
* POST /products
* PATCH /products/:id
* DELETE /products/:id

### ORDERS

* GET /orders/:userID
* GET /orders/:numOrden
* POST /orders/:userID
* POST /orders/complete/:numOrden

### CART

* GET /cart/:id
* POST /cart
* DELETE /cart/:userID/:product:ID

### CHAT

* GET /chat
* GET /:email

