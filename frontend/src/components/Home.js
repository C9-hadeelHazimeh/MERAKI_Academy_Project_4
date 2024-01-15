import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 import {Link} from "react-router-dom";
 import Carousel from 'react-bootstrap/Carousel';
 import ExampleCarouselImage from "../components/Booking"
const Home = () => {
  return (
    <div className>
      <div className='homeHeader'>
       <Link to="/home">
        <img src="https://res.cloudinary.com/dvmoaseij/image/upload/v1705318737/logo_kzcqkc.jpg"  
    
    alt="Logo"/></Link> 
     <Navbar className="bg-body-tertiary">
      <Container>
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link><Link to="/login" className='link'>Login</Link></Nav.Link>
          <Nav.Link><Link to="/register" className='link'>Register</Link></Nav.Link>
          <Nav.Link><Link to="/logout"  className='link'>LogOut</Link></Nav.Link>
          <Nav.Link><Link to="/contact"  className='link'>Contact Us</Link></Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
    </div>
    {/* 
    <Carousel>
      <Carousel.Item>
        <ExampleCarouselImage text="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel> */}
  




      </div>
  )
}

export default Home