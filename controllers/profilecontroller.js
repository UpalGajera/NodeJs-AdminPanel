const Registermodel = require('../models/Registermodel');

const profile = (req,res) => {
    return res.render('profile');
}

const profileData = async(req,res) => {
    let id = res.locals.userLogin.id;
    try{
        let userprofile = await Registermodel.findByIdAndUpdate(id,{
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        });
        if(userprofile){
            console.log("Profile successfully changed");
            return res.redirect('/dashboard');
        }else{
            console.log("Profile not update");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }   
}
module.exports = {profile,profileData};