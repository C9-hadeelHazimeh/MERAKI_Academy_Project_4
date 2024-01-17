import React, { useContext, useState } from 'react'
// import { RoleContext } from './Register';
import { UserContext } from '../App';
import axios from 'axios';

import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
const Schedule = () => {
  const [clinic,setClinic]=useState(null);
  const [date,setDate]=useState(null);
  const [time,setTime]=useState(null);
  const [clinics] = useState(['Derma', 'Dentist', 'general']);
  const [message,setMessage]=useState("");
  const [errorMessage,setErrorMessage]=useState("");
  const [messageStatus,setMessageStatus]=useState(false);
  const [showmodal,setShowModal]=useState(false)
const {token}=useContext(UserContext)

const newAvailableAppointemt=()=>{

  const appointment = {clinic,date,time};

   axios.post(`http://localhost:5000/appointments/book`,appointment, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((result)=>{
      // console.log(result)
      setMessageStatus(true);
       setMessage(result.data.message);
       setShowModal(true);
        
     
      }).catch((err)=>{
      //  console.log(err)
       setMessageStatus(false);
      setErrorMessage(err.response.data.message);
      setShowModal(true);
      })
      }


return ( 
<div className="about">
<Form>
<Navbar expand="lg" className="navBar">
      
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link><Link  className="link" to="/schedule">my Schedule</Link></Nav.Link>
          <Nav.Link><Link  className="link" to="/patientCase">Add patient Case</Link></Nav.Link>
          <Nav.Link><Link  className="link" to="/clinic">Add to a clinic</Link></Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      
    </Navbar> 
    </Form>
       
    {showmodal && (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog>
        <Modal.Body>
          {messageStatus? <p>{message}</p>:<p>{errorMessage}</p>}
        </Modal.Body>

        <Modal.Footer>

          <Button   onClick={() => {setShowModal(false)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )}


  <Form style={{margin:"6rem"}}>
        <Form.Group as={Row} className="mb-3">
         
          <Col sm={10}>
          
            <Form.Control
           

              type="date"
              placeholder="The date..."
              onChange={(e) => {
                
                setDate(e.target.value);
               
              }}
            />
          </Col>
        </Form.Group>


        <Form.Select
        style={{marginBottom:"1rem"}}
        value={time} onChange={(e) => {setTime(e.target.value)
      
        }}>
        <option value="">Select Hour </option>
        <option value="8-9">8:00 AM - 9:00 AM</option>
        <option value="9-10">9:00 AM - 10:00 AM</option>
        <option value="10-11">10:00 AM - 11:00 AM</option>
        <option value="11-12">11:00 AM - 12:00 AM</option>
        <option value="12-01">12:00 AM - 1:00 AM</option>
        <option value="01-02">1:00 AM - 2:00 AM</option>
        <option value="02-03">2:00 AM - 3:00 AM</option>
        <option value="03-04">3:00 AM - 4:00 AM</option>
      </Form.Select>

     <Form.Select style={{marginBottom:"1rem"}} value={clinic} onChange={(e) => setClinic(e.target.value)}>
        <option value="">Select Clinic</option>
        {clinics.map((clinicOption, index) => (
          <option key={index} value={clinicOption}>
            {clinicOption}
          </option>
        ))}
      </Form.Select> 
        <Form.Group as={Row} className="mb-3">
          
            <Button className='button-3' onClick={newAvailableAppointemt}
              
              
              >Add to the sechdule</Button>
         
        </Form.Group>
      </Form> 
 
{/* {messageStatus?<p>{message}</p>:<p>{errorMessage}</p>} */}

</div>
)

}

export default Schedule