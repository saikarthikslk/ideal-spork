var Router=require('./pat')
const express=require('express')
const path=require('path')
const bcypt=require('bcrypt')
const cors=require('cors')
var mongoose=require('mongoose')
const app=express()
var jwt=require('jsonwebtoken')
var cookieParser = require('cookie-parser')
const res = require('express/lib/response')
app.use(express.json())
app.use(cors({'Origin': '*'
}))
app.use(Router)

app.use(cookieParser())
const uri='mongodb+srv://slk:slk12@cluster0.xpxlt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
async function db(){
try{
await mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology:true})
console.log('connected')
}
catch(e){
    console.log(e)
}
}

app.use(express.static('my/build'))
 
  app.get("*" ,(req,res)=>{
      console.log('dd')
      res.sendFile(path.resolve(__dirname,'my','build','index.html'))
  })

app.listen(16000, async ()=>{
    await db()
  

  
    
})
