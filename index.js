const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

app.use(session({
    name : "upal",
    secret : "rnw",
    saveUninitialized : true,
    resave : true, 
    cookie : { 
        maxAge : 1000 * 60 * 60 * 100
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);
app.use(cookieParser());

const db = require('./config/mongoose');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));
 
app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded());

app.use('/',require('./routes'));

app.listen(3030,(err)=>{
    if (err){
        console.log("server is not start");
        return false;
    }
    console.log("server is started ");
});