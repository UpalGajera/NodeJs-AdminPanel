const categorytbl = require('../models/Categorymodel');

const indexcategory = (req,res) =>{
    return res.render('category');
}

const categoryData = async (req,res) =>{
    try{
        let category = await categorytbl.create({
            category : req.body.category
        }) 
        if(category){
            console.log("category successfully Add");
            return res.redirect('back');
        }else{
            console.log("category not add");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const viewcategory = async (req,res) =>{
    try{
        let categoryrecord = await categorytbl.find({});
        if(categoryrecord){
            return res.render('view_category',{
                allcategorydata : categoryrecord
            })
        }else{
            console.log("Category Record Not Found");
            return false;
        }
    }catch(err){
        console.log(err);
        return false;
    }
    // return res.render('view_category');
}

module.exports = {indexcategory,categoryData,viewcategory};