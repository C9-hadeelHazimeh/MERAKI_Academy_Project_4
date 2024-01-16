import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import { Nav, Navbar, Row, Col, Card, Carousel } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Card from "react-bootstrap/Card";
// import Carousel from "react-bootstrap/Carousel";
import { UserContext } from "../App";
//  import ExampleCarouselImage from "../components/Booking"

const Home = () => {
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isLoggedIn === null) {
      navigate("/register");
    } else {
      console.log("login");
    }
  };

  return (
    //header
    <div>
     
      {/* slider */}
      <div className="slider">
        <Carousel>
          <Carousel.Item>
            <img
              src="https://res.cloudinary.com/dvmoaseij/image/upload/v1705348099/pexels-thirdman-5327584_cpf4va.jpg"
              alt="Logo"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://res.cloudinary.com/dvmoaseij/image/upload/v1705348357/pexels-andrea-piacquadio-3779696_z6wtx0.jpg" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://res.cloudinary.com/dvmoaseij/image/upload/v1705349551/pexels-matthias-zomer-339620_fdfjjy.jpg" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://res.cloudinary.com/dvmoaseij/image/upload/v1705350547/pexels-anna-shvets-5069611_jzwlz1.jpg" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      {/* cards */}

      <Container className="my-4">
        <Row>
          <Col md={6}>
            <Card onClick={handleCardClick}>
              {/* Card 1 content */}
              <Card.Body>
                <Card.Title>
                  <div className="icons">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="30"
                      fill="currentColor"
                      class="bi bi-person-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                  </div>
                </Card.Title>
                <Card.Text className="cardText">
                  Meet our highly qualified and experienced multilinguistic
                  medical professional.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              {/* Card 2 content */}
              <Card.Body>
                <Card.Title>
                  <div className="icons">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-table"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z" />
                    </svg>
                  </div>
                </Card.Title>
                <Card.Text className="cardText">
                  Check Out the available consulting data for your checkup 

                  Make appointment.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* footer */}
    </div>
  );
};

export default Home;
