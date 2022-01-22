import  Header from './components/header.js'
import Login from './components/logincard.js';
import Beader from './components/main1.js';
import Create from './components/create.js';
import Main from './components/main.js'
import {Component} from 'react'
import { motion } from "framer-motion"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
class App extends Component {
constructor(props){
  super(props)
  this.state={login:"upload",user:"",zindex:1}
}

change=(e,b)=>{

  if(b===""){
  this.setState({user:"",login:e,zindex:1})
  }else{
    this.setState({user:b,login:e,zindex:-1})

  }
}

Header=()=>{
  if(window.location.pathname==="/sign"){
 return <Beader change={this.change}></Beader>
  }
  else{
    return <Header></Header>
  }
}

 render(){
  return (
    <div className='login' >
      {this.Header()}
     <Router>
  <Routes>
   
     <Route   path='/' element={<Login login={this.login} status={this.state.login} ></Login>}>
    
      </Route>
     <Route path='/create'  element={<Create login={this.login} status={this.state.login} ></Create>}  >
    
      </Route>
      <Route path='/login'  element={<Login login={this.login}  status={this.state.login}  ></Login>}  >
    
  
      </Route>
   
      <Route path='/sign'  element={<Main   user={this.state.user} status={this.state.login} zindex={this.state.zindex} ></Main>}  >
    
  
    </Route>
      </Routes>
      </Router>
    
  
 
    </div>
  );
  }
}


export default App;
