const mongoose = require('mongoose');
const specialitySchema= new mongoose.Schema({
    categoryName:{
        type: String,
        
        unique:true
    },
    categoryImage:{
        type: String
    },

},{timestamps:true});

module.exports = mongoose.model('Speciality', specialitySchema);