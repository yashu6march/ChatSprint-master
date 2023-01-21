const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../../models/user');
const bcrypt=require('bcrypt');


router.post('/signup',(req,res)=>{

    const {fullname,username,password,email}=req.body;

    if(!fullname || !username || !email || !password){
        return res.status(422).json({error:"Please fill all fields"});
    }

    User.findOne({username})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"Username or Email already exists"});
        }
        bcrypt.hash(password,10)
        .then((hashedPass)=>{
            const user=new User({
                fullname,
                username,
                email,
                password:hashedPass
            })
            user.save()
            .then(user=>{
                return res.json({message:"User details successfully saved!"})
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
    }).catch(err=>{
        console.log(err)
    })
})


module.exports=router;