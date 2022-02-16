import React, {useState} from 'react';
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
import {Link, Route, Switch} from 'react-router-dom';
import Detail from './Component/Detail';

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
              <Nav.Link to="/" as={Link}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/Detail">
                Detail
              </Nav.Link>
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

      <Switch>
        <Route exact path="/">
          {/* exact paht : path가 무조건 이렇게 나와야지만 페이지 호출 */}
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
        </Route>

        <Route path="/detail/:id">
          <Detail shoes={shoes} />
        </Route>

        <Route path="/:id">
          {/* 슬래시(/)뒤에 아무 문자열(parameter)이나 적었을 때 나옴 */}
          <div>anything</div>
        </Route>
      </Switch>
      {/* Switch 내부 Route 컴포넌트 중 url에 맞게 하나만 매칭되어 보여지도록 함 */}
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
