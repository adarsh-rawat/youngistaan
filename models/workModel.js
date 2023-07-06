const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
    category: String,
    timeSpent: Number,
    startDate: Date,
    endDate: Date,
    description: String,
    attachFile: String,
    volunteerId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    verified: Boolean
})

module.exports = mongoose.model("Work", workSchema)
