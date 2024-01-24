import TextEditor from "./components/TextEditor"
import "./App.css"

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";


import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LandPage from "./components/LandPage";
import { useState } from "react";


function App() {
  const [clients, setClients] = useState([]);

  const handleClient=(clientdata)=>{
      setClients(clientdata);
      console.log(clients);
  }

  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<LandPage/>}/>
          <Route exact path="/home" element={(localStorage).getItem('token')?<Home/>:<Navigate to ={'/login'}/>}/>
          <Route exact path='/documents/:id' element={(localStorage).getItem('token')?<TextEditor handleClient={handleClient} />:<Navigate to ={'/login'}/>} />
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
       
      </Router>
    </>
  )
}

export default App
