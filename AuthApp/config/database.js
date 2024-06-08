const mongoose = require('mongoose');

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{console.log("Database connected Successfully")})
    .catch((error)=>{
        console.log("DB connection Issue");
        console.error(error);
        process.exit(1);
    })
}