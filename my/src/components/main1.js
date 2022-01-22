import {useState} from 'react'
import './header.css'
import { motion } from "framer-motion"
import { Button, getBackdropUtilityClass } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer, toast } from 'react-toastify';

export default function Beader({change}){
  



      var [s,sets]=useState([])
      
      var se= async (e)=>{
        var p=e.target.value
        var d=document.getElementById('ingo1')
        d.style.transform='translate(0,0)'
       
        var jwt=localStorage.getItem('jwt')
        if(jwt===null){
            jwt='no'}
        var  options={
           method:"POST",
           headers:{
             'Content-type':'application/json',
             'Accept':'application/json',
             'jwt':jwt
           },
           body:JSON.stringify({
            search:p,
            
           })
         }
         var data= await fetch('http://localhost:16000/search',options)
         var dat=await data.json()
         sets(dat.data)
       
    
    
      }
     var de=()=>{
  
  localStorage.removeItem("jwt")
  window.location.replace("/login")
       
     }
   
   var gts=()=>{
     var p=document.getElementById("search")
     if(p.value===""){
       sets([])
     }
   }
    return(
        <motion.div className='header' initial={{y:-200}} animate={{y:0}} transition={{duration:1,type:'spring'}}>
         <h1 className='tag'>Instagram</h1>
         <div className='search' >
              <input className='search1'  placeholder='search user' id="search"  onChange={se} onBlur={gts}
              ></input>
                  <div className='searchresult' id="ingo1">
                    {s.map((x)=>{
                      
                   
                      return (
                        <motion.div className='res' onClick={()=>{sets([]);change("postted",x.username)}}>
                          <img src={x.image_url} width="40px" height="40px" className="img1" ></img>
                          <h4>{x.username}</h4>
                        </motion.div>
                      )
                    })}
                  </div>
          </div>
         <div className='links'>

         
       <Button variant="contained" onClick={()=>change("posts","")}>posts</Button>
                 <Button variant="contained" onClick={()=>change("upload","")}>upload</Button>
                 <Button variant="contained" onClick={()=>change("profile","")}>profile</Button>
                 <Button variant="contained" onClick={de}>Logout</Button>
    
         </div>
            
        </motion.div>
    )

}