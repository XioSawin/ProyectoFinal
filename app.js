/* ----------------------- IMPORTS ----------------------- */
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const MongoStore = require('connect-mongo');
//const cluster = require('cluster');
const compression = require('compression');

const { Socket } = require('dgram');
const io = require('socket.io')(http);

//const log4js = require('log4js');
//const nodemailer = require('nodemailer');
require('dotenv').config();

//const fs = require('fs');
//const path = require ('path');


const app = express();
app.use(compression());

/* -------------- routes -------------- */

const users = require('./routes/usersRoutes');
const main = require('./routes/mainRoutes');
const productos = require('./routes/productosRoutes');
const orders = require('./routes/ordenRoutes');
const cart = require('./routes/carritoRoutes');
const mensajes = require('./routes/mensajesRoutes');

app.use('/', main);
app.use('/users', users);
app.use('/products', productos);
app.use('/orders', orders);
app.use('/cart', cart);
app.use('/chat', mensajes);


/* ----------------------- CONSTANTS ----------------------- */
// const portCL = 3304;
// const numCPUs = require('os').cpus().length;
//const modoCluster = process.argv[2] == 'CLUSTER';



/* -------------- PASSPORT -------------- */
const passport = require('passport');
//const FacebookStrategy = require('passport-facebook').Strategy;

//const bCrypt = require('bCrypt');
//const LocalStrategy = require('passport-local').Strategy;

/* ----------------------------------------------------------------- */

/* ----------------------- CONFIGURATION - MIDDLEWARES ----------------------- */

app.use(express.json());
app.use(express.urlencoded({extended:true}));
    
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.DB_SESSIONS_CONN,
        ttl: 600
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}));


app.engine(
    "hbs", 
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());


/* ----------------------- SERVER + DB CONNECTION ----------------------- */
app.listen( process.env.PORT|| process.env.DEV_PORT, ()=>{
    mongoose.connect(process.env.DB_CONN, 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
    )
        .then( () => console.log('Base de datos conectada') )
        .catch( (err) => console.log(err) );
    console.log(`Running on PORT ${portCL} - PID WORKER ${process.pid}`);
        
})



/* ----------------------- COMMMENTED ----------------------- */

/*


//const FACEBOOK_APP_ID = '494152521729245'; 
//const FACEBOOK_APP_SECRET = '0054580944040256224462c493ac1ffb'; 

const productoModel = require('./models/producto');

----------------------- ROUTES PRODUCTS ----------------------- 
//CREATE PRODUCT
app.post('/productos', (req, res) => {
    const producto = req.body;
    
    const productSaved = new productoModel(producto);
    productSaved.save()
        .then( () => res.sendStatus(201) )
        .catch( (err) => res.send(err))
})
    
//READ ALL PRODUCTS
app.get('/productos', (req, res) => {

    // FILTER PRODUCTS BY PRICE RANGE
    const { preciogt } = req.query;
    const { preciolt } = req.query;

    // FILTER PRODUCTS BY STOCK RANGE
    const { stockgt } = req.query;
    const { stocklt } = req.query;

    productSaved.find( {} )
        .then((productos) => res.send(productos))
        .catch((err) => res.send(err))
})

// UPDATE BY PRODUCT CODE
app.put('/productos/:codigo', (req, res) => {
    const { codigo } = req.params;
    const { precio } = req.body;

    productSaved.updateOne({codigo: codigo}, {
        $set: {precio: precio}
    })
        .then((updatedProduct) => res.send(updatedProduct))
        .catch((err) => res.send(err))
})

//READ BY PRODUCT CODE
app.get('/productos/:codigo', (req, res) => {
    const { codigo } = req.params;

    userModel.findOne( {codigo: codigo} )
        .then((producto) => res.send(producto))
        .catch((err) => res.send(err))
})

//READ BY PRODUCT NAME
app.get('/productos/:nombre', (req, res) => {
    const { nombre } = req.params;

    userModel.findOne( {nombre: nombre} )
        .then((producto) => res.send(producto))
        .catch((err) => res.send(err))
})

//DELETE BY PRODUCT CODE
app.delete('/productos/:codigo', (req, res) => {
    const { codigo } = req.params;

    userModel.deleteOne( {codigo: codigo} )
        .then(() => res.sendStatus(200))
        .catch((err) => res.send(err))
})


 ----------------------- MIDDLEWARE ----------------------
//app.use(express.static(path.join(__dirname + "public")));
//app.use('/productos', productos.router);
//app.use('/carrito', require("./routes/carritoRoutes"));


 MASTER 
if(modoCluster && cluster.isMaster) {
    // if Master, crea workers

    loggerInfo.info(`Master ${process.pid} is running`);

    // fork workers
    for (let i=0; i<numCPUs; i++){
        cluster.fork();
    };

    cluster.on('exit', (worker) => {
        loggerInfo.info(`Worker ${worker.process.pid} died`);
    });
} else {

   ----------------------- LOGIN ----------------------- 
    -------------- local strategy -------------- 

    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
        function(req, username, password, done) {
            // ver en db si existe el username
            userModel.findOne({ 'username' : username },
                function(err, user) {
                    // If there is an error
                    if(err) {
                        return done(err);
                    }
                    // If username does not exist on db
                    if(!user) {
                        loggerError.info(`Usuario "${username}" no encontrado`);
                        loggerError.info('message', 'Usuario no encontrado');
                        return done(null, false);
                    }
                    // User exists but wrong pwrd
                    if(!isValidPassword(user, password)) {
                        loggerError.info('Contrasena no valida');
                        loggerError.info('message', 'Invalid Password');
                        return done(null, false);
                    }
                    // si alles is goed
                    return done(null, user);
                }
            );
        })
    );

    -------------- check valid password -------------- 
    const isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    } 
    
    -------------- routes -------------- 

    app.get('/login', (req, res)=>{
        if(req.isAuthenticated()){
            res.render("welcome", { user: user});
        }
        else {
            res.sendFile(process.cwd() + '/public/login.html')
        }
    })

    app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin'}), (req, res) => {
        res.redirect('/')
    })

    app.get('/faillogin', (req, res) => {
        res.render('login-error', {});
    })

    app.get('/logout', (req, res)=>{
        let nombre = req.user.name;

        req.logout();
        res.render("logout", { nombre });
        
    });

    ----------------------- LOGGERS ----------------------- 
    log4js.configure({
        appenders: {
            miLoggerConsole: {type: "console"},
            miLoggerFileWarning: {type: 'file', filename: 'warn.log'},
            miLoggerFileError: {type: 'file', filename: 'error.log'}
        },
        categories: {
            default: {appenders: ["miLoggerConsole"], level:"trace"},
            info: {appenders: ["miLoggerConsole"], level: "info"},
            warn: {appenders:["miLoggerFileWarning"], level: "warn"},
            error: {appenders: ["miLoggerFileError"], level: "error"}
        }
    });

    const loggerInfo = log4js.getLogger('info');
    const loggerWarn = log4js.getLogger('warn');
    const loggerError = log4js.getLogger('error');

*/