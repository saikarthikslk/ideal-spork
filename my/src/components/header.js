import './header.css'
import { motion } from "framer-motion"

export default function Header(props){

    return(
        <motion.div className='header' initial={{y:-200}} animate={{y:0}} transition={{duration:1,type:'spring'}}>
         <h1 className='tag'>Instagram</h1>
         <div className='links'>
          <a href='/login'>sign in</a>
          <a href='/create'> sign up</a>
          
         </div>
            
        </motion.div>
    )

}