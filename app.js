if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "config/config.env"
    })
}

const express = require("express")
const app = express();
const cookieParser = require("cookie-parser");
const error = require("./middleware/error")

app.use(express.json());
app.use(cookieParser());

const user = require("./routes/userRoute");
const post = require("./routes/postRoute");
const announcement = require("./routes/announcementRoute");
const work = require("./routes/workRoute");

app.use("/api", user);
app.use("/api", post);
app.use("/api", announcement);
app.use("/api", work);

app.use(error);

module.exports = app;