require("dotenv").config({
    path: "config/config.env"
})
const connectDatabase = require("./config/database");
const User = require("./models/userModel");
const Work = require("./models/workModel");
const Post = require("./models/postModel")
connectDatabase();

async function ch(){
    // const user = await User.findOne({email: "dipansmhjkhuj09@gmail.com"}).populate("work.unverified work.verified")
    // console.log(user.work)
    // const user = await User.create({
    //     name: "dipanshu Jain",
    //     joiningDate: Date.now(),
    //     email: "dipansmhjkhuj09@gmail.com",
    //     password: "12345678",
    //     role: "admin",
    //     address: "bhopal",
    //     phone: "9898989898",
    //     "bio": "Hello",
    //     organization: "isha",
    // })
    // const work = await Work.create({
    //     category: "isha",
    //     TimeSpent: 4,
    //     startDate: Date.now(),
    //     endDate: Date.now(),
    //     description: "gfhjk",
    //     volunteerId: user._id,
    //     verified: false
    // })
    // user.work.unverified.push(work._id);
    // await user.save();
    await Post.create({
        title: "Covid",
        description: "spread from animal species to human"
    })
    await Post.create({
        title: "corona",
        description: "lochdown lga gaya"
    })

}

ch();


