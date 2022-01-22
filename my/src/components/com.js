import {useState} from 'react'
import './com.css'

import 'simplebar';
export default function Com({id,state,setstate}){
    var [om,setcom]=useState([])
 
    var get_comment=async ()=>{
        var jwt=localStorage.getItem("jwt")
      
    
        var  options={
            method:"POST",
            headers:{
              'Content-type':'application/json',
              'Accept':'application/json',
              'jwt':jwt
            },
            body:JSON.stringify({
                id:id
           
             
            })
          }
          var data= await fetch('http://localhost:16000/getcmts',options)
          var dat=await data.json()
           setcom(dat.co)
           console.log(dat.co)
        }

        if(!state){
      get_comment()
      setstate(true)
     
  }
    return (
           
  
        <div data-simplebar className='comm'>
  {om.map((x)=>
      <div className='ssw'>
        <h4 className='name'>{x.name}</h4>
          <h4>{x.text}</h4>
          </div>
      
  )}
        </div>
     

    )
}