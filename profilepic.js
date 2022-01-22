var mongoose=require('mongoose')

const posr1=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
  
    image_url:{
        type:String,
        require:true
    }
   
   
})
module.exports=new mongoose.model("pic",posr1)