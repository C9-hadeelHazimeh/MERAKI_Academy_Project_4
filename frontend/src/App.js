import React, { createContext,useContext,useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { Routes, Route, Link } from "react-router-dom";
export const UserContext = createContext();
function App() {
  
  const [token, setToken] = useState(localStorage.getItem("token"));//local Storage
  const [isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("isLoggedIn"));
 
 
  return (
    <div className="App">
      <UserContext.Provider value={{token, setToken,isLoggedIn,setIsLoggedIn}}>
      <h1><Link to="/home">Home</Link></h1>
     
      <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      
      </Routes> 
      </UserContext.Provider>
    </div>
  );
}

export default App;
