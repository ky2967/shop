import React, {useEffect, useState, useContext} from 'react';
import {Container, Row, Col, Nav} from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import {재고context} from './../App';
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';

// styled : CSS를 미리 입힌 컴포넌트
let 박스 = styled.div`
  padding: 20px;
`;

let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

function Detail(props) {
  let history = useHistory();

  let {id} = useParams(); // Router의 Param 훅. /:id에 사용자가 입력한 값이 변수에 저장

  let [shoes, setShoes] = useState(props.shoes);
  let [showAlert, setShowAlert] = useState(true);
  let [temp, setTemp] = useState('');
  let [tab, setTab] = useState(0);
  let [isSwitch, setIsSwitch] = useState(false);
  let [count, setCount] = useState(1);

  let sho = shoes.find((item) => item.id === parseInt(id));
  // Ajax를 이용하여 데이터 추출 가능  ex) {id : 0}

  let 재고 = useContext(재고context);

  // 컴포넌트 렌더링 시, 업데이트 시 실행
  // 여러개 선언 가능. 코드 순서대로 실행
  useEffect(() => {
    // 특정시간이 지나서 코드 실행
    let timer = setTimeout(() => {
      // setTimeout : 시간이 지나기 전 페이지 이동 시 문제가 발생할 수 있음.
      setShowAlert(false);
    }, 2000);
    console.log('aaa');

    // 컴포넌트가 사라질 때 return 실행
    // return function func(() => {
    // });
    return () => {
      clearTimeout(timer); // 컴포넌트가 꺼질 때 타이머를 종료시켜 문제 제거
    };
  }, [showAlert]); //  showAlert(Array 내 객체)가 변경될 때만 해당 useEffect가 실행됨. 최초에 한번은 실행 되긴함
  //}, []); //  어떤 객체가 업데이트 되어도 최초 한 번 말고는 더 이상 실행이 되지 않음.

  return (
    <Container>
      <박스>
        <제목 className="red">Detail</제목>
      </박스>
      {showAlert ? (
        <div className="my-alert-red">
          <p>재고가 얼마 남지않았습니다.</p>
        </div>
      ) : null}
      <Row>
        <Col>
          {temp}
          <input
            onChange={(e) => {
              setTemp(e.target.value);
            }}
          ></input>
          <img
            src={`https://codingapple1.github.io/shop/shoes${sho.id + 1}.jpg`}
            alt={sho.id}
            width="100%"
          />
          <h4>{sho.title}</h4>
          <p>{sho.content}</p>
          <p>{sho.price}KRW</p>
          <Info 재고={재고} index={id}></Info>
          <div>
            수량 :<input type="text" value={count} />
          </div>
          <button
            className="btn btn-danger"
            onClick={() => {
              const temp = [...props.재고];
              temp[id]--;
              props.set재고(temp);
              props.dispatch({
                type: '항목추가',
                payload: {
                  id: sho.id,
                  name: sho.name,
                  quan: count,
                },
              });
              history.push('/cart');
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack(); // 뒤로가기
              // history.push('/some/any'); // 특정경로로 이동
            }}
          >
            뒤로가기
          </button>
        </Col>
      </Row>
      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              setTab(0);
              setIsSwitch(false);
            }}
          >
            Option 1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setTab(1);
              setIsSwitch(false);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={isSwitch} classNames="wow" timeout={500}>
        {/* 애니메이션 css를 쓰고 싶을 때 사용 */}
        <TabContent index={tab} setIsSwitch={setIsSwitch}></TabContent>
      </CSSTransition>
    </Container>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.setIsSwitch(true);
  });

  let component = null;
  switch (props.index) {
    case 0:
      component = <div>000</div>;
      break;
    case 1:
      component = <div>111</div>;
      break;
    case 2:
      component = <div>222</div>;
      break;
    default:
      break;
  }
  return component;
}

function Info(props) {
  return <p>재고 : {props.재고[props.index]}</p>;
}

function rdxFunc(store) {
  return {arrData: store.reducer, isAlert: store.reducer2};
}

export default connect(rdxFunc)(Detail);
