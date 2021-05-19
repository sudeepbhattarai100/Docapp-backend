const express= require('express');
const Speciality= require('../models/speciality');
const Doctor= require('../models/doctor');
const Patient= require('../models/patient');
const Appointment= require('../models/appointment');
const auth = require('../auth');

const router = express.Router();

router.post('/appointDoctor', (req, res, next) => {

        Appointment.create({
            DoctorId : req.body.DoctorId,
            BookedBy : req.patient._id,
            AppointmentDate: req.body.AppointmentDate,
            AppointmentTime: req.body.AppointmentTime,
            Query: req.body.Query,
        })
        .then((appointment)=>{
            res.json(appointment);
        })
        .catch(next);
});


router.get('/getAppointment', (req, res, next) =>{
    Appointment.findById({DoctorId: req.doctor._id})
    .then((appointment)=>{
        res.json(appointment);
    })
});



router.route('/myAppointment')
.get((req, res, next)=> {
    Appointment.find({BookedBy:req.patient.id})
    .then((appointment)=>{
        res.json(appointment);
    }).catch((err)=>next (err))
});

router.route('/myAppointmentReact')
.get((req, res, next)=> {
    Appointment.find({BookedBy:req.patient.id})
    .populate({
        path:'DoctorId'
    })
    .then((appointment)=>{
        res.json(appointment);
    }).catch((err)=>next (err))
});

// router.get('/getDocAPpointmnet', (req, res, next) =>{
//     Appointment.findById({DoctorId: req.doctor._id})
//     .then((appointment)=>{
//         res.json(appointment);
//     })
// });

router.delete('/:id/deleteAppointment', (req, res, next)=> {
    Patient.findById(req.patient._id)
        .then((patient)=>{
            Appointment.findOneAndDelete({id:req.body._id})
                .then((appointment)=>{
                    res.json({status:"deleted"});
                }).catch(next);
        }).catch(next);
}); 


module.exports = router;
