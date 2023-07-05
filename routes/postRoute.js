const express = require("express");
const inputValidator = require("../middleware/inputValidator");
const schemas = require("../config/JOISchemas");
const { validateUser } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const router = express.Router();
const Post = require("../models/postModel")

router.route("/posts").get(catchAsyncError( async(req, res, next)=> {
    const posts = await Post.find({ verified: true });
    res.status(200).json({
        success: true,
        posts,
    })
}));


router.route("/post/request").post(inputValidator(schemas.createPost, 'body'), validateUser, catchAsyncError(async(req, res, next)=> {
    if(req.user === undefined || req.user.role === "admin"){
        return res.status(400).json({
            success: false,
            message: "You must be login either as Volunteer or Co-ordinator to Create a post"
        })
    }
    const post = {
        title: req.body.title,
        description: req.body.description,
        createdBy: {
            id: req.user._id,
            name: req.user.name,
        },
        verified: false
    }
    await Post.create(post)
    res.status(201).json({
        success: true,
        message: "A request for new post is generated successfully"
    })
}))

router.route("/post/verify/:id").put(inputValidator(schemas.postId, 'params') ,validateUser, catchAsyncError( async(req, res, next)=> {
    if(req.user === undefined || req.user.role !== "admin"){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    
    let post = await Post.findOne({ _id: req.params.id });
    if(!post){
        return res.status(400).json({
            success: false,
            message: "Invalid Post ID"
        })
    }
    // console.log(post)
    post.verified = true;
    await post.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        message: "Post verified Successfully"
    })
}))

module.exports = router;