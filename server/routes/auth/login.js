const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

const {JWT_SECRET}=require('../../config/keys')

router.post('/login',(req,res)=>{

    const {username,password}=req.body;

    User.findOne({username:username})
    .then(foundUser=>{
        if(!foundUser){
            return res.status(422).json({error:"Please enter correct credentials!"})
        }
        bcrypt.compare(password,foundUser.password)
        .then(passMatch=>{
            if(!passMatch){
                return res.status(422).json({error:"Please enter correct credentials!"})
            }
           const token= jwt.sign({_id:foundUser._id},JWT_SECRET)
           const {_id,username,dp,fullname}=foundUser;
           return res.json({token,user:{_id,username,dp,fullname},message:"Succesfully logged in!"})
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

module.exports=router;