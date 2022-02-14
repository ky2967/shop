import React, { useState } from 'react';
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Jumbotron,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import './App.css';
import Data from './data/data';

function App() {
  let [shoes, setShoes] = useState(Data);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">집으로</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Jumbotron className="background">
        <h1>20% Season Off</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
      <Container>
        <Row>
          {shoes.map((item, index) => {
            return (
              <Col>
                <Product key={index} item={item} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

function Product(props) {
  let item = props.item;
  let i = item.id;

  return (
    <div>
      <img
        src={`https://codingapple1.github.io/shop/shoes${i + 1}.jpg`}
        alt={i}
        width="100%"
      />
      <h4>{item.title}</h4>
      <p>
        {item.content} / {item.price}KRW
      </p>
    </div>
  );
}

export default App;
