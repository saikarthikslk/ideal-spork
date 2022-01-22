import { useEffect } from "react"
import * as THREE from 'three'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Mg from './images.js'
import Upload from './upload.js'
import Profile from './profile.js'
import {motion} from 'framer-motion'
import ReactLoading from 'react-loading';
import Modal from 'react-modal';
import { Button } from '@mui/material';
import Posted from "./posted.js";
import { ToastContainer, toast } from 'react-toastify';

import './main.css'
import { useState } from "react"


export default function Main({status,user,zindex}){
    var [load,setload]=useState(false)
    var [re,setre]=useState(true)
    var [login,setlogin]=useState(true)
    
   

    
   var verify_= async ()=>{
        
        var jwt=localStorage.getItem('jwt')
        if(jwt===null){
            window.location.replace('/login')}
        var  options={
           method:"POST",
           headers:{
             'Content-type':'application/json',
             'Accept':'application/json',
             'jwt':jwt
           },
        }
        var data= await fetch('http://localhost:16000/sign',options)
         var dat=await data.json()
         
         if(dat.login===false){
            window.location.replace('/login')

         }
      
        }

    verify_()

    var  post=async (e)=>{
       e.preventDefault()
       var jwt=localStorage.getItem("jwt")
       if(jwt===null){
         window.location.replace('/login')}
       var s=document.getElementById('src')
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
       var title=document.getElementById("title").value
       var body=document.getElementById("body").value
       
       if(title==="" || body==="")
       {}
       else{
         var  options={
            method:"POST",
            headers:{
              'Content-type':'application/json',
              'Accept':'application/json',
              'jwt':jwt
            },
            body:JSON.stringify({
              title:title,body:body,url:url
             
            })
          }
          var data= await fetch('http://localhost:16000/post',options)
          var dat=await data.json()
          console.log(dat)



       }



    }
    
if(status==="upload")
{
   return (
      <div id="s">
        


      <Upload post={post} zindex={zindex}></Upload>
      </div>
   )

}
else if(status==="posts"){
   return (
      <div id="s">
      <Mg zindex={zindex}></Mg>
      </div>
   )
}
    else if(status==="profile"){
      return (
         <div >
      <Profile zindex={zindex}></Profile>
         </div>
      )
    }
    else{
       return(
          <div>
<Posted usr={user} zindex={zindex} ></Posted>
</div>
       )
    }
}