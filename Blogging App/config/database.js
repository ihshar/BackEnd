const mongoose = require('mongoose');

require("dotenv").config();

const connectWithDb = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("Database Connection Successful");
    })
    .catch(()=>{
        console.log("Error Occured in Database Connection");
    })
}

module.exports = connectWithDb;