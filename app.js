/* ----------------------- IMPORTS ----------------------- */
const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./services/server');
const http = require('http').createServer(app)
const io = require('socket.io')(http);


/* ----------------------- CHAT ----------------------- */
const messagesModel = require('./models/mensajes');


io.on('connection', (socket)=>{
    console.log("User connected");

    messagesModel.find({}).lean()
        .then((myMessages) => socket.emit('messages', myMessages))
        .catch((err) => res.send(err));

    socket.on('new-message', function(data) {

        console.log(data);

        const messageSaved = new messagesModel({
            userEmail: data.userEmail,
            tipo: data.tipo,
            timestamp: data.timestamp,
            mensaje: data.mensaje
        });

        console.log(messageSaved);

        messageSaved.save()
            .then( () => io.emit('messages', messageSaved))
            .catch( (err) => res.status(400).json({
                status: 400,
                message: err
            }));
        
    })
})

/* ----------------------- SERVER + DB CONNECTION ----------------------- */

http.listen( process.env.PORT|| process.env.DEV_PORT, ()=>{
    mongoose.connect(process.env.DB_CONN, 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
    )
        .then( () => console.log('Base de datos conectada') )
        .catch( (err) => console.log(err) );
    console.log(`Running on PORT ${process.env.DEV_PORT} - PID WORKER ${process.pid}`);
        
});

