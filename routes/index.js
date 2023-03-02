const express = require('express');
const routes = express.Router();
const passport = require('passport');
const path = require('path');

const logincontroller = require('../controllers/logincontroller');
const forgotcontroller = require('../controllers/forgotcontroller');
const ProfileController = require('../controllers/profilecontroller');
const categorycontroller = require('../controllers/categorycontroller');
const subcategorycontroller = require('../controllers/subcategorycontroller');

// File Upload
// const uploads = path.join('uploads');
const uploads = path.join("uploads")

const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,uploads); 
    }, 
    filename : (req,file,cb) => {
        cb(null,file.fieldname+"-"+Date.now());
    }
});
const uploadimg = multer({storage : storage}).single('avatar');
console.log(uploadimg);

// logincontroller
routes.get('/', logincontroller.login)
routes.get('/dashboard',passport.chekAuthentication,logincontroller.dashboard);
routes.get('/register',logincontroller.register);
routes.post('/registerData',uploadimg,logincontroller.registerData);
routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),logincontroller.loginData);
routes.get('/logout',logincontroller.logout);
routes.get('/forgot',logincontroller.forgot);

// forgotcontroller 
routes.post('/emaildata',forgotcontroller.emaildata);
routes.get('/otp',forgotcontroller.otp); 
routes.post('/otpData',forgotcontroller.otpData);
routes.get('/password',forgotcontroller.password)
routes.post('/passwordData',forgotcontroller.passwordData);

//ProfileController
routes.get('/profile',ProfileController.profile);
routes.post('/profileData',ProfileController.profileData);

//category  
routes.get('/category',categorycontroller.indexcategory);
routes.post('/categoryData',categorycontroller.categoryData);
routes.get('/viewcategory',categorycontroller.viewcategory);

// subcategory  
routes.get('/subcategory',subcategorycontroller.indexsubcategory);
routes.post('/subcategoryData',subcategorycontroller.subcategoryData);
routes.get('/viewsubcategory',subcategorycontroller.viewsubcategory)

console.log("routing is working");

module.exports =routes;