import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 import {Link} from "react-router-dom";
import { UserContext } from '../App';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';

const Dashboard = () => {
   
    const [availableAppointments, setAvailableAppointments] = useState([])
    ;
    const [userId, setUserId] = useState("");
    const { token } = useContext(UserContext);
   
    //get All availableAppointments (scheduled in database)
    useEffect(() => {
      axios
        .get(`http://localhost:5000/appointments/`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
            console.log("result.data.sechdul",result.data.sechdule);
          //state for userid
          setUserId(result.data.userId);
          setAvailableAppointments(result.data.sechdule)
          console.log(availableAppointments)
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);


  return (

    <div>Dashboard
 

<Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link><Link to="/login">Book an appointment</Link></Nav.Link>
          <Nav.Link><Link to="/register"> patient History</Link></Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 

    {
    availableAppointments.map((availableAppointment,i)=>{
        return <div className='container'>
        
        <Card style={{ width: '18rem' }}>
      <Card.Header>Available Appointment </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>{availableAppointment.clinic}</ListGroup.Item>
        <ListGroup.Item>{availableAppointment.doctor.name}</ListGroup.Item>
        <ListGroup.Item>{availableAppointment.date}</ListGroup.Item>
      </ListGroup>
      <Button variant="primary" >Book this appointment</Button>
    </Card>

        {/* <div></div>
         <div>{availableAppointment.doctor.name}</div> 
         <div>{availableAppointment.date}</div>  */}

        </div>
    })

   } 





    </div>
  )
}

export default Dashboard