const express = require('express');
const app = express();

//const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;

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
//app.use(passport.initialize());
//app.use(passport.session());




/* ----------------------- SERIALIZE & DESERIALIZE ----------------------- */

/*
passport.serializeUser(function(user, cb) {
        cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
});

*/

/* ----------------------- LOGIN ----------------------- */

/* -------------- local strategy -------------- */
/*
passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
    mainController.loginUser(req, username, password, done)
)
);
*/

/* -------------- routes -------------- */

router.get('/login', mainController.LoginOk);

router.post('/login', mainController.logUser, mainController.Redirect);

router.get('/faillogin', mainController.LoginFail);

router.get('/logout', mainController.Logout);

//router.post('/order', mainController.Order);

module.exports = router;