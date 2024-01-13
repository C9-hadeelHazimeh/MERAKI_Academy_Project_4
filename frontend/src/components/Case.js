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
  const [treatmet, setTreatment] = useState(null);
  const [patientCase, setPatientCase] = useState(false);
  const [patientId,setPatientId]=useState(false)
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const[patientHistory,setPatientHistory]=useState(null);
  const[showPatientHistory,setshowPatientHistory]=useState(false);
  const { token } = useContext(UserContext);
  const [message, setmessage] = useState("");
  const [mesageStatus, setMessageStatus] = useState(false);
  const [errormessage, setErrormessage] = useState("");

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
    console.log(patientId);
    const patientCase = {diagnosis, treatmet};

    axios
      .post(`http://localhost:5000/cases/create/${patientId}`, patientCase, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      .then((result) => {
        console.log(result);
        setMessageStatus(true);
        setmessage(result.data.message);

      })
      .catch((err) => {
        console.log(err);
        setMessageStatus(false);
        setErrormessage(err.response.data.message);
      });
  };
const getpatientHistory=(patientId)=>{
  console.log(patientId);
  

  axios
    .get(`http://localhost:5000/cases/get/${patientId}`)

    .then((result) => {
      
      setPatientHistory(result.data.patientHistory)
      console.log("patientHistory",result.data.patientHistory)
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
            </Card>

            <Button
              variant="primary"
              onClick={() => {
                setPatientCase(true);
                console.log("fill patient Case");
              }}
            >
              fill patient Case
            </Button>

            <Button
              variant="primary"
              onClick={() => {
                

              }}
            >
              update patient case
            </Button>

            {patientCase ? (
              <>
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
                    <Form.Label column sm={2}>
                      Treatment
                    </Form.Label>
                    <Col sm={10}>
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
                </Form>
              </>
            ) : (
              <></>
            )}
            <Button
              variant="primary"
              onClick={() => {
                setPatientId(bookAppointment.patient._id)
                handlePatientCase(patientId);
              }}
            >
              add to patient History
            </Button>

            
            <Button
              variant="primary"
              onClick={() => {
                setPatientId(bookAppointment.patient._id)
                getpatientHistory(patientId)
                setshowPatientHistory(true)
              }}
            >
               get patient history
            </Button>
           
           {showPatientHistory?<>
           {patientHistory.map((elem)=>{
return elem._id
           })

           }
            
           
           
           </>:<></>}



          </div>
        );
      })}
      {mesageStatus ? <p>{message}</p> : <p>{errormessage}</p>}
    </div>
  );
};

export default Case;
