import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
const GetClinic = () => {
  const [clinics, setClinics] = useState([]);
  const [message, setmessage] = useState("");
  const [mesageStatus, setMessageStatus] = useState(false);
  const [errormessage, setErrormessage] = useState("");
 const [showReviews,setShowReviews]=useState(false)
  const { token } = useContext(UserContext);
const  [showAddingReview,setshowAddingReview]=useState(false)
const [review,setReview]=useState("")
const [clinicId,setclinicId]=useState("")
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
        // console.log("setClinics", clinics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddingReview = (clinicId) => {
    const newReview={review};
     axios
      .post(
         `http://localhost:5000/review/create/${clinicId}`,
        newReview,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log("review,",result);
        // setReview(result.data.review)
        setMessageStatus(true);
        setmessage(result.data.message);
      })
      .catch((err) => {
        //  setMessageStatus(false);
        console.log(err);
        setMessageStatus(false)
        setErrormessage(err.response.data.message);
        // console.log("errormessage",err.response.data.message)
      });
  };



  return (

    
    <div className="reviews">

<div className="reviews">
      {clinics.map((oneClinic) => (
        <Row >
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
          
            <Button 
            onClick={()=>{setshowAddingReview(true)}}
            >Add a review</Button> 
           
           {showAddingReview&& (
            <>
           <Form.Group as={Row} className="mb-3">
           <Form.Label column sm={2}>
             Review
           </Form.Label>
           <Col sm={10}>
             <Form.Control
               type="text"
               placeholder="your Review..."
               onChange={(e) => {
                 setReview(e.target.value);
                 // console.log(email);
               }}
             />
           </Col>
           <Button
           onClick={()=>{
            console.log("addReview")
            setclinicId(oneClinic._id)
            handleAddingReview(clinicId)

           }}
           
           >Submit</Button>
         </Form.Group>
 
           
         </>

           )}
          
          {showReviews && (
            <Col md={4}>
              <Card style={{ width: "18rem" }}>
                <Card.Header>Reviews</Card.Header>
                <ListGroup variant="flush">
                  {oneClinic.reviews.map((oneReview) => (
                    <ListGroup.Item>
                       {oneReview.review}
                      </ListGroup.Item>
                    
                  ))}
                </ListGroup>
              </Card>
            </Col>
          )}

          
        </Row>
      ))}
      <p>{message}</p>
    </div>
      
    </div>
  );
};

export default GetClinic;
