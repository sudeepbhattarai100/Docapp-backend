const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }
}, { timestamps: true });

const doctorSchema = new mongoose.Schema({

      
    firstName:{
        type:String
     
    },

   
    lastName:{
        type:String
        
    },

    username:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required:true
        
    },

    email:{

        type:String
        
    },

    dob:{
        type:Date
        
    },

    address:{
        type:String
       
    },
    phoneNumber:{
        type:String
       
    },

    profileImage:{
        type: String
    },

    qualification:{
        type: String
    },
    
    verified:{
        type: Boolean,
        default: false
    },
        
    categoryName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Speciality'
    },
    reviews: [reviewSchema],
    
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);