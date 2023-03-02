const Registermodel = require('../models/Registermodel');
const path = require('path');
const fs = require('fs');
const uploads = path.join('uploads');

const login = (req, res) => {
    if(res.locals.userlogin){
        return res.redirect('dashboard');
    }
    return res.render("login");
}

const dashboard = (req,res) => {
    return res.render('dashboard');
}

const register = (req,res) => {
    return res.render('register');
}

const registerData = async (req,res) => {
    console.log(req.body);
    try {
        let avatar = ""
        if(req.file) 
        {
            avatar = uploads+"/"+req.file.filename
        } 

        let register = await Registermodel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar : avatar
        })
        if (register) {
            console.log("Record successfully insert");
            return res.redirect('/');
        } else {
            console.log("Record not fetch");
        }
    } catch (err) {
        console.log(err);
    }
 }

 const loginData = (req,res) => {
    return res.redirect('/dashboard');
}

const logout = (req,res) => {
    req.logout((err) => {
        if(err){
            console.log("User not a logout")
        }
        return res.redirect('/');
    })
}

const forgot = (req, res) => {
    return res.render('forgot');
}

module.exports = {login , dashboard , register , registerData , loginData , logout , forgot};   