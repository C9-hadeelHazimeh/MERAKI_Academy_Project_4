import React, { useEffect, useState } from "react";

import { useContext } from "react";
import Form from "react-bootstrap/Form";
// import "../../src/App.css";
import { Link, useNavigate } from "react-router-dom";
import {Button,CloseButton ,Row,Col, Card,  ListGroup,  Modal} from "react-bootstrap";
import { UserContext } from "../App";
import axios from "axios";

const Case = () => {
  const [diagnosis, setDiagnosis] = useState(null);
  const [treatment, setTreatment] = useState(null);
  const [patientCase, setPatientCase] = useState("");
  const [addpatientCase, setAddpatientCase] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [patientHistory, setPatientHistory] = useState([]);
  const [showPatientHistory, setshowPatientHistory] = useState("");
  const [showmodal, setShowModal] = useState(false);
  const { token } = useContext(UserContext);
  const [mesageStatus, setMessageStatus] = useState(false);
  const [message, setmessage] = useState("");

  const [errormessage, setErrormessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/appointments/getBooked`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("result.data", result);
        setBookedAppointments(result.data.appointmentDetails);
        console.log("bookedAppointments", result.data.appointmentDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePatientCase = (patientId) => {
    console.log("patientIdin post case", patientId);
    const patientCase = { diagnosis, treatment };

    axios
      .post(`http://localhost:5000/cases/create/${patientId}`, patientCase, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      .then((result) => {
        console.log(result);
        setAddpatientCase(result.data.addpatientCase);
        setMessageStatus(true);
        setmessage(result.data.message);
      })
      .catch((err) => {
        console.log(err);
        setMessageStatus(false);
        setErrormessage(err.response.data.message);
      });
  };
  const getpatientHistory = (patientId) => {
    console.log("patientIdinGet", patientId);
    axios
      .get(`http://localhost:5000/cases/get/${patientId}`)

      .then((result) => {
        setPatientHistory(result.data.patientHistory);
        console.log("patientHistory", result.data.patientHistory);
        // result.data.patientHistory.map((elem)=>{
        //   console.log(elem._id)
        // })
        setMessageStatus(true);
        setmessage(result.data.message);
      })
      .catch((err) => {
        console.log(err);
        setMessageStatus(false);
        setErrormessage(err.response.data.message);
      });
  };

  return (
    <div className="about">
     {showmodal && (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog>
        <Modal.Body>
          {mesageStatus ? <p>{message}</p>:<p>{errormessage}</p>}
        </Modal.Body>

        <Modal.Footer>
          <Button  className="button" variant="secondary" onClick={() => {setPatientCase(null);
            setShowModal(false)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )}
  {bookedAppointments.map((bookAppointment, i) => (
    <Row>
      {/* Main Card */}
      <Col md={6}>
        <Card style={{ width: "18rem" ,margin:"2rem"}}>
          <Card.Header>Booked Appointment </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>{bookAppointment.patient.name}</ListGroup.Item>
            <ListGroup.Item>{bookAppointment.schedule.date}</ListGroup.Item>
            <ListGroup.Item>{bookAppointment.schedule.doctor.name}</ListGroup.Item>
            <ListGroup.Item>{bookAppointment.schedule.time}</ListGroup.Item>
          </ListGroup>
          <Row>
            <Col>
              <Button
              className="button-2"
                variant="primary"
                onClick={() => {
                  setPatientId(bookAppointment.patient._id);
                  getpatientHistory(bookAppointment.patient._id);
                  setshowPatientHistory(bookAppointment._id);
                }}
              >
                get patient history
              </Button>
            </Col>
            <Col>
              <Button
                className="button-2"
                variant="primary"
                onClick={() => {
                  setPatientCase(bookAppointment._id);
                }}
              >
                fill patient Case
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>

      {/* Patient History Card */}
      <Col md={6}>
        {showPatientHistory === bookAppointment._id && (
          <>
            {patientHistory.map((elem, j) => (
              <Card  style={{ width: "18rem",margin:"2rem"}}>
                <Card.Header >

                  
                  
                  patient History:
                  <CloseButton 
                   style={{ float: "right" }}
                  onClick={()=>{setshowPatientHistory(null)}}/>
                  
                  
                  
                   </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>Diagnosis: {elem.diagnosis}</ListGroup.Item>
                  <ListGroup.Item>Treatment: {elem.treatmet}</ListGroup.Item>
                </ListGroup>
              </Card>
            ))}
          </>
        )}
      </Col>

      {/* Patient Case Card */}
      {patientCase === bookAppointment._id && (
        <Col md={12} className="mt-3">
          <Card style={{ width: "30rem",margin:"2rem" }}>
            <Card.Header>Add Patient Case</Card.Header>
            <Card.Body>
              
              <Form>
                        <Form.Group as={Row} className="mb-3">
                         
                          <Col sm={15}>
                            <Form.Control
                               className="addReview"
                               as="textarea"
                               rows={4}



                              placeholder="The diagnosis..."
                              onChange={(e) => {
                                setDiagnosis(e.target.value);
                                // console.log(diagnosis);
                              }}
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formHorizontalPassword"
                        >
                          
                          <Col sm={15}>
                            <Form.Control
                               className="addReview"
                               as="textarea"
                               rows={4}
                              placeholder="Treatment..."
                              onChange={(e) => {
                                setTreatment(e.target.value);
                                
                              }}
                            />
                          </Col>
                        </Form.Group>
                        <Row>
<Col>
                        <Button
                          className="button-2"
                          variant="primary"
                          onClick={() => {
                            //setPatientId(bookAppointment.patient._id);
                            handlePatientCase(bookAppointment.patient._id);
                            setShowModal(true);
                          }}
                        >
                          Add to Patient History
                        </Button>

                        </Col>

                        <Col>
                        <Button
                        style={{height:"100%"}}
                        onClick={()=>{
                          setPatientCase(null)
                       
                        }}
                      className="button-2"
                        
                        >Close</Button>
                        
                        
                        
                        
                        </Col>
                        </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  ))}


    </div>
  );
};

export default Case;



