const Registermodel = require('../models/Registermodel');

const nodemailer = require('nodemailer');

const cookie = require('cookie-parser');

const emaildata = async (req,res) => {
        let email = req.body.email;
        let user = await  Registermodel.findOne({email : email});
        if(user){
            let otp = Math.floor(Math.random() * 100000);
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'upalgajera@gmail.com',
                    pass: 'zprewhmrskzdyjcq'
                }
            });
            var mailOptions = {
                from: 'upalgajera@gmail.com',
                to: email,
                subject: 'Forgot password',
                text: 'Otp :- '+otp
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                  return false;
                } else {
                    console.log('Email sent: ' + info.response);
                    const otpData = {
                        useremail : user.email,
                        userotp : otp
                    }
                    console.log(otpData);
                    res.cookie('otp',otpData);
                    return res.redirect('/otp');
                }
              });
        }else{
            console.log("User not found");
            return res.redirect('back');
        }
}
 
const otp = (req, res) => {
    return res.render('otp');
}

const otpData = (req,res) => {
    let otp = req.body.otp;
    if(req.cookies.otp.userotp == otp){
        return res.redirect('password');
    }else{
        console.log("Otp is wrong");
        return res.redirect('back');
    }
}

const password = (req, res) => {
    return res.render('password');
}

const passwordData = async (req,res) => {
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    try{
        if(password == cpassword){
            let email = req.cookies.otp.useremail;
            console.log(email);
            let user = await Registermodel.findOne({email : email});
            // console.log(user);
           if(!user){
                console.log("User not found");
                return false
           }

          let id = user.id;
          let editrecord = await Registermodel.findByIdAndUpdate(id, {
                password : password
          })

          if(editrecord){
                console.log("Password successfully changed!");
                res.clearCookie('otp');
                return res.redirect('/');
          }
        }else{
            console.log("Password and Confirm password not match");
               return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
        

}


module.exports = {emaildata,otp,otpData,passwordData,password};