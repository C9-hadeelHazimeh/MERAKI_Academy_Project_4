import React from 'react'

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Contact = () => {

  return (
    <div className='Contact'>
<Container>
      <Row>
        <Col md={6}>
          <Form>
            <h3> Send us your message </h3>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
               
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                
                name="email"
                
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                
                name="subject"
                
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message"
                name="message"
                
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Col>
        
      {/* <Button variant="primary" type="submit">
              Back to Home
            </Button> */}
            
        <Col  className='contactInfo' md={6}>
          
          <p>Contact us at:</p>
          <p>Email: hadeel.f.hazaimeh@gmail.com</p>
          <p>Phone: +962 775988980</p>
        </Col>
       
      </Row>
     
    </Container>
 




    </div>
  )
}

export default Contact
