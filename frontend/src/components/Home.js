import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 import {Link} from "react-router-dom";
 import Carousel from 'react-bootstrap/Carousel';
 import ExampleCarouselImage from "../components/Booking"

const Home = () => {
  return (
    //header
    <div>
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
          <Nav.Link><Link to="/logout"  className='link'>Logout</Link></Nav.Link>
          <Nav.Link><Link to="/contact"  className='link'>Contact us</Link></Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
    </div>
{/* slider */}
    <div className='slider'>
    <Carousel>
      <Carousel.Item >
      <img src="https://res.cloudinary.com/dvmoaseij/image/upload/v1705348099/pexels-thirdman-5327584_cpf4va.jpg"  
    
    alt="Logo"/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://res.cloudinary.com/dvmoaseij/image/upload/v1705348357/pexels-andrea-piacquadio-3779696_z6wtx0.jpg"  
    
     />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://res.cloudinary.com/dvmoaseij/image/upload/v1705349551/pexels-matthias-zomer-339620_fdfjjy.jpg"
     
     />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src="https://res.cloudinary.com/dvmoaseij/image/upload/v1705350547/pexels-anna-shvets-5069611_jzwlz1.jpg"
     
     />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel> 
      </div>
{/* cards */}
{/* footer */}

      </div>
  )
}

export default Home