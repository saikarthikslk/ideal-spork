import './main.css'
import { Button } from '@mui/material';

export default function Upload({post}){
    return (
   <form className="post" onSubmit={post}>
      <input className="title" placeholder="title" id="title"></input>
      <input className="body" placeholder="body" id="body"></input>
    
      <input type="file" accept=".png" id="src" ></input>
      <label for="src" id='rtt' className='s2s'>upload</label>
      <Button variant="contained" onSubmit={post} onClick={post}> create post </Button>
   </form>

    )
}