const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/patient');
const router = express.Router();
const Doctor = require('../models/doctor');
const auth = require('../auth');


router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            throw new Error('Could not hash!');
        }
        Patient.create({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            username: req.body.username,
            address: req.body.address,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            dob:req.body.dob,
            password: hash,
            profileImage: req.body.profileImage
        }).then((patient) => {
            let token = jwt.sign({ _id: patient._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    Patient.findOne({ username: req.body.username })
        .then((patient) => {
            if (patient == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, patient.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: patient._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
});

router.get('/me', auth.verifyPatient, (req, res, next) => {
    res.json({ _id: req.patient._id, firstName: req.patient.firstName, lastName: req.patient.lastName, email: req.patient.email,
         address:req.patient.address, username:req.patient.username, profileImage: req.patient.profileImage 
        ,phoneNumber:req.patient.phoneNumber//extra used in React
        });
});

router.put('/updateProfile', auth.verifyPatient, (req, res, next) => {
    Patient.findByIdAndUpdate( req.patient._id,{ $set: req.body }, { new: true })
        .then((patient) => {
           // res.json({ firstName: req.patient.firstName, lastName: req.patient.lastName, username: req.patient.username,  email: req.patient.email, address:req.patient.address, profileImage: patient.profileImage });
            
         res.json(req.body);   
        }).catch(next);
});

router.post('/verifyPass', auth.verifyPatient,(req,res,next)=>{
    User.findById(req.patient._id)
    .then((patient)=>{

        bcrypt.compare(req.body.password, patient.password)
            .then((isMatch)=>{
                if(!isMatch){
                    let err = new Error('password did not match!');
                    err.status =401;
                    return next(err);
                }
                res.json({status: 'ok', password: req.patient.password});
            }).catch(next);
    }).catch(next);
});

router.put('/updatePass', auth.verifyPatient, (req, res, next) => {
        let password = req.body.password;
        bcrypt.hash(password, 10, function (err, hash){
            if(err){
                throw new Error('Could not hash!');
            }
            else{
                password = hash;
            }

        User.findByIdAndUpdate(req.patient._id, {$set:{password:password}}, {new: true})
        .then((patient)=>{
            res.json({status: 'ok', password: req.patient.password});
        }).catch(next);
    });
});

router.get('/AllDoctor', auth.verifyPatient,(req,res,next)=>{
    Doctor.find({})
        .then((doctor)=>{
            res.json(doctor);
        }).catch(next);
})

router.get('/getdoctorybycategory', auth.verifyPatient,(req,res,next)=>{
    // console.log(req.query.categoryId)

    require("../models/speciality").findOne({categoryName:req.query.categoryName})
    .exec().then((specialization)=>{
        // Doctor.find({categoryName:req.query.categoryId})
        Doctor.find({categoryName:specialization._id})
        .then((doctor)=>{
            res.json(doctor);
        }).catch(next);
    }).catch(next)

    // require("../models/speciality").findOne({categoryName:req.body.categoryName})
    // .exec().then((specialization)=>{
    // })
})
module.exports = router;