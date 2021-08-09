/* ----------------------- IMPORTS ----------------------- */
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const handlebars = require('express-handlebars');
const MongoStore = require('connect-mongo');
const compression = require('compression');

const { Socket } = require('dgram');
const io = require('socket.io')(http);

require('dotenv').config();

const app = express();
app.use(compression());

/* -------------- routes -------------- */

const users = require('./routes/usersRoutes');
const main = require('./routes/mainRoutes');
const productos = require('./routes/productosRoutes');
const orders = require('./routes/ordenRoutes');
const cart = require('./routes/carritoRoutes');

app.use('/', main);
app.use('/users', users);
app.use('/products', productos);
app.use('/orders', orders);
app.use('/cart', cart);


/* -------------- PASSPORT -------------- */
const passport = require('passport');

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

/* ----------------------- CHAT W/ WEBSOCKETS ----------------------- */

const messagesModel = require('./models/mensajes');

const getMessages = () => {
    const messages = messagesModel.find({});

    return messages;
}

io.on('connection', (socket) => {
    socket.emit('messages', getMessages());

    socket.on('new-message', function(data) {

        const messageSaved = new messagesModel(data);

        messageSaved.save()
            .then( () => res.sendStatus(201) )
            .catch( (err) => res.status(400).json({
                status: 400,
                message: 'Error guardando mensake en base de datos'
            }));
        
        io.sockets.emit('messages', getMessages());
    })
})

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
