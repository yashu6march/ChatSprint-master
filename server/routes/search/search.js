const express=require('express');
const router=express.Router();
const isLogin=require('../../middlewares/auth');
const User = require('../../models/user');

router.post('/globalSearch',isLogin,(req,res)=>{
    let userPattern=new RegExp('^'+req.body.query);

    User.find({username:{$regex:userPattern}})
    .select("_id username dp fullname")
    .then(users=>{
        return res.json({users})
    }).catch(err=>console.log(err))
})


router.post('/friendSearch',isLogin,(req,res)=>{
    let userPattern=new RegExp('^'+req.body.query);

    User.findById(req.user._id)
    .populate({
        path:"savedUsers",
        match:{username:{$regex:userPattern}},
        select: "_id username dp fullname"
    })
    .select('-password')
    .then(user=>{
        return res.json({user})
    }).catch(err=>console.log(err))

})




module.exports=router;