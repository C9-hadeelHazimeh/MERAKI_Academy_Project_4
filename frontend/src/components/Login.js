import React from 'react'
import Form from 'react-bootstrap/Form';
import "../../src/App.css"
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
const Login = () => {
  return (
    <div>
    <div className='container'>
<Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>passWord</Form.Label>
        <Form.Control  />
      </Form.Group>
    </Form>
    {/* navigate */}
    <Button ><Link to="/home">Home</Link></Button>{' '}
    </div>
    
    </div>
   
  )
}

export default Login