
var mongoose=require('mongoose')
const pla= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    count:Number
   
   
   })
   module.exports=mongoose.model("O1", pla)