var mongoose=require('mongoose')

const posr1=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
     body:{
        type:String,
        require:true
    },
    image_url:{
        type:String,
        require:true
    },
    likes:{
        type:Number,
        default:0
    },
    created_at:{
        type:Date,
        default:()=>Date.now()
    }
})
module.exports=new mongoose.model("post",posr1)