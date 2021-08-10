const express = require('express');
const app = express();

// const passport = require('passport');
const bCrypt = require('bCrypt');
//const session = require('express-session');
const handlebars = require('express-handlebars');
const jwt = require("jsonwebtoken");

const enviarEthereal = require('../email/ethereal');

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

/*
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
})); */

const userModel = require('./models/user');
// const { FeedbackSummaryPage } = require('twilio/lib/rest/api/v2010/account/call/feedbackSummary');


/* ----------------------- REGISTRATION & LOGIN ----------------------- */
const registerUser = (req, username, password, done) => {
    const findOrCreateUser = function(){
        userModel.findOne({'username':username}, function(err, user){
            if(err){
                return res.status(400).json({
                    status: 400,
                    message: err,
                });
            }
            // si user ya existe
            if (user) {
                return res.status(400).json({
                    status: 400,
                    message: 'Usuario ya existe. Ingrese un nuevo usuario.',
                });
            } else {
                // si no existe, crear el usuario
                const {name, address, admin, phoneNumber, passwordConfirm} = req.body;

                //const phoneInputField = phoneNumber;
                /* const phoneInput = window.intlTelInpute(phoneInputField, {
                    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                });
                const intPhoneNumber = phoneInput.getNumber(); */

                // validar que contraseñas ingresadas en el form sean igual

                if (password === passwordConfirm) {
                    const user = {
                        username,
                        password: createHash(password),
                        name, 
                        address,
                        phoneNumber: phoneNumber,
                        admin
                    }
                    const newUser = new userModel(user);
    
                    newUser.save()
                        .then(usuario => {
                            jwt.sign( 
                                { id: usuario._id },
                                process.env.JWT_SECRET_KEY,
                                { expiresIn: process.env.TOKEN_KEEP_ALIVE },
                                (err, token) => {
                                    if (err) {
                                        throw err;
                                    }
                                    res.json({
                                        token, 
                                        usuario: {
                                            id: user._id,
                                            name: user.name,
                                            email: user.username,
                                            admin: user.admin
                                        }
                                    });
                                }
                            )
                        });
                    
                    enviarEthereal(process.env.EMAIL_ADMIN, "Nuevo Registro", JSON.stringify(newUser));
                } else {
                    return res.status(400).json({
                        status: 400,
                        message: 'Las contraseñas no coinciden'
                    })
                }
                
            }
        });
    }
    process.nextTick(findOrCreateUser);
}


/* -------------- hash password -------------- */

const createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

/* -------------- routes -------------- */

// REGISTRATION

const RegisterOk = (req, res) => {
    res.sendFile(process.cwd() + '/public/register.html');
}; 

const RegisterFail = (req, res) => {
    res.render('register-error', {});
}

const Redirect = (req, res) => {
    res.redirect('/');
}



module.exports = {
    registerUser,
    RegisterOk,
    RegisterFail,
    Redirect
};

/* 
UPLOAD PIC??
avatar: {
    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
    contentType: 'image/png'
}
 -------------- upload files --------------


const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

let upload = multer ({storage: storage});

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
                {email: user.username, id: user._id, name: user.name},
                process.env.JWT_SECRET_KEY, 
                {expiresIn: process.env.TOKEN_KEEP_ALIVE}
            )
            
            return res.status(200).json({token});
        }
    );
}



const isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
}


// LOGIN

const Login = (req, res) => {
    if(req.isAuthenticated()){
        res.render("welcome", {
            nombre: req.user.name
        })
    } else {
        res.sendFile(process.cwd() + '/public/login.html');
    }
    
}; 

const LoginFail = (req, res) => {
    res.render('login-error', {});
}

*/