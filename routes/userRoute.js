const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const router = express.Router();
const inputValidator = require("../middleware/inputValidator");
const schemas = require("../config/JOISchemas");
const { validateUser } = require("../middleware/auth");
const Post = require("../models/postModel");
const Work = require("../models/workModel");

router.route('/register').post(inputValidator(schemas.userRegister, 'body') ,catchAsyncError( async(req, res, next)=> {
    if(req.body.role !== "volunteer" && req.body.organization){
        delete req.body.organization;
    } 
    const userObj = await User.create(req.body);

    const token = userObj.getJWTToken();
    // options for cookie
    const options = {
        expires: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
        success: true,
        message: "User Registered Succefully",
        token
    });
}))

router.route("/login").post(inputValidator(schemas.loginDetails, 'body') , catchAsyncError( async(req, res, next)=> {
  
    const user = await User.findOne({ email: req.body.email }).select("+password");

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Wrong Credentials"
        })
    }

    const isPasswordMatched = await user.comparePassword(req.body.password);

    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            message: "Wrong Credentials"
        })
    }
    const token = user.getJWTToken();
    // options for cookie
    const options = {
        expires: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(200).cookie("token", token, options).json({
        success: true,
        message: "Login Successfully",
        token
    });
}))

router.route("/logout").get( catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  })
)


router.route("/profile").get(validateUser, catchAsyncError( async(req, res, next)=> {
    if(req.user === undefined){
        return res.status(401).json({
            success: false,
            message: "Please Login to access this resource"
        })
    }
    let user;
    // console.log("req.user: ", req.user)
    if(req.user.role === "volunteer"){
        user = await User.findOne({ email: req.user.email}).populate("work.verified work.unverified");
    }
    if(req.user.role === "coordinator"){
        user = JSON.parse(JSON.stringify(req.user));
        delete user.work; delete user.workHours;
        user.unverifiedWorks = await Work.find({ verified: false});
    }
    if(req.user.role === "admin"){
        user = JSON.parse(JSON.stringify(req.user));
        delete user.work; delete user.workHours;
        user.unverifiedPosts = await Post.find({ verified: false});
    }
    res.status(200).json({
        success: true,
        user,
    })
    

}));

module.exports = router;
