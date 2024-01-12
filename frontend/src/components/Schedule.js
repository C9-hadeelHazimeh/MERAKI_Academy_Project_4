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
const Schedule = () => {
  const [clinic,setClinic]=useState(null);
  const [date,setDate]=useState(null)
  const [hour,setHour]=useState(null)
  const [clinics] = useState(['Derma', 'Dentist', 'general'])
const {token}=useContext(UserContext)

const newAvailableAppointemt=()=>{
// const dateTime = new Date(date);
// const formattedDate = dateTime.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
// const fullDateTime = `${formattedDate} ${hour}`;
// const fullDateTime = new Date(

//   `${date.toLocaleDateString()} ${hour}`
// )

    const appointment = { clinic, date };
// const appointment={clinic,date};
console.log("Submitted:", appointment);
console.log("test")
   axios.post(`http://localhost:5000/appointments/book`,appointment, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((result)=>{
      console.log(result)
     
      }).catch((err)=>{
       console.log(err)
      })
      }


  return (
<div className='container'>

{/* <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Date
          </Form.Label>
          <Col sm={10}>
            <DatePicker
              selected={date}
              onChange={(newDate) => setDate(newDate)}
              dateFormat="MMMM d, yyyy"
              className="form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Hour
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="time"
              onChange={(e) => setHour(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Clinic
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              value={clinic}
              onChange={(e) => setClinic(e.target.value)}
            >
              <option value="">Select Clinic</option>
              {clinics.map((clinicOption, index) => (
                <option key={index} value={clinicOption}>
                  {clinicOption}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button onClick={newAvailableAppointemt}>
              Add to the schedule
            </Button>
          </Col>
        </Form.Group>
      </Form> */}

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
                const formattedDate = new Date(e.target.value).toLocaleString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                 hour12: true,
                })
                console.log(formattedDate)
                setDate(formattedDate);
               
              }}
            />
          </Col>
        </Form.Group>


        <Form.Select value={hour} onChange={(e) => {setHour(e.target.value)
      
        console.log(hour)
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
 


</div>

  )
}

export default Schedule