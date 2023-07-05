const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please Enter Your Name"]
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    dateOfBirth: {
      type: Date,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      select: false,
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    role: {
      type: String,
      default: "volunteer",
    },
    address: {
        type: String,
    },
    phone: String,
    bio: String,
    organization: String,
    work:{
        verified:[
            {
                type: mongoose.Schema.ObjectId,
                ref: "Work"
            }
        ],
        unverified:[
            {
                type: mongoose.Schema.ObjectId,
                ref: "Work"
            }
        ]
    },
    workHours:{
        type: Number,
        default: 0
    }
  });
  
  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  // JWT TOKEN
  userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  // Compare Password
  
  userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  
  module.exports = mongoose.model("User", userSchema);
  