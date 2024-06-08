const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// signup route handler

exports.signup = async (req,res) => {
    try{
        // get data 
        const {name,email,password,role} = req.body;
        // check if user already exists or not
        const existingUser = await User.findOne({email});

        if(existingUser){
            res.status(400).json({
                success:false,
                message:"User Already exists",
            });
        }
        
        // Secure Password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"Error in Hashing Password"
            })
        }

        // create entryfor User in Database
        const user = await User.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success:true,
            message:"User Created Successfully",
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User Cannot be Registered,Please Try Again Later",
        });
    }
}


exports.login = async (req,res) => {
    try{
        // data fetch
        const {email,password} = req.body;

        // validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please Fill all the Detail Carefully",
            });
        }

        // check for registered User
        const user = await User.findOne({email});

        // if not a registered user
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User Not Registered',
            });
        }

        // verify password and generate JWT
        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        }
        if(await bcrypt.compare(password,user.password)){
            // password match
            let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h",});
            // user = user.toObject(); if you want to use this and want token in user then change const to let on 69 line
            user.token = token;
            user.password = undefined;

            const options = {
                expiresIn: new Date(Date.now()+ 24 * 60 * 60 * 1000),
                httpsOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User LoggedIn Successfully",
            });
        }
        else{
            // password didn't match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure",
        });
    }
}
