import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 import {Link} from "react-router-dom";
// import { login } from '../../../backend/controllers/users';

const Home = () => {
  return (
    <div className='container'>
        
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link><Link to="/login">Login</Link></Nav.Link>
          <Nav.Link><Link to="/register">Register</Link></Nav.Link>
          {/* <Nav.Link><Link to="/logout">LogOut</Link></Nav.Link> */}
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
      </div>
  )
}

export default Home