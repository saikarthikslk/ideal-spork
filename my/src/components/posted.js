import './profile.css'
import {useState} from 'react'
import {motion} from 'framer-motion'
import { TextField ,Button} from '@mui/material';
import View from './view.js'
import './po.css'
export default function Posted({usr}){
  var [iew,setview]=useState(false)
  var  [cur,setcur]=useState({})
    var [pic,setpic]=useState("")
    var [pot,setposts]=useState([])
    var [ren,setren]=useState(true)
    var [num,setnum]=useState(0)
    var [folow,setol]=useState([])
    var [foing,seting]=useState([])
    var [user,setuser]=useState("")
    var [main,setmain]=useState("")
    var [dp,setdp]=useState("")
    var [vas,setvar]=useState("contained")
    var [f,setf]=useState("FOLLOW")
    var[t,sett]=useState(false)


    var po= async ()=>{
 
        var jwt=localStorage.getItem("jwt")
        var  options={
            method:"POST",
            headers:{
              'Content-type':'application/json',
              'Accept':'application/json',
              'jwt':jwt
            },
            body:JSON.stringify({
                user:usr
           
             
            })
          }
          var data= await fetch('http://localhost:16000/psts',options)
          var dat=await data.json()
          setposts(dat.posts)
      
         setuser(dat.posts[0].username)
         setnum(dat.posts.length)
        
         


        

}


var view=(x)=>{
  console.log(x)
  setview(true)
  setcur(x)



}
var back=()=>{
  setview(false)
  setcur({})
}
var flow= async ()=>{
  if(f==="Following"){
    return
  }
  var jwt=localStorage.getItem("jwt")
  var  options={
    method:"POST",
    headers:{
      'Content-type':'application/json',
      'Accept':'application/json',
      'jwt':jwt
    },
    body:JSON.stringify({
        user:usr
 
     
    })
  }
  var data= await fetch('http://localhost:16000/follow',options)
  var dat=await data.json()
 
 
}
var getfol= async ()=>{
  
  var jwt=localStorage.getItem("jwt")
  var  options={
    method:"POST",
    headers:{
      'Content-type':'application/json',
      'Accept':'application/json',
      'jwt':jwt
    },
    body:JSON.stringify({
  user:usr
     
    })
  }
  var data= await fetch('http://localhost:16000/getfollow',options)
  var dat=await data.json()
  console.log(dat)
  setol(dat.followers)
  seting(dat.following)
  setmain(dat.main)
  for (let i=0 ;i<dat.followers.length;i++){
    if(dat.followers[i]==dat.main){
      setf("Following")
      setvar("outlined")
      sett(true)
     
      break
    }
    

  }

}


var ppic= async ()=>{
  var jwt=localStorage.getItem("jwt")
  var  options={
    method:"POST",
    headers:{
      'Content-type':'application/json',
      'Accept':'application/json',
      'jwt':jwt
    },
    body:JSON.stringify({
        user:usr
 
     
    })
  }
  var data= await fetch('http://localhost:16000/getpic',options)
  var dat=await data.json()

  setpic(dat.url)

}

 if(ren){
   console.log('ddd')
     po()
     ppic()
     getfol()
     setren(false)
     
     
 }
 else if(usr!==dp)

{
  setdp(usr)
 console.log("SDcdcdcdc") 
 setren(true)
}

 if(iew===false){
   
    return(
        <div className='profile '>
            
            <div className='image'>
                 <div className='profileimage'>
                     <img className='round' src={pic}></img>
                    
                 
                 </div>
                 <div className="info">
                    <h1>{user}</h1>
                    <div className='flow'> 
                    <h4>{num} Posts</h4>
                     <h4>{folow.length} Followers</h4>
                     <h4>{foing.length} Follwing</h4>
                     <Button variant={vas} className='follow' onClick={flow} disabled={t}>{f}</Button>

                    </div>
                 </div>

            </div>
            <div className='postss'>
               

                
                  {pot.map((x)=>{
                  
                      return (
                          <div className='gt' onClick={()=>{
                            view(x)

                          }} >
                              <img src={x.image_url } width={250} height={250} className='ft'>
                              </img>
                            
                              </div>
                      )
                  })}
         
        </div>
    
        </div>
    







)
                }
                else{
                  return(
                      <div className='post3'>
                        <View x={cur} back={back}></View>
                      </div>
                  )
                }

}