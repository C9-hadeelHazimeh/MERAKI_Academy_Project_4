import React, { useContext, useState } from 'react'
// import { RoleContext } from './Register';
import { UserContext } from '../App';
import axios from 'axios';

import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DatePicker from 'react-datepicker';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 
const Schedule = () => {
  const [clinic,setClinic]=useState(null);
  const [date,setDate]=useState(null);
  const [time,setTime]=useState(null);
  const [clinics] = useState(['Derma', 'Dentist', 'general']);
  const [message,setMessage]=useState("");
  const [errorMessage,setErrorMessage]=useState("");
  const [messageStatus,setMessageStatus]=useState(false);

const {token}=useContext(UserContext)

const newAvailableAppointemt=()=>{

  const appointment = {clinic,date,time};

// console.log("Submitted:", appointment);

   axios.post(`http://localhost:5000/appointments/book`,appointment, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((result)=>{
      // console.log(result)
      setMessageStatus(true);
       setMessage(result.data.message)
        
     
      }).catch((err)=>{
      //  console.log(err)
       setMessageStatus(false);
      setErrorMessage(err.response.data.message);
      })
      }


return ( 
<div className='container'>
<Form>
<Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link><Link to="/schedule">my Schdule</Link></Nav.Link>
          <Nav.Link><Link to="/patientCase">Add patient Case</Link></Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
    </Form>
       

  <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Date
          </Form.Label>
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


        <Form.Select value={time} onChange={(e) => {setTime(e.target.value)
      
        console.log(time)
        }}>
        <option value="">Select Hour </option>
        <option value="8-9">8:00 AM - 9:00 AM</option>
        <option value="9-10">9:00 AM - 10:00 AM</option>
       
      </Form.Select>

     <Form.Select value={clinic} onChange={(e) => setClinic(e.target.value)}>
        <option value="">Select Clinic</option>
        {clinics.map((clinicOption, index) => (
          <option key={index} value={clinicOption}>
            {clinicOption}
          </option>
        ))}
      </Form.Select> 
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button onClick={newAvailableAppointemt}>Add to the sechdule</Button>
          </Col>
        </Form.Group>
      </Form> 
 
{messageStatus?<p>{message}</p>:<p>{errorMessage}</p>}

</div>
)

}

export default Schedule