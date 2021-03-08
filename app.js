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

// timestamp

function getTimestamp(){
    let date = new Date();

    let d = date.getDate();
    let mo = date.getMonth() + 1;
    let y = date.getFullYear();
    let h = date.getHours();
    let mi = date.getMinutes();
    let s = date.getSeconds();

    let today = d + '/' + mo + '/' + y + ' ' + h + ':' + mi + ':' + s;

    return today;
}

// default

app.get("/", (req, res)=> {
    res.send("hello");
})

// Server
app.listen(app.get("PORT"), () => console.log(`Server running on port ${app.get("PORT")}`));
