const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Announcement", announcementSchema);