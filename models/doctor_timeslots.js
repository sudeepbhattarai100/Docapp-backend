const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    },
 
    Day:{
        type: String,
        required: true
    },

    TimeSlot:{
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('TimeSlots', timeslotSchema);