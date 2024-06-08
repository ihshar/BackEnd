const mongoose = require("mongoose");
const nodemailer  = require("nodemailer");
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tag:{
        type:String,
    },
    email:{
        type:String,
    },
});

// post Middleware for sending mail 
fileSchema.post("save",async function(doc){
    try{
        console.log("DOC",doc);

        // transpotation 
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        })

        // send mail
        let info =  await transporter.sendMail({
            from:`StudyNotion -By Himanshu`,
            to:doc.email,
            subject:"New File Uploaded on Cloudinary",
            html:`<h2>Hellp Jee</h2> <p>File Uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p> `,
        })

        console.log("INFO",info);

    } catch(error){
        console.error(error);
    }
})

module.exports = mongoose.model("File",fileSchema);