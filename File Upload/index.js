// instantiated the App
const express = require("express");
const app = express();

// imported the env config's
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware add krna
app.use(express.json());
const fileupload =  require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
}));


// db connect 
const db = require("./config/database");
db.connect();

// cloud se connect krna hai
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// app listen to port
app.listen(PORT,()=>{
    console.log(`App is listening at Port no. ${PORT}`);
})

// api route mount
const Upload = require("./routes/FileUpload")
app.use("/api/v1/upload",Upload);


// default route
app.get("/",()=>{
    console.log(`<h1>This is Home</h1>`)
})