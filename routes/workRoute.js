const express = require("express")
const router = express.Router();
const inputValidator = require("../middleware/inputValidator");
const schemas = require("../config/JOISchemas");
const { validateUser } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const Work = require("../models/workModel");

router.route("/work/create").post(inputValidator(schemas.createWork, 'body'), validateUser, catchAsyncError( async(req, res, next)=> {
    if(req.user === undefined || req.user.role !== "volunteer"){
        return res.status(401).json({
            success: false,
            message: "Unauthorized Access"
        })
    }
    const work = {
        category: req.body.category,
        timeSpent: req.body.timeSpent,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        volunteerId: req.user._id,
        verified: false
    }
    await Work.create(work)
    res.status(201).json({
        success: true,
        message: "Work Submit Request created Successfully"
    })
}))

router.route("/work/verify/:id").put(inputValidator(schemas.postId, 'params'), validateUser, catchAsyncError( async(req, res, next)=> {
    if(req.user === undefined || req.user!== "coordinator"){
        return res.status(401).json({
            success: false,
            message: "Unauthorized action"
        })
    }
    let work = await Work.findOne({ _id: req.params.id});
    if(work === undefined){
        return res.status(400).json({
            success: false,
            message: "No Work found against this id"
        })
    }
    work.verified = true;
    await work.save()
    res.status(200).json({
        success: true,
        message: "Work Verified Successfully"
    })
}))


module.exports = router;