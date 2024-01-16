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
          <Col md={6} className="custom-col">
            <Card onClick={handleCardClick}>
              {/* Card 1 content */}
              <Card.Body className="my-4">
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

          <Col md={6} className="custom-col">
            <Card>
              {/* Card 2 content */}
              <Card.Body className="my-4">
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
                  Check Out the available consulting data for your checkup .
                  
                  Make
                  appointment 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* footer */}

      <Container className="my-5">
        <Row style={{borderBottom:"2px solid"}}>
          <Col>
            <Card.Body className="media">
              <Card.Title>Services</Card.Title>
              <Card.Text className="cardText"></Card.Text>
              <hr />
            </Card.Body>
          </Col>
          <Col>
            <Card.Body className="media">
              <Card.Title>Contact Us</Card.Title>
              <Card.Text className="cardText"></Card.Text>
              <hr />
            </Card.Body>
          </Col>

          <Col>
            <Card.Body className="media">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-whatsapp"
                viewBox="0 0 16 16"
              >
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-facebook"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-telegram"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
              </svg>

              <hr />
            </Card.Body>
          </Col>
        </Row>

        <Row style={{marginTop:"30px"}}>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text className="cardText">
              <p>&copy; 2024 Care App. All rights reserved.</p>
            </Card.Text>
          </Card.Body>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
