var mongoose=require('mongoose')

const user1=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    follower:{
        type:[String],
        default:[]
    },
    following:{
        type:[String],
        default:[]
    },
    created_at:{
        type:Date,
        default:()=>Date.now()
    }
})
module.exports=new mongoose.model("user",user1)