import React, { useContext,useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const Register = () => {

  const [name, settName] = useState("");
  const [age, setage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(0);
  const [phoneNumber, setphoneNumber] = useState(0);

//   const [message, setmessage] = useState("");
//   const [mesageStatus, setMessageStatus] = useState(true);
//   const [errormessage, setErrormessage] = useState("");



  return (
    <div className='container'>Register

<Form>
    
     <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          name
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="text" placeholder="your name..." pnChange/>
          
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="email" placeholder="your Email..." />
        </Col>
      </Form.Group>

     
      
       <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Password
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="password" placeholder="your Password..." />
        </Col>
      </Form.Group>
      
       <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          age
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="number" placeholder="your age..." />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Phone Number
        </Form.Label>
        <Col sm={10}>
          <Form.Control type="number" placeholder="your phone number ..." />
        </Col>
      </Form.Group>
      
      
      
      
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2}>
            Registed as :
          </Form.Label>
          <Col sm={5}>
            <Form.Check
              type="radio"
              label="Doctor"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="patient"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
            />
            
          </Col>
        </Form.Group>
      </fieldset>
     

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Register</Button>
        </Col>
      </Form.Group>
    </Form>





    </div>
  )
}

export default Register