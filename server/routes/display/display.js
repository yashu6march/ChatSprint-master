const express=require('express');
const router=express.Router();
const isLogin=require('../../middlewares/auth');
const User = require('../../models/user');
const PersonalChat=require('../../models/personalChat');

router.get("/showFriends",isLogin,(req,res)=>{
    try{
        User.findById(req.user._id)
        .populate('savedUsers','fullname username dp')
        .select('-password')
        .then(user=>{
            if(!user){
               return res.status(422).json({error:"User not found!!"})
            }
           return res.json({user})
        })

    }catch(err){
        throw err;
    }
})

router.get('/messages/all',isLogin,(req,res)=>{
    PersonalChat.find({members:{$all:[req.user._id]}})
    .populate('members','_id username dp fullname')
    .populate('chats')
    .then(chats=>{
        return res.json({chats})
    }).catch(err=>console.log(err))
})



module.exports=router;