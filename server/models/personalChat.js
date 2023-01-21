const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types;

const personalChatSchema=new mongoose.Schema({
    members:[
        {
            type:ObjectId,
            ref:"User"
        }
    ],
    chats:[
        {
            type:ObjectId,
            ref:"Message"
        }
    ]
},{timestamps:true})

module.exports=mongoose.model("PersonalChat",personalChatSchema)