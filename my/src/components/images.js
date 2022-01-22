import {useState} from 'react'
import Com from './com';
import {useEffect} from 'react'
import { motion } from "framer-motion"

import Post from './post';
import './post.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
export default function Mg(){
    var [pot,setposts]=useState([])
    var [ren,setren]=useState(true)
   
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
          if(dat.post===0){
              return
          }
         setposts(dat.posts)

}
 if(ren){
     po()
     setren(false)
 }
 
 var post_comment=async (e)=>{
    var jwt=localStorage.getItem("jwt")
    var text=document.getElementById(e).value
    
    var  options={
        method:"POST",
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json',
          'jwt':jwt
        },
        body:JSON.stringify({
            id:e,text:text
       
         
        })
      }
      var data= await fetch('http://localhost:16000/cmts',options)
      var dat=await data.json()
     
    
 }

 
    return (
        <motion.div className="posts" initial={{y:1000*Math.random()}} animate={{y:0}} transition={{duration:2,type:"spring"}} >
         {pot.map((x)=>
             <Post x={x} post_comment={post_comment} ></Post>
         )}
        </motion.div>
    )

}