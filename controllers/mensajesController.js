const express = require('express');
const app = express();

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
                message: 'Error guardando mensaje en base de datos'
            }));
        
        io.sockets.emit('messages', getMessages());
    })
})

const getChat = (req, res) => {
    res.render("chat", {});
}

const getMsgByEmail = (req, res, next) =>  {
    const {email} = req.params;

    messagesModel.find({userEmail: email})
        .then((messages) => res.sendStatus(messages))
        .catch((err) => res.sendStatus(err))
}

module.exports = {
    getChat,
    getMsgByEmail
};
