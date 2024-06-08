const mongoose = require('mongoose');

require("dotenv").config();

const dbconnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => {
        console.log("DB connection Successful");
    })
    .catch((error)=>{
        console.log("Error occured in Connection with DB");
        console.log(error.message);
        process.exit(1);
    }
)}

module.exports = dbconnect;