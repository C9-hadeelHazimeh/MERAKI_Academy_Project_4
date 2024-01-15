import React, { createContext,useContext,useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Schedule from "./components/Schedule"
import Case from "./components/Case";
import Clinic from "./components/Clinic"
// logo from "../public/logo"
import LogOut from "./components/LogOut";
import GetClinic from "./components/GetClinic";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
export const UserContext = createContext();
function App() {
  
  const [token, setToken] = useState(localStorage.getItem("token"));//local Storage
  const [isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("isLoggedIn"));
 
 
  return (
    <div className="App">
      <UserContext.Provider value={{token, setToken,isLoggedIn,setIsLoggedIn}}>
      {/* <h1><Link to="/home">Home</Link></h1> */}
    
      {/* <Link to="/home"><img src="https://res.cloudinary.com/dvmoaseij/image/upload/v1705318737/logo_kzcqkc.jpg"  
    
    alt="Logo"/></Link> */}

      <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/schedule" element={<Schedule/>}/>
      <Route path="/patientCase" element={<Case/>}/>
      <Route path="/clinic" element={<Clinic/>}/>
      <Route path="/getclinic" element={<GetClinic/>}/>
      <Route path="/logout" element={<LogOut/>}/>
      <Route path="/booking" element={<Booking/>}/>
      <Route path="/contact" element={<Contact/>}/>
      </Routes> 
      </UserContext.Provider>
    </div>
  );
}

export default App;
