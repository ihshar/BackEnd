const express = require('express');
router = express.Router();

const {login,signup} = require("../controllers/Auth");
const {auth, isStudent,isAdmin} = require('../middlewares/auth');

router.post("/login",login);
router.post("/signup",signup);

// testing route for single middleware
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the Protected Route for TESTING",
    });
});

router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the Protected Route for Student",
    });
});
router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the Protected Route for Admin",
    });
});

module.exports = router;