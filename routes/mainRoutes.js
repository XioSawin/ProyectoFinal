const express = require('express');
const app = express();

const router = express.Router();

const mainController = require('../controllers/mainController');

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

router.get('/login', mainController.LoginOk);

router.post('/login', mainController.logUser, mainController.Redirect);

router.get('/faillogin', mainController.LoginFail);

router.get('/logout', mainController.Logout);

module.exports = router;
