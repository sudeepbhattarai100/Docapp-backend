const mongoose = require ('mongoose');

const patientSchema = new mongoose.Schema({
   
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
    
    admin: {
        type: Boolean,
        default: false
    }
    
});
module.exports = mongoose.model('Patient', patientSchema);