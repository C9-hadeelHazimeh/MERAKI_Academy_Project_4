import React from 'react'
import Form from 'react-bootstrap/Form';
import "../../src/App.css"


const Login = () => {
  return (
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

    </div>


   
  )
}

export default Login