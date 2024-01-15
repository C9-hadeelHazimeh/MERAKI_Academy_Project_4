import React, { useEffect, useState } from "react";

import { useContext } from "react";
import Form from "react-bootstrap/Form";
// import "../../src/App.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { UserContext } from "../App";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import Modal from "react-bootstrap/Modal";
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
    const [showmodal,setShowModal]=useState(false)
  const { token } = useContext(UserContext);
  const [mesageStatus, setMessageStatus] = useState(false);
  const [message, setmessage] = useState("");
  
  const [errormessage, setErrormessage] = useState("");
  const navigate=useNavigate();
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
    <div className="container">
    <Button onClick={() => {navigate("/schedule")}}>
            Back to Your Dashboard
          </Button>
{showmodal && (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog>
        <Modal.Body>
          {mesageStatus ? <p>{message}</p>:<p>{errormessage}</p>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setShowModal(false)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )}



      {bookedAppointments.map((bookAppointment, i) => {
        return (
          <div className="container" key={i}>
            <Card style={{ width: "18rem" }}>
              <Card.Header>Booked Appointment </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>{bookAppointment.patient.name}</ListGroup.Item>
                <ListGroup.Item>{bookAppointment.schedule.date}</ListGroup.Item>
                <ListGroup.Item>
                  {bookAppointment.schedule.doctor.name}
                </ListGroup.Item>
                <ListGroup.Item>{bookAppointment.schedule.time}</ListGroup.Item>
              </ListGroup>
              <Button
                variant="primary"
                onClick={() => {
                  setPatientId(bookAppointment.patient._id);
                  getpatientHistory(bookAppointment.patient._id);
                  setshowPatientHistory(bookAppointment._id);
                }}
              >
                get patient history
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setPatientCase(bookAppointment._id);
                  
                }}
              >
                fill patient Case
              </Button>
            </Card>

            {/* <Button variant="primary" onClick={() => {}}>
              update patient case
            </Button> */}

            {patientCase ===bookAppointment._id?(
              <>
                <Card style={{ width: "30rem" }}>
                  <Card.Header>Add Patient Case</Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={4}>
                          Diagnosis:
                        </Form.Label>
                        <Col sm={15}>
                          <Form.Control
                            type="text"
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
                        <Form.Label column sm={4}>
                          Treatment
                        </Form.Label>
                        <Col sm={15}>
                          <Form.Control
                            type="text"
                            placeholder="Treatment..."
                            onChange={(e) => {
                              setTreatment(e.target.value);
                              // console.log(treatmet);
                            }}
                          />
                        </Col>
                      </Form.Group>

                      <Button
                        variant="primary"
                        onClick={() => {
                          //setPatientId(bookAppointment.patient._id);
                          handlePatientCase(bookAppointment.patient._id);
                          setShowModal(true)
                        }}
                      >
                        Add to Patient History
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </>
            ):""}

            {showPatientHistory===bookAppointment._id? (
              <>
                {patientHistory.map((elem, i) => (
                  <div className="container" key={i}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Header>patient History: </Card.Header>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          Diagnosis:{elem.diagnosis}
                           </ListGroup.Item>
                        <ListGroup.Item>
                        Treatmet:{elem.treatmet}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </div>
                ))}
              </>
            ):""}
          </div>
        );
      })}
      
    </div>
  );
};

export default Case;
