const express = require("express");
const path = require('path');
const app = express();

// Settings
app.set("PORT", process.env.PORT || 8080);

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname + "public")));
app.use('/productos', require("./routes/productosRoutes"));
app.use('/carrito', require("./routes/carritoRoutes"));

// default

app.get("/", (req, res)=> {
    res.send("hello");
})

// Server
app.listen(app.get("PORT"), () => console.log(`Server running on port ${app.get("PORT")}`));