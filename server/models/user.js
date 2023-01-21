const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types;

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
       
    },
    username:{
        type:String,
        
    },
    password:{
        type:String,
       
    },
    phone:{
        type:String,
       
    },
    dp:{
        type:String
    },
    email:{
        type:String
    },
    bio:{
        type:String
    },
    savedUsers:[
        {
            type:ObjectId,
            ref:"User"
        }
    ],
    myGroups:[
        {
            type:ObjectId,
            ref:"GroupChat"
        }
    ]
},{timestamps:true})

module.exports=mongoose.model("User",userSchema)