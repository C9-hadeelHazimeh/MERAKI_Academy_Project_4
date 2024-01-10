import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate=useNavigate();
  const [name, settName] = useState("");
  const [age, setage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(0);
  const [phoneNumber, setphoneNumber] = useState(0);
  const [role, setRole] = useState(null);
  //const patienrole
  //const doctorrole

  //   const [isPatient,setisPaitent]=useState(false);

  const [specialist, setSpecialist] = useState("");
  //if ispatient===true=>show appointments,patientHistory else show specialist
  const [appointments, setAppointments] = useState(null);
  const [patientHistory, setPatientHistory] = useState(null);
  // const handleisPatient=()=>{
  //     role==="objectId"&&setisPaitent(true)
  //     return true

  // }

  const [message, setmessage] = useState("");
  const [messageStatus, setMessageStatus] = useState(true);
  const [errormessage, setErrormessage] = useState("");

  //if he is patient show the date that related to the patient => else show the date of doctor
  const handleRadioChoice = (e) => {
    setRole(e.target.value);
    console.log(role)
  };
  
  const createNewUser = (e) => {
    e.preventDefault();
    const newUser = { name, age, email, password, phoneNumber};
    console.log(newUser);
    axios
      .post("http://localhost:5000/users/register", newUser)
      .then((res) => {
        
        //set massage that comes from Backend
        setMessageStatus(true);
        setmessage(res.data.message);

        
        // navigate("/login");
      })
      .catch((err) => {
        console.log("err>>:", err.response.data.message);
        setMessageStatus(false);
        setErrormessage(err.response.data.message);
      });
  };

  return (
    <div className="container">
      Register
      <Form>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="your name..."
              onChange={(e) => {
                settName(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="your Email..."
              onChange={(e) => {
                setEmail(e.target.value);
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
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              placeholder="your Password..."
              onChange={(e) => {
                setPassword(e.target.value);
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
            age
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="your age..."
              onChange={(e) => {
                setage(e.target.value);
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
            Phone Number
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="your phone number ..."
              onChange={(e) => {
                setphoneNumber(e.target.value);
              }}
            />
          </Col>
        </Form.Group>

        <fieldset>
          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
              Registed as :
            </Form.Label>
            <Col sm={5}>
              <Form.Check
                type="radio"
                label="Doctor"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
                value="659c1d016497cdf283b73d84"
                checked={role === "doctor"} //doctorRole
                onChange={handleRadioChoice}
              />
              <Form.Check
                type="radio"
                label="patient"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                value="659c1d276497cdf283b73d86"
                checked={role === "patient"} //patientRole
                onChange={handleRadioChoice}
              />
            </Col>
          </Form.Group>
        </fieldset>
        {role === "659c1d016497cdf283b73d84" ? (
          
                <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={2}>
              Specialist
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="your Specialist ..."
                  onChange={(e) => {
                    setSpecialist(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>
         
        ) :    <></>    
            
        }

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit"  onClick={createNewUser}>
              Register
            </Button>
          </Col>
        </Form.Group>
      </Form>

      {messageStatus ?  <>
      <h4>{message}</h4>
      
      <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" onClick={()=>{navigate("/login")}}>
              login
            </Button>
          </Col>
        </Form.Group>

      </>
      : <div>{errormessage}</div>}

    
</div>
  );
};

export default Register;
