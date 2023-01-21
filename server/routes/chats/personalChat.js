const express=require('express');
const router=express.Router();
const User=require('../../models/user');
const PersonalChat=require('../../models/personalChat');
const Message=require('../../models/message')
const isLogin=require('../../middlewares/auth');

router.get('/messages/dm/:id',isLogin,(req,res)=>{
    const receiverId=req.params.id;
    const senderId=req.user._id;
    PersonalChat.findOne({members:{$all:[receiverId,senderId]}})
    .populate('members','_id username dp fullname')
    .populate('chats')
    .then(dm=>{
        if(!dm){
            User.findOne({$and:[{_id:senderId},{savedUsers:{$all:receiverId}}]})
            .then(user=>{
                if(!user)
                    return res.status(422).json({error:"User not in friends list!"})
                else{
                    return res.json({dm,user})
                }
            })
        }
        else
        return res.json({dm})
    })
})


router.post('/messages/dm/:id',isLogin,(req,res)=>{
    
    const senderId=req.user._id;
    const receiverId=req.params.id;

    PersonalChat.findOne({members:{$all:[senderId,receiverId]}})
    .populate('members','_id username dp fullname')
    .populate('chats')
    .then(dm=>{
        if(dm)
        {
            const newMessage=new Message({
                message:req.body,
                senderId,
                receiverId
            })
            newMessage.save()
            .then(newM=>{
                PersonalChat.findOneAndUpdate({members:{$all:[senderId,receiverId]}},{$push:{chats:newM._id}},{new:true})
                .populate('members','_id username dp fullname')
                .populate('chats')
                .then(updatedDm=>{
                    return res.json({updatedDm,newM})
                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        }
        else{
            const newMessage=new Message({
                message:req.body,
                senderId,
                receiverId
            })
            newMessage.save()
            .then(newM=>{
                const newDm=new PersonalChat({
                    members:[senderId,receiverId],
                    chats:[newM._id]
                })
                newDm.save()
                .then(updatedDm=>{
                    return res.json({updatedDm,newM})
                }).catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        }
    }).catch(err=>console.log(err))

})

module.exports=router;