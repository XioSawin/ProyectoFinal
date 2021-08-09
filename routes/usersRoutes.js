const express = require('express');
const app = express();
const router = express.Router();

const usersController = require('../controllers/usersControllers');

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

/* -------------- routes -------------- */

// REGISTRATION

router.get('/register', usersController.RegisterOk);

router.post('/register', usersController.registerUser, usersController.Redirect);

router.get('/failregister', usersController.RegisterFail);


module.exports = { router };

