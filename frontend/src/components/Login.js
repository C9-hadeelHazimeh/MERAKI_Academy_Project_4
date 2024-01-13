import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import "../../src/App.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { UserContext } from "../App";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
const Login = () => {
  // UserContext
  const [email, setemail] = useState("");
  const [password, setPassword] = useState(0);
  const [message, setmessage] = useState("");
  const [mesageStatus, setMessageStatus] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const [Role, setRole] = useState("");
  const { token, isLoggedIn, setIsLoggedIn, setToken } =
    useContext(UserContext);

  const navigate = useNavigate();
  const userLogin = (e) => {
    // e.preventDefault();
    const user = { email, password };
    console.log("loggeduser :", user);
    axios
      .post("http://localhost:5000/users/login", user, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      .then((result) => {
        setMessageStatus(true);
        setmessage(result.data.message); //I have to remove this and make the messages as alerts
        //store the token in local storage
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("isLoggedIn", true);
        setToken(result.data.token);
        setIsLoggedIn(true);
        // console.log(token);
        userRole();
      })
      .catch((err) => {
        setMessageStatus(false);
        setErrormessage(err.response.data.message);
      });
  };

  const userRole = () => {
    axios
      .get(`http://localhost:5000/users/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setRole(result.data.role);
        console.log(Role);

        if (Role === "patient") {
          navigate("/dashboard");
        } else if (Role === "Doctor") {
          navigate("/schedule");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="your Email..."
              onChange={(e) => {
                setemail(e.target.value);
                // console.log(email);
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
                // console.log(password);
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button onClick={userLogin}>Login</Button>
          </Col>
        </Form.Group>
      </Form>

      {mesageStatus ? <p> {message}</p> : <p>{errormessage}</p>}
      {isLoggedIn ? <div>welcome</div> : <p>you are not logged In</p>}
    </div>
  );
};
export default Login;
