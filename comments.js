var mongoose=require('mongoose')

const com=new mongoose.Schema({
    post:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    text:
    {
        type:String,
        require:true
    }

  

})
module.exports=new mongoose.model("comment",com)