const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String
    }
});

const register = mongoose.model('register',registerSchema);
module.exports = register; 