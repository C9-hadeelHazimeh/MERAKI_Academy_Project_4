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
import { Container } from "react-bootstrap";
// import Modal from 'react-bootstrap/Modal';
const GetClinic = () => {
  const [clinics, setClinics] = useState([]);
  const [message, setmessage] = useState("");
  const [mesageStatus, setMessageStatus] = useState(false);
  const [errormessage, setErrormessage] = useState("");
 const [showReviews,setShowReviews]=useState("")
  const { token } = useContext(UserContext);
const  [showAddingReview,setshowAddingReview]=useState("")
const [review,setReview]=useState("")
const [clinicId,setclinicId]=useState("")
 const [showmodal,setShowModal]=useState(false)
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
    console.log("clinicId",clinicId)
     axios
      .post(
         `http://localhost:5000/clinics/review/create/${clinicId}`,
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

<div className="container">
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

 <div></div>

      {clinics.map((oneClinic) => (
        //card it self
        
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
              <Row>
                <Col>
              <Button  className="button-2"  onClick={() =>{setShowReviews(oneClinic._id) }}>
                Reviews
              </Button></Col>
              <Col>  <Button className="button-2"
            onClick={()=>{setshowAddingReview(oneClinic._id)}}
            >Add a review</Button></Col>
            </Row>
            </Card>
          </Col>
          
          {/*  the reviews card  */}
          { showReviews===oneClinic._id
          
          ? (
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
          ):""
          
          }




           
           {showAddingReview===oneClinic._id? (
            <>
           <Form.Group as={Row} className="mb-3">
           
           <Col sm={10}>
             <Form.Control
               type="text"
               placeholder=" write your Review..."
               onChange={(e) => {
                 setReview(e.target.value);
                 
               }}
             />
           </Col>
           <Col>
           <Button className="button"
           onClick={()=>{
            
            handleAddingReview(oneClinic._id)
           setShowModal(true)
           }}
           
           >Submit</Button>
           </Col>
         </Form.Group>
 
           
         </>

           ):""}
          
          

          
        </Row>
      ))}
      
    </div>
      
    </div>
  );
};

export default GetClinic;
