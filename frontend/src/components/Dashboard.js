import React, { createContext, useContext, useEffect, useState } from "react";
import {Container,Nav,Navbar,Card,ListGroup,Button,Modal} from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import axios from "axios";

const Dashboard = () => {
  const [availableAppointments, setAvailableAppointments] = useState([]);

  const [userId, setUserId] = useState("");
  const { token } = useContext(UserContext);
  const [Patient, setPatient] = useState("");
  const [message, setmessage] = useState("");
  const [mesageStatus, setMessageStatus] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const [showmodal,setShowModal]=useState(false)
  //get All availableAppointments (scheduled in database)
  useEffect(() => {
    axios
      .get(`http://localhost:5000/appointments/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("result.data.sechdule", result.data);
        //set userId with the patient id
        setUserId(result.data.patient);
        setAvailableAppointments(result.data.sechdule);
        
      })
      .catch((err) => {
        
        console.log(err);

      });
  }, []);

  const BookAppointemts = (availableAppointmentId) => {
    //  //sechduleId
    //  console.log(availableAppointmentId)
    axios
      .post(
        `http://localhost:5000/appointments/${availableAppointmentId}/appointment`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        setPatient(result.data.appointment.patient);
        console.log("patient", Patient, "userId", userId);
        setMessageStatus(true);
        setmessage(result.data.message);
      })
      .catch((err) => {
        //  setMessageStatus(false);
        console.log(err);
        setMessageStatus(false)
        setErrormessage(err.response.data.message);
        // console.log("errormessage",err.response.data.message)
      });
  };

  return (
    <div>
        
             <Navbar expand="lg" className="navBar">
          
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              <Nav.Link >
                  <Link  className="link" to="/dashboard">Available appointments</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link className="link" to="/login">Book an appointment</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link  className="link" to="/getclinic"> Clinics</Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          
        </Navbar> 
     

        {showmodal && (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog>
        <Modal.Body>
          {mesageStatus ? <p>{message}</p>:<p>{errormessage}</p>}
        </Modal.Body>

        <Modal.Footer>
          <Button  className="button" variant="secondary" onClick={() => {setShowModal(false)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )}
  <Container className="cardContainer">
        {availableAppointments.map((availableAppointment, i) => {
          return (
            
              <Card style={{ width: '17rem', margin: '5x' }}>
                <Card.Header>Available Appointment </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item> Clinic: {availableAppointment.clinic}</ListGroup.Item>
                  <ListGroup.Item>
                   Doctor Name: {availableAppointment.doctor.name}
                  </ListGroup.Item>
                  <ListGroup.Item> Date: {availableAppointment.date}</ListGroup.Item>
                  <ListGroup.Item> Time: {availableAppointment.time}</ListGroup.Item>
                </ListGroup>

                <Button 
                className="button"
                  variant="primary"
                  onClick={() => {
                    BookAppointemts(availableAppointment._id);
                    setShowModal(true)
                  }}
                >
                  Book this appointment
                </Button>
              </Card> 
           
          ) 
        })}
 </Container>

        
    </div>
  );
};

export default Dashboard;
