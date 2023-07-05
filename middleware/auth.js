const User = require("../models/userModel");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");

exports.validateUser = catchAsyncError( async(req, res, next) => {
    let { token } = req.headers;
    if(!token){ token = req.cookies.token }
    if (!token) {
      return next();
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
  
    // console.log(decode);
  
    if(decode.id === undefined){
      return next();
    }
    
    req.user = await User.findById(decode.id);
    next();
})