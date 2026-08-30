import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/shared/Navbar'
import { Toaster } from 'react-hot-toast';
import "./App.css";
import Home from "./components/home/Home.jsx";
function App() {
 

  
   return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Home />}/>
          
        </Routes>
      </Router>
      <Toaster position='bottom-center'/>
    </React.Fragment>
  )
}

export default App
