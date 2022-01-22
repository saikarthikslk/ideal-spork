var Jwt=require('jsonwebtoken')




async function authenticate(req,res,next){
    var {jwt}=req.headers
    var {username ,password}=req.body
    if(jwt===undefined){
        req.signin=false
        next()
    }
    else{
        var payload=Jwt.verify(jwt,'key')
        if(payload===undefined || payload===null)
      
        {  req.sign='invalid token'}
        else{
           req.sign='valid token'
        }
        next()
    }


}
module.exports=authenticate