import React from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { Routes, Route, Link } from "react-router-dom";
// import Register from "./components/Register";
function App() {
 
  return (
    <div className="App">
      <h1>Hello, World</h1>
      
      <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      
      </Routes> 
      
    </div>
  );
}

export default App;
