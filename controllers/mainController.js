const express = require('express');
const app = express();

//const passport = require('passport');
const jwt = require("jsonwebtoken");
// const tokenSecret = process.env.JWT_SECRET_KEY;
// const LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

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
// app.use(passport.initialize());
// app.use(passport.session());

const userModel = require('./models/user');

/* --------- email & sms config --------- */
// ethereal
const ethereal = require('./email/ethereal');
//const twilio = require('./sms/twilio');

const adminEmail = 'clovis.kris@ethereal.email';
//const adminNumber = process.env.WHATSAPP_NUMBER;


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

const logUser = (req, username, password, done) => {
    // chk en db si existe el username
    userModel.findOne({'username': username},
        function(err, user) {
            // if there is an error
            if(err) {
                return res.status(400).json({
                    status: 400,
                    message: err,
                });
            }

            // if username does not exist on db
            if(!user) {
                return res.status(401).json({
                    status: 401,
                    message: 'Email incorrecto. Vuelva a intentarlo'
                })
            }

            // if right user but wrong pwrd
            if(!isValidPassword(user,password)) {
                return res.status(401).json({
                    status: 401,
                    message: 'Contraseña incorrecta. Vuelva a intentarlo'
                })
            }

            // tout est OK
            const token = jwt.sign(
                {id: user._id},
                process.env.JWT_SECRET_KEY, 
                {expiresIn: process.env.TOKEN_KEEP_ALIVE},
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({
                        token, 
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.username,
                            admin: user.admin
                        }
                    });
                }
            )
            
            return res.status(200).json({token});
        }
    );
}

/* -------------- check valid password -------------- */
const isValidPassword = function(user, password){        
    return bCrypt.compareSync(password, user.password);
} 
    
/* -------------- routes -------------- */

const LoginOk = (req, res) => {
    if(req.isAuthenticated()){
        res.render("welcome", { user: user});
    }
    else {
        res.sendFile(process.cwd() + '/public/login.html')
    }
}

const LoginFail = (req, res) => {
    res.render('login-error', {});
}

const Logout = (req, res) => {
    let nombre = req.user.name;

    req.logout();
    res.render("logout", { nombre });
}

const Redirect = (req, res) => {
    res.redirect('/');
}

module.exports = {
    logUser,
    LoginOk,
    LoginFail,
    Logout,
    Redirect,
    Order
};

/*

const Order = (req, res) => {
    const {order} = req.body;

    let nombre = req.user.name;
    let email = req.user.username;
    let phoneNumber = req.user.phoneNumber;

    let asunto = `Nuevo pedido de ${nombre}: ${email}`;
    let mensaje = `Pedido: ${order}`;

    let bodyWhatsApp = `Nuevo pedido de ${nombre}: ${email}. Pedido: ${order}.`


    // ethereal 
    ethereal.enviarEthereal(adminEmail, asunto, mensaje);

    // whatsapp al admin
    twilio.enviarWhatsApp(adminNumber, bodyWhatsApp);

    // text al user
    twilio.enviarSMS(phoneNumber.toString(), 'Pedido recibido y en proceso');

    res.redirect('/');
}
*/