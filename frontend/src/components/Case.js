import React, { useState } from 'react'

import { useContext } from 'react';
import Form from "react-bootstrap/Form";
// import "../../src/App.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { UserContext } from "../App";

import axios from "axios";
const Case = () => {
  
const[diagnosis,setDiagnosis]=useState("");
const [treatmet,setTreatment]=useState("");
const {token}=useContext(UserContext);

const handlePatientCase=(patientId)=>{
console.log(patientId)
const patientCase = {diagnosis,treatmet};

  axios
      .post(`http://localhost:5000/cases/create/${patientId}`, patientCase, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      .then((result) => {
        console.log(result)
        // setMessageStatus(true);
        // setmessage(result.data.message); 
        //store the token in local storage
       
      })
      .catch((err) => {
        console.log(err)
        // setMessageStatus(false);
        // setErrormessage(err.response.data.message);
      });
  };



  return (
    <div className="container">
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
          Diagnosis
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="The diagnosis..."
              onChange={(e) => {
                setDiagnosis(e.target.value);
                
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
          Treatmet
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="treatmet..."
              onChange={(e) => {
                setTreatment(e.target.value);
              
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button onClick={handlePatientCase("659c1e0a6497cdf283b73d8a")}>Add Patient Case</Button>
          </Col>
        </Form.Group>
      </Form>

      {/* {mesageStatus ? <p> {message}</p> : <p>{errormessage}</p>}
      {isLoggedIn ? <div>welcome</div> : <p>you are not logged In</p>} */}
    </div>
    
  )
}

export default Case
