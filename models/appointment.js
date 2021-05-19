const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

    DoctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required: true
    },

    BookedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        required: true
    },
    

    AppointmentDate: {
        type: String,
        required: true
    },


    AppointmentTime: {
        type: String,
        required: true
    },

    Query:{
        type:String
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);