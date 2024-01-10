import React from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { Routes, Route, Link } from "react-router-dom";
function App() {
 
  return (
    <div className="App">
      <h1>Hello, World</h1>
      <Routes>
      <Route path="/" element={<Home/>}/>
      {/* <Home/> */}
      </Routes> 
    </div>
  );
}

export default App;
