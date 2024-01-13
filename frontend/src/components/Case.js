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
const [patientId,setPatientId]=useState("")
const {token}=useContext(UserContext);
const [message, setmessage] = useState("");
const [mesageStatus, setMessageStatus] = useState(false);
const [errormessage, setErrormessage] = useState("");


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
        setMessageStatus(true);
        setmessage(result.data.message); 
        setPatientId(result.data.patient)
        // setDiagnosis(result.data.patientHistory.diagnosis)
       
      })
      .catch((err) => {
        console.log(err)
        setMessageStatus(false);
        setErrormessage(err.response.data.message);
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
            
            <Button onClick={handlePatientCase(patientId)}>Add Patient Case</Button>
          </Col>
        </Form.Group>
      </Form>

      {mesageStatus ? <p> {message}</p> : <p>{errormessage}</p>}
     
    </div>
    
  )
}

export default Case
