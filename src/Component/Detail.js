import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom';

function Detail(props) {
  let history = useHistory();
  let {id} = useParams(); // Router의 Param 훅. /:id에 사용자가 입력한 값이 변수에 저장

  let [shoes, setShoes] = useState(props.shoes);

  const sho = shoes.find((item) => item.id === parseInt(id));
  // Ajax를 이용하여 데이터 추출 가능  ex) {id : 0}

  return (
    <Container>
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
