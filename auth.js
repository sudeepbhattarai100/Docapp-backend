const jwt = require('jsonwebtoken');
const Patient = require('./models/patient');
const Doctor = require('./models/doctor');
module.exports.verifyPatient = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error("Bearer token is not set!");
        err.status = 401;
        return next(err);
    }
    let token = authHeader.split(' ')[1];
    let data;
    try {
        data = jwt.verify(token, process.env.SECRET);
    } catch (err) {
        throw new Error('Token could not be verified!');
    }
    Patient.findById(data._id)
        .then((patient) => {
            req.patient = patient;
            next();
        })
}

module.exports.verifyDoctor = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error("Bearer token is not set!");
        err.status = 401;
        return next(err);
    }
    let token = authHeader.split(' ')[1];
    let data;
    try {
        data = jwt.verify(token, process.env.SECRET);
    } catch (err) {
        throw new Error('Token could not be verified!');
    }
    Doctor.findById(data._id)
        .then((doctor) => {
            req.doctor = doctor;
            next();
        })
}
module.exports.verifyAdmin = (req, res, next) => {
    if (!req.patient) {
        let err = new Error('Unauthorized');
        err.status = 401;
        return next(err);
    }
    if (req.patient.admin !== true) {
        let err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
    next();
}

