var express=require('express')
var hash=require('bcrypt')
var Jwt=require('jsonwebtoken')
var User=require("./User")
var post=require('./post')
var com=require('./comments.js')
var pic=require('./profilepic.js')
let Router=express.Router()

async function authenticate(req,res,next){
  
  var {jwt}=req.headers
  var {username ,password}=req.body

  if(jwt==='no'){
    
      req.signin=false
      next()
  }
  else{
     if(jwt===null){
     req.sign='invalid token'
     next()


     }
      var payload= await Jwt.verify(jwt,'jwt')
      if(payload===undefined || payload===null)
    
      {  req.sign='invalid token'}
      else{
         req.sign='valid token'
      }
      next()
  }


}
Router.use(authenticate)
Router.post('/create', async (req,res)=>{
  if(req.signin===false){

var  {username,password,email}=req.body
  
var  obj=await User.findOne({username:username})
var obj1=await User.findOne({email:email})
if(obj!==null){
 res.send({username:'exists'})
 return
}
if(obj1!==null){
  res.send({email:'exists'})
  return
}
password= await hash.hash(password,10)
var obj2=new User()
obj2.username=username
obj2.password=password
obj2.email=email
await obj2.save()
var obj3=new pic()
obj3.username=username
await obj3.save()
var token= await Jwt.sign({username:username},'jwt')
return res.send({jwt:token})
  }
  else{
    if(req.sign==='valid token'){
      res.send({'valid':true})
      return
    }
    else{
      res.send({'valid':false})
      return
    }
  }

  
})




Router.post('/login', async (req,res)=>{
  var  {username,password}=req.body
  if(req.signin===false){
  


  
var  obj=await User.findOne({username:username})



var s= await hash.compare(password,obj.password)



if(s){
  var token= await Jwt.sign({username:username},'jwt')
  return res.send({jwt:token})
}
else{
  res.send({user:'invalid'})
}


  }
  else{

    var  obj=await User.findOne({username:username})
    var s= await hash.compare(password,obj.password)
    if(s){
      if(req.sign==='valid token'){
        res.send({'valid':true})
   
      }
      else{
        res.send({'valid':false})
      }
      
    }
    else{
      res.send({user:'invalid'})
    }

    
  }

  
})

Router.post('/sign',async (req,res)=>{

  var {jwt}=req.headers

  var payload= await Jwt.verify(jwt,'jwt')
      if(payload===undefined || payload===null){  
        res.send({'login':false})
      }
      else{
        res.send({'login':true})

      }

})

Router.post('/post',async (req,res)=>{

  var {title,body,url}=req.body
  var {jwt}=req.headers

  
  
  var payload= await Jwt.verify(jwt,'jwt')
   
      if(payload===undefined || payload===null){  
        res.send({'login':false})
      }
      else{
         var name=payload.username
         var obj=new post()
         obj.username=name
         obj.title=title
         obj.image_url=url
         obj.body=body
         await obj.save()
        

 res.send({'login':true})
      }

 

})


Router.post('/psts',async (req,res)=>{

var {user}=req.body
  
  var {jwt}=req.headers

  
  
  var payload= await Jwt.verify(jwt,'jwt')
   
      if(payload===undefined || payload===null){  
        res.send({'login':false})
        return
      }
      else{
        if(user===null || user===undefined){
          var posts=await post.find({username:payload.username})
          console.log(posts.length)
        if(posts.length>0){
  
         res.send({posts:posts})
         return
        }
        else{
          console.log('77')
          var posts=await User.findOne({username:payload.username})
          res.send({username:posts.username,post:0})
                  return
        }
        }
        var posts=await post.find({username:user})
        
       
        res.send({posts:posts})
        return

      }

 

})
Router.post('/cmts',async (req,res)=>{
  

  
  var {jwt}=req.headers

  
  
  var payload= await Jwt.verify(jwt,'jwt')
   
      if(payload===undefined || payload===null){  
        res.send({'login':false})
      }
      else{
         var obj=new com()
          obj.post=req.body.id
          obj.text=req.body.text
          obj.name=payload.username
          await obj.save()
        
          res.send({'status':true})
      }

 

})
Router.post('/getcmts',async (req,res)=>{
  

  
  var {jwt}=req.headers

  
  
  var payload= await Jwt.verify(jwt,'jwt')
   
      if(payload===undefined || payload===null){  
        res.send({'login':false})
      }
      else{
        var co= await com.find({post:req.body.id})
        console.log(co)
        res.send({co:co})

        
      }

 

})

