const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category : {
        type : String,
        required : true
    }
});

const categorytbl = mongoose.model('category',categorySchema);

module.exports = categorytbl;


