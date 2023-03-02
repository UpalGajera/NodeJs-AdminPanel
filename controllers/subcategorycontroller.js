const categorytbl = require('../models/Categorymodel');
const Subcategorymodel = require('../models/Subcategorymodel');

const indexsubcategory = async(req,res) =>{
    try{
        
        let data = await categorytbl.find({});
        console.log(data);
        if(data)
        {
            return res.render('add_subcategory',{
                categorydata : data
            })
        }else{
            console.log("Record not fetch");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const subcategoryData = async(req,res) => {
    try{
        const addsubcategory = await Subcategorymodel.create({
            categoryId : req.body.categoryId,
            subcategory : req.body.subcategory
        })
        if(addsubcategory){
            console.log("Subcategory successfully add");
            return res.redirect('back');
        }else{
            console.log("Subcategory not add");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const viewsubcategory = (req,res) =>{
    Subcategorymodel.find({}).populate("categoryId") // populate key
    .then(user => {
       console.log(user);
       return res.render('view_subcategory',{
            allrecord : user
       });
});
}

module.exports = {indexsubcategory,subcategoryData,viewsubcategory};