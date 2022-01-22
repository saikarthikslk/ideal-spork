import './profile.css'
import {useState} from 'react'
import { TextField ,Button} from '@mui/material';

export default function Profile({zindex}){
   var [pic,setpic]=useState("")
    var [pot,setposts]=useState([])
    var [ren,setren]=useState(true)
    var [num,setnum]=useState(0)
    var [folow,setol]=useState([])
    var [foing,seting]=useState([])
    var [user,setuser]=useState("")
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
           
             
            })
          }
          var data= await fetch('http://localhost:16000/psts',options)
          var dat=await data.json()
          console.log(dat)
          if(dat.post===0){
            setuser(dat.username)
            setnum(dat.post)
          }else{
            setposts(dat.posts)
          
           setuser(dat.posts[0].username)
           setnum(dat.posts.length)
            
          
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
 
     
    })
  }
  var data= await fetch('http://localhost:16000/getpic',options)
  var dat=await data.json()

  setpic(dat.url)

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
 
     
    })
  }
  var data= await fetch('http://localhost:16000/getfollow',options)
  var dat=await data.json()

  setol(dat.followers)
  seting(dat.following)
 

}

 if(ren){
     po()
     ppic()
     getfol()
 
     setren(false)
 }
  var pic_= async (e)=>{
      
   
        e.preventDefault()
        var jwt=localStorage.getItem("jwt")
        if(jwt===null){
          window.location.replace('/login')}
        var s=document.getElementById('pic')
        var data=new FormData()
        data.append('file',s.files[0])
        data.append("upload_preset","insclone")
        data.append("cloud_name","dol89df05")
        var dataa=await fetch("https://api.cloudinary.com/v1_1/dol89df05/image/upload",{
           method:"POST",
           body:data
        })
 
        var data =await dataa.json()
        var url=await data.url
     
        
       
        
          var  options={
             method:"POST",
             headers:{
               'Content-type':'application/json',
               'Accept':'application/json',
               'jwt':jwt
             },
             body:JSON.stringify({
             url:url
              
             })
           }
           var data= await fetch('http://localhost:16000/ppic',options)
           var dat=await data.json()
           setpic(dat.url)
 
 
 
        
 
    }
 
     
  

    return(
        <div className='profile' id='profile'>
            <div className='image'>
                 <div className='profileimage'>
                     <img className='round' src={pic}></img>
                     <form onSubmit={pic_} className='er'>
                     <Button variant="contained" onClick={pic_} >upload</Button>
                     <label for="pic" className='pci'>change pic</label>

                       <input type="file" className='p' id="pic"  accept=".png"></input>
                       </form>
                 </div>
                 <div className="info">
                    <h1>{user}</h1>
                    <div className='flow'> 
                    <h4>{num} Posts</h4>
                     <h4>{folow.length} Followers</h4>
                     <h4>{foing.length} Follwing</h4>
                    </div>
                 </div>

            </div>
            <div className='postss'>
               

                
                  {pot.map((x)=>{
                      return (
                          <div className='gt' >
                              <img src={x.image_url } width={250} height={250} className='ft'>
                              </img>
                            
                              </div>
                      )
                  })}
         
        </div>
        </div>
    )
}