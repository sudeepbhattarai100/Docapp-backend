const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor');
const router = express.Router();
const auth = require('../auth');


router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    require("../models/speciality").findOne({categoryName:req.body.categoryName})
    .exec().then((specialization)=>{
        bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            throw new Error('Could not hash!');
        }
        Doctor.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            dob:req.body.dob,
            categoryName: specialization._id,
            qualification: req.body.qualification,
            password: hash,
            profileImage: req.body.profileImage
        }).then((doctor) => {
            let token = jwt.sign({ _id: doctor._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
    }).catch(next);

});

router.post('/docRegister', (req, res, next) => {
    let password = req.body.password;
    require("../models/speciality").findOne({categoryName:req.body.categoryName})
    .exec().then((specialization)=>{
        bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            throw new Error('Could not hash!');
        }
        Doctor.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            dob:req.body.dob,
            categoryName: req.body.categoryName,
            speciality:req.body.speciality,
            qualification: req.body.qualification,
            password: hash,
            profileImage: req.body.profileImage
        }).then((doctor) => {
            let token = jwt.sign({ _id: doctor._id }, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
    }).catch(next);

});

router.post('/login', (req, res, next) => {
    Doctor.findOne({ username: req.body.username })
        .then((doctor) => {
            if (doctor == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, doctor.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: doctor._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
});
router.get('/me', auth.verifyDoctor, (req, res, next) => {
    res.json({ _id: req.doctor._id, firstName: req.doctor.firstName, lastName: req.doctor.lastName, email: req.doctor.email, profileImage: req.doctor.profileImage });
});

router.put('/updateProfile', auth.verifyDoctor, (req, res, next) => {
    User.findByIdAndUpdate(req.doctor._id, { $set: req.body }, { new: true })
        .then((doctor) => {
            res.json({ _id: doctor._id, firstName: req.user.firstName, lastName: req.user.lastName,
                 username: user.username, image: user.image });
        }).catch(next);
});

router.get('/getdoctorybycategory/:id', auth.verifyDoctor,(req,res,next)=>{
    // console.log(req.query.categoryId)

    // require("../models/speciality").findOne({categoryName:req.query.categoryName})
    // .exec().then((specialization)=>{
    //     // Doctor.find({categoryName:req.query.categoryId})
    //     Doctor.find({categoryName:specialization._id})
    //     .then((doctor)=>{
    //         res.json(doctor);
    //     }).catch(next);
    // })

    Doctor.find({categoryName:req.params.id})
    .populate({
        path:'categoryName'
    })
        .then((doctor)=>{
            res.json(doctor);
        }).catch(next);
})

module.exports = router;