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
import UserEditor from "./components/UserEditor";


function App() {

  const [isLoggedin, setIsLoggedin] = useState(localStorage.getItem('token'));


  const setlogstatus = (islogged) => {
    setIsLoggedin(islogged);
  }

  return (
    <>
      <Router>
        <Navbar setlogstatus={setlogstatus} isLoggedin={isLoggedin} />
        <Routes>
          <Route exact path="/" element={<LandPage />} />
          <Route exact path="/home" element={isLoggedin ? <Home setlogstatus={setlogstatus} /> : <Navigate to="/login" />} />
          <Route exact path='/documents/:id' element={isLoggedin ? <UserEditor setlogstatus={setlogstatus} /> : <Navigate to="/login" />} />
          <Route exact path="/signup" element={isLoggedin ? <Navigate to="/home" /> : <Signup setlogstatus={setlogstatus} />} />
          <Route exact path="/login" element={isLoggedin ? <Navigate to="/home" /> : <Login setlogstatus={setlogstatus} />} />
        </Routes>

      </Router>
    </>
  )
}

export default App
