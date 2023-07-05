const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: {
        id: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        name: String,
    },
    verified: Boolean,
})

module.exports = mongoose.model("Post", postSchema)