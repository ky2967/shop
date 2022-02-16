import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

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

  const [showAlert, setShowAlert] = useState(true);

  const sho = shoes.find((item) => item.id === parseInt(id));
  // Ajax를 이용하여 데이터 추출 가능  ex) {id : 0}

  // 컴포넌트 렌더링 시 실행
  useEffect(() => {
    // 특정시간이 지나서 코드 실행
    let timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    // 컴포넌트가 반응될 때 코드 실행
    // return function func(() => {

    // });
  });

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
          <img
            src={`https://codingapple1.github.io/shop/shoes${sho.id + 1}.jpg`}
            alt={sho.id}
            width="100%"
          />
          <h4>{sho.title}</h4>
          <p>{sho.content}</p>
          <p>{sho.price}KRW</p>
          <button className="btn btn-danger">주문하기</button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack(); // 뒤로가기
              // history.pust("/some/any"); // 특정경로로 이동
            }}
          >
            뒤로
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default Detail;