Router.post('/ppic',async (req,res)=>{
  

  
  var {jwt}=req.headers

  
  
  var payload= await Jwt.verify(jwt,'jwt')
   
      if(payload===undefined || payload===null){  
        res.send({'login':false})
      }
      else{
      
        var url=req.body.url
          var obj=await pic.findOne({username:payload.username})
         
           if(obj===null){
             var obj1=new pic()
             obj1.username=payload.username
             obj1.image_url=url
             await obj1.save()
             res.send({url:url})

            }
           

            else{
              obj.image_url=url
              await obj.save()
              
              res.send({url:url})
            }
        
      }

 

})


Router.post('/getpic',async (req,res)=>{
  

  
  var {jwt}=req.headers
 var user=req.body.user
  
  
  var payload= await Jwt.verify(jwt,'jwt')
   
      if(payload===undefined || payload===null){  
        res.send({'login':false})
        return
      }
      else{
        if(user===null || user===undefined){
          var obj=await pic.findOne({username:payload.username})
          if(obj===null || obj===undefined){
            res.send({'status':'failed'})
            return

          }
          else{
            res.send({url:obj.image_url})
            return
          }


        
        }
    
        var obj=await pic.findOne({username:user})
        if(obj===null || obj===undefined){
          res.send({'status':'failed'})
          return

        }
        else{
          res.send({url:obj.image_url})
          return
        }
         
      
        
      }

 

})

Router.post('/search',async (req,res)=>{
  

  
  var {jwt}=req.headers

  
  
  var payload= await Jwt.verify(jwt,'jwt')
   
      if(payload===undefined || payload===null){  
        res.send({'login':false})
      }
      else{
      
       var starts_with="^"+req.body.search
       var regex = new RegExp( starts_with , "i");
  
       var obj=await pic.find({username:{$regex:regex}})

         
       
       var obj2=obj.filter((x)=>x.username!==payload.username)
      console.log(obj2)
       res.send({data:obj2})
         
      }

 

})
Router.post('/follow',async (req,res)=>{
  

  
  var {jwt}=req.headers
var {user}=req.body
  
  
  var payload= await Jwt.verify(jwt,'jwt')
   
      if(payload===undefined || payload===null){  
        res.send({'login':false})
      }
      else{
   
         var obj1=await User.findOne({username:user})
         var obj2= await User.findOne({username:payload.username})
      
        obj1.follower.push(payload.username)
        await obj1.save()
        obj2.following.push(user)
        await obj2.save()
   
        
      }

 

})
Router.post('/getfollow',async (req,res)=>{
  
console.log('jjjjj')
  
  var {jwt}=req.headers
var {user}=req.body
  console.log(user)
  
  var payload= await Jwt.verify(jwt,'jwt')
   
      if(payload===undefined || payload===null){  
        res.send({'login':false})
      }
      else{
    if(user===null || user===undefined){
     console.log('yhh')
         var obj2= await User.findOne({username:payload.username})
          res.send({followers:obj2.follower,following:obj2.following})
      return 
        
      }
      else{
        var obj2= await User.findOne({username:user})
        console.log(payload.username)
        res.send({followers:obj2.follower,following:obj2.following,main:payload.username})
    return 
      }
    }

 

})
Router.post('/delte',async (req,res)=>{
  

  console.log('rrrr')
  var {jwt}=req.headers
var {id}=req.body
  
  
  var payload= await Jwt.verify(jwt,'jwt')
   
      if(payload===undefined || payload===null){  
        res.send({'login':false})
      }
      else{
       await post.deleteOne({_id:id})
       res.send({'status':'sucess'})

        
      }

 

})

module.exports=Router