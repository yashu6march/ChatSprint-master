const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types;

const groupChatSchema=new mongoose.Schema({
    groupDp:{
        type:String
    },
    groupName:{
        type:String
    },
    description:{
        type:String
    },
    createdBy:{
        type:ObjectId,
        ref:"User"
    },
    admins:[
        {
            type:ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            type:ObjectId,
            ref:"Message"
        }
    ]
})

module.exports=mongoose.model("GroupChat",groupChatSchema)