const express= require('express');
const Speciality= require('../models/speciality');

const auth = require('../auth');

const router = express.Router();

router.route('/')
.get((req, res, next)=>{
    Speciality.find({})
    .populate({path:'Doctor'})
        .then((speciality)=>{
            res.json(speciality);
        })
        .catch(next);
})

// .get('/getSpeciality', (req, res, next) => {
//     res.json({
//          _id: req.speciality._id, 
//          categoryName: req.speciality.categoryName,
//          categoryImage: req.speciality.categoryImage});
// })

.post((req, res, next)=>{
    Speciality.create(req.body)
    .then((speciality)=>{
        res.statusCode=201;
        res.json(speciality)
    }).catch(next);
})

.put((req, res)=>{
    res.statusCode=405;
    res.json({message: "Method not allowed"});
})

.delete(auth.verifyAdmin,(req,res,next)=>{
    Speciality.deleteMany({})
        .then((reply)=>{
            res.json(reply);
        })
        .catch(next)

    
});



router.route('/')
// req.params.id
.get((req,res,next)=>{
    Speciality.findOne({_id:req.params.id})
        .then((speciality)=>{
            res.json(speciality);
        }).catch(next);

});

module.exports= router;