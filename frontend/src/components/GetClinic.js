import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
const GetClinic = () => {
  const [clinics, setClinics] = useState([]);
  const [message, setmessage] = useState("");
  const [mesageStatus, setMessageStatus] = useState(false);
  const [errormessage, setErrormessage] = useState("");
 const [showReviews,setShowReviews]=useState(false)
  const { token } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/clinics/get`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("clinics", result.data.doctorInfo);
        setClinics(result.data.doctorInfo);
        console.log("setClinics", clinics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (

    
    <div className="reviews">

<div className="reviews">
      {clinics.map((oneClinic) => (
        <Row key={oneClinic._id}>
          <Col md={4}>
            <Card style={{ width: "18rem" }}>
              <Card.Header>Clinics</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>{oneClinic.image}</ListGroup.Item>
                <ListGroup.Item>
                  Clinic Name: {oneClinic.clinicName}
                </ListGroup.Item>
                <ListGroup.Item>
                  Doctor Name: {oneClinic.doctor.name}
                </ListGroup.Item>
              </ListGroup>
              <Button onClick={() => setShowReviews(true)}>
                Reviews
              </Button>
            </Card>
          </Col>

          {showReviews && (
            <Col md={4}>
              <Card style={{ width: "18rem" }}>
                <Card.Header>Reviews</Card.Header>
                <ListGroup variant="flush">
                  {oneClinic.reviews.map((oneReview) => (
                    <ListGroup.Item key={oneReview._id}>
                       {oneReview.review}
                      </ListGroup.Item>
                    
                  ))}
                </ListGroup>
              </Card>
            </Col>
          )}

          <Col md={4}>
            <Button>Add a review</Button> 
            {/* handle addReview */}
          </Col>
        </Row>
      ))}
      <p>{message}</p>
    </div>
      
    </div>
  );
};

export default GetClinic;
