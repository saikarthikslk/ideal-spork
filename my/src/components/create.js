import { TextField ,Button, easing} from '@mui/material';
import { useState } from 'react';
import { animate, motion } from "framer-motion"
import { ToastContainer, toast } from 'react-toastify';

import './create.css'
export default function Create({login}){
  var [valid,setvalid]=useState(false)

  var validate_email=(email)=>{
   
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if(filter.test(email)){
      return true

    }
   return false
  }
 var submit= async (e)=>{
   e.preventDefault()

   var username=document.getElementById('user name')
   var password=document.getElementById('password')
   var email=document.getElementById('email')
   var jwt=localStorage.getItem('jwt')
   if(jwt==null)
   {
     jwt='no'
   }
   console.log(validate_email(email.value))
   if(validate_email(email.value)){
     setvalid(false)
   var  options={
     method:"POST",
     headers:{
       'Content-type':'application/json',
       'Accept':'application/json',
       'jwt':jwt
     },
     body:JSON.stringify({
       username:username.value,
       password:password.value,
       email:email.value
     })
   }
   var data= await fetch('http://localhost:16000/create',options)
   var dat=await data.json()
   if(dat.jwt!==undefined){
    localStorage.setItem('jwt',dat.jwt)
    console.log(localStorage.getItem('jwt'))
    window.location.replace('/sign')

   }  
   else{
     if(dat.valid){
        console.log(localStorage.getItem('jwt'))
    
        window.location.replace('/sign')

     }
     else{
     
     }
   }
  }else{
    setvalid(true)



  }

  }
  return(
  <motion.form class='create' onSubmit={submit} initial={{opacity:0,y:200}} animate={{opacity:1,y:0,rotateY:360}} transition={{duration:2,type:"spring",when:"beforeChildren"}}>

    <h1 className='title'>Create Account</h1>
  <TextField variant='outlined' label='user name' id='user name' ></TextField>
  <TextField variant='outlined' label='password' id='password'></TextField>
  <TextField variant='outlined' label='email' id='email'></TextField>
  {valid&&<p>invalid email*</p>}

  <Button variant='contained' onClick={submit}> SIGN UP</Button>
  <motion.a href='login'   initial={{x:400,opacity:0}} animate={{x:0,opacity:1}}  transition={{duration:1}}    >have an account ? log in</motion.a>
 
  </ motion.form>
  )
}