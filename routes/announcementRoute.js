const express = require("express")
const router = express.Router();
const inputValidator = require("../middleware/inputValidator");
const schemas = require("../config/JOISchemas");
const { validateUser } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const Announcement = require("../models/announcementModel");

router.route("/announcements").get(catchAsyncError( async(req, res, next)=> {
    const announcements = await Announcement.find();
    res.status(200).json({
        success: true,
        announcements,
    })
}));

router.route("/announcement/create").post(inputValidator(schemas.createAnnouncement, 'body'), validateUser, catchAsyncError( async(req, res, next)=> {
    if(req.user === undefined || req.user.role === "volunteer"){
        return res.status(401).json({
            success: false,
            message: "Unauthorized action"
        })
    }
    const announcement = {
        title: req.body.title,
        description: req.body.description,
        createdBy: req.user._id
    }
    await Announcement.create(announcement);
    res.status(201).json({
        success: true,
        message: "Announcement Added"
    })
}));


module.exports = router;