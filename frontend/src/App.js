import React, { createContext, useContext, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Schedule from "./components/Schedule";
import Case from "./components/Case";
import Clinic from "./components/Clinic";
import {Container,  Navbar,  Nav,  Button,ButtonGroup,  NavDropdown} from "react-bootstrap";
import LogOut from "./components/LogOut";
import GetClinic from "./components/GetClinic";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import About from "./About";

export const UserContext = createContext();

function App() {
  const navigator = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token")); //local Storage
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  return (
    <div className="App">
      <UserContext.Provider
        value={{ token, setToken, isLoggedIn, setIsLoggedIn }}
      >
        {/* <Link  to="/home">
          <img
          className="logo"
            src="https://res.cloudinary.com/dvmoaseij/image/upload/v1705318737/logo_kzcqkc.jpg"
            alt="Logo"
          />
        </Link>  */}
        <div className="homeHeader">
          <Link to="/home">
            <img
              src="https://res.cloudinary.com/dvmoaseij/image/upload/v1705586077/Capture_aljnz6.jpg"
              alt="Logo"
            />
          </Link>
          <Navbar className="bg-body-tertiary">
            <Container style={{marginLeft:"2rem"}}>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link>
                    <Link to="/home" className="link">
                      Home
                    </Link>
                  </Nav.Link>

                  <Nav.Link>
                    <Link to="/about" className="link">
                      About
                    </Link>
                  </Nav.Link>

                  <NavDropdown
                    style={{ color: "whitesmoke" }}
                    title="Services"
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item href="/dashboard">
                      Patient
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item href="schedule">Doctor</NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link>
                    <Link to="/register" className="link">
                      Register
                    </Link>
                  </Nav.Link>

                  

                  <Nav.Link>
                    <Link to="/contact" className="link">
                      Contact us
                    </Link>
                  </Nav.Link>
                  <ButtonGroup style={{backgroundColor:"white"}} aria-label="Basic example">
      <Button variant="secondary" className="button-4"><Link className="link-2" to="/login">
                      Login
                    </Link></Button>
          <Button className="button-4"   variant="secondary">
                    <Link className="link-2" to="/logout" >
                      Logout
                    </Link></Button>
    </ButtonGroup>
                  
                    
                 

                  
                  
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/patientCase" element={<Case />} />
          <Route path="/clinic" element={<Clinic />} />
          <Route path="/getclinic" element={<GetClinic />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
