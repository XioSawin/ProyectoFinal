const express = require('express');
const app = express();
const passport = require('passport');
const jwt = require("jsonwebtoken");
const handlebars = require('express-handlebars');

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
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//const userModel = require('../models/users');

    
/* -------------- routes -------------- */

// login

const logUser = async (req, res, next) => {
    passport.authenticate('login', async(err, user, info) => {
        try {
            if(err) {
                return next(err);
            }
            console.log('----USER FOUND PASS AUTHENTICATE----');
            console.log(user);

            if(!user && info){
                return res.status(401).json({message: info.message});
            }

            req.login(
                user, 
                {session: false},
                async(error) => {
                    if(error){
                        return next(error);
                    }

                    const body = {_id: user._id, email: user.username, admin: user.admin};
                    const token = jwt.sign({user:body}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.TOKEN_KEEP_ALIVE});

                    console.log(token);
                    return res.json({token});
                    //return done(null, user);
                }
            );
        } catch(error) {
            return next(error);
        }
    })(req, res, next);
}

const LoginOk = (req, res, next) => {
    console.log('----USER AUTHENTICATED----');
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        res.render("welcome", { user }); //da constantemente false
    }
    else {
        res.sendFile(process.cwd() + '/public/login.html')
    }
}

const LoginFail = (req, res, next) => {
    res.render('login-error', {});
}

const Logout = (req, res, next) => {
    let nombre = req.user.name;

    req.logout();
    res.render("logout", { nombre });
}

const Redirect = (req, res, next) => {
    res.redirect('/api/auth/login');
}

// register

const register = async(req, res, next) => {
    res.json({
        message: 'Registro exitoso',
        user: req.user
    });
}

const RegisterOk = (req, res, next) => {
    res.sendFile(process.cwd() + '/public/register.html');
}; 

const RegisterFail = (req, res) => {
    res.render('register-error', {});
}


module.exports = {
    logUser,
    register,
    RegisterOk,
    RegisterFail,
    LoginOk,
    LoginFail,
    Logout,
    Redirect
};

