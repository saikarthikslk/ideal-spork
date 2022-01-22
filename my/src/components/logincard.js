import './logincard.css'
import { TextField ,Button} from '@mui/material';
import {motion} from 'framer-motion'
import { useState } from 'react';
export default function Login({login,status}){
    var [er,useer]=useState('required *')
    var [valid,usevalid]=useState(false)
    var [valid1,usevalid1]=useState(false)
    var submit_= async (e)=>{
     e.preventDefault()
     var username=document.getElementById('user name')
     var password=document.getElementById('password')
   
     if(username.value==='' | password.value===''){
       if(username.value==='')
       {usevalid(true)
    
      }
      if(password.value==='')
       {
         usevalid1(true)
       }
    
       return
     }
     
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
          username:username.value,
          password:password.value,
         
        })
      }
      var data= await fetch('http://localhost:16000/login',options)
      var dat=await data.json()
      console.log(status)
      if(dat.valid===true){
        
        console.log(true)
        window.location.replace('/sign')
        return

      }
      if(dat.valid===false){
        console.log(false)
        return 
    
      }
      if(dat.user==='invalid'){
        console.log('invalid')
        return

      }
      else{
        window.location.replace('/sign')

        localStorage.setItem('jwt',dat.jwt)
        
        return
      }
    
    



    }
    return(
      
        <motion.form onSubmit={submit_} className='main' initial={{x:1000}} animate={{x:0}} transition={{duration:2,type:'spring'}}>
            <div>
                <h1>
                    INSTAGRAM
                </h1>
            </div>
        <TextField id="outlined-basic" label="user name" variant="outlined" id='user name'/>
       {valid&&<motion.h4 className='user' initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}}>{er}</motion.h4>}

        <TextField id="outlined-basic" label="password" variant="outlined" id='password' />
       { valid1 &&<motion.h4 className='pass'initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} >{er}</motion.h4> }

        <Button variant="contained" onClick={submit_}>Login</Button>

        <a href='/create'>create account ?</a>
        

        </motion.form>
      

    )
}