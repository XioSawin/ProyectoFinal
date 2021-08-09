const express = require('express');
const app = express();

const jwt = require("jsonwebtoken");

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

const userModel = require('./models/user');


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
