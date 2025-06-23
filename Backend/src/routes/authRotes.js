import express from 'express';
import User from "../models/User.js"
import jwt from "jsonwebtoken"

const router = express.Router();


const generateToken = (userID)=>{
    jwt.sign(userID,procc)
};


router.post("/login", async (req, res)=>{
   try{
    const {email, password, username} = req.body;
    if(!email || !password || !username){
        return res.status(400).json({Message : "all feilds are required "});
    };
    if(password.length < 6){
        return res.status(400).json({Message : "password length shoul'd be uper 6 "});
    };
     if(username.length < 3){
        return res.status(400).json({Message : "usebanme length shoul'd be uper 3 "});
    };




    const existingEmail = await User.findOne($or[{email}]);
    if(existingEmail){
        return res.status(400).json({Message : "Email has already taken"});
    };


    
    
    const existingUserName = await User.findOne($or[{username}]);
    if(existingUserName){
        return res.status(400).json({Message : "Usename has already taken"});
    };

const profileImage = "https://api.dicebear.com/8.x/initials/svg?seed=random";

    const user = new User({
        email,
        password,
        username,
        profile : "profileImage",

    });
   } catch (err){

   }
});

router.post("/register", async (req, res)=>{
    res.send("register")
});


export default router;
