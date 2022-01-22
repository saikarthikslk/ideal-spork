import './post.css'
import Com from './com';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {motion} from 'framer-motion'

export default function View({x,back}){
    var [state,setstate]=useState(false)
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
    <motion.div className='img' key={x._id} >
                 <div className='back'>
                     <ArrowBackIcon onClick={back} className='sts'></ArrowBackIcon>
                     <h2>{x.title}</h2>
              
                 </div>
             <img src={x.image_url} height="50%" width="100%"></img>
             <div>
                     <h4>{x.body}</h4>
                 </div>
                 <div className='icon'>
                     <FavoriteBorderIcon ></FavoriteBorderIcon>
                 </div>
             

              <div className='comments'>
               
                <Com id={x._id}  state={state} setstate={(x)=>setstate(x)}></Com>
              </div>
              <form  onSubmit={(e)=>{
                  e.preventDefault()
                  post_comment(x._id)
                  setstate(false)
              }}>
                       <input className='com' multiple  id={x._id} ></input>
              </form>
             </motion.div>
    )
        
}