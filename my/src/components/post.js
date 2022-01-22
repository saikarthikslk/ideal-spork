import './post.css'
import Com from './com';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {motion} from 'framer-motion'


export default function Post({x,post_comment}){
    var [state,setstate]=useState(false)
          var [y,sety]=useState(true)
    var dele= async (e)=>{
        var jwt=localStorage.getItem('jwt')
     var  options={
        method:"POST",
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json',
          'jwt':jwt
        },
        body:JSON.stringify({
            id:e
       
         
        })
      }
      var data= await fetch('http://localhost:16000/delte',options)
       sety(false)
       console.log(y)
      
    }
    if(y){

    return (
    <motion.div className='img' key={x._id}  >
                 <div className='delete'>
                     <h2>{x.title}</h2>
                     <DeleteIcon onClick={()=>{
                 dele(x._id)
                     }}></DeleteIcon>
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
            else{
                return(
                   <></>
                )
            }
}