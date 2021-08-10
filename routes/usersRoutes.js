const express = require('express');
const app = express();

//const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;

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


/* ----------------------- REGISTRATION ----------------------- */

/* -------------- local strategy -------------- */

/*
passport.use('register', new LocalStrategy({
        passReqToCallback: true
    },
        usersController.registerUser(req, username, password, done)
    )
); */

/* -------------- routes -------------- */

// REGISTRATION

router.get('/register', usersController.RegisterOk);

router.post('/register', usersController.registerUser, usersController.Redirect);

router.get('/failregister', usersController.RegisterFail);


module.exports = router;

