import React, {useState, useContext} from 'react';
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
import axios from 'axios';

// 같은 변수값을 공유할 범위생성
export let 재고context = React.createContext();

function App() {
  // 중요 state는 상위 컴포넌트에 저장하는게 관습
  let [shoes, setShoes] = useState(Data);
  let [재고, set재고] = useState([10, 11, 12]);

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
            {/*  공유를 원하는 값. state를 props로 공유하지않고 쓸 수 있는 방법. */}
            <재고context.Provider value={재고}>
              <Row>
                {shoes.map((item, index) => {
                  return (
                    <Col>
                      <Product key={index} item={item} />
                    </Col>
                  );
                })}
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    // ajax 사용
                    axios
                      .get('https://codingapple1.github.io/shop/data2.json')
                      // 해당 브라우저의 데이터를 가져옴. 실제로 링크를 브라우저에서 확인하면 데이터가 보임
                      .then((result) => {
                        setShoes(shoes.concat(result.data));
                      }) // ajax가 성공했을 때 실행
                      .catch(() => {
                        console.log('fail!');
                      }); // ajax가 실패했을 때 실행
                  }}
                >
                  더보기
                </button>
              </Row>
            </재고context.Provider>
          </Container>
        </Route>

        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
            <Detail shoes={shoes} 재고={재고} set재고={set재고} />
          </재고context.Provider>
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
  let 재고 = useContext(재고context);

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
      {재고[i]}
    </div>
  );
}

export default App;
