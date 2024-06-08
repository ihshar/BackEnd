// auth , isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next) => {
    try{
        console.log("cookie",req.cookie.token);
        console.log("body",req.body.token);
        const token = req.cookie.token || req.body.token || req.header("Authorization").replace("Bearer"," ");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is Missing",
            });
        }

        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;  
        } catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            });
        }
        next();
    } catch(error){
        return res.status(401).json({
            success:false,
            message:"Something Went Wrong, While verifying Token",
        });
    }
}

exports.isStudent = (req,res,next) =>{
    try{
        if(req.user.role != "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for students",
            });
        }
        next();
    } catch(error){
        return res.status(500).json({
            success:false,
            message:"User Role is not matching",
        })
    }
}

exports.isAdmin = (req,res,next) =>{
    try{
        if(req.user.role != "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for admin",
            });
        }
        next();
    } catch(error){
        return res.status(500).json({
            success:false,
            message:"User Role is not matching",
        })
    }
}