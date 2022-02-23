import React from 'react';
import {Table} from 'react-bootstrap';
import {connect, useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import module1, {quanUp, quanDown} from '../reducer/modules/module1';

function Cart(props) {
  // connect(rdxFunc)보다 간편하게 redux state를 가져올 수 있는 방법
  // state : redux 안에 있던 모든 state를 가져올 수도 있고 일부만 가져올 수 도 있음.
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  let history = useHistory();

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {state.reducer.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quan}</td>
                <td>
                  <button
                    onClick={() => {
                      // dispatch : redux reducer 사용방법. redux로 정의된 데이터를 수정할 때 사용
                      //props.dispatch({
                      dispatch({
                        // 훅(useDispatch 함수 사용)을 이용한 간단한 dispatch 사용
                        type: '수량감소',
                        payload: {id: item.id}, // payload : 화물이란 뜻. 데이터 전달
                      });
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => {
                      dispatch({
                        type: '수량증가',
                        payload: {id: item.id},
                      });
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {state.reducer2 ? (
        <div className="my-alert2">
          <p>지금 구매하시면 신규할인 20%</p>
          <button
            onClick={() => {
              props.dispatch({type: 'CloseAlert'});
            }}
          >
            닫기
          </button>
          <button
            onClick={() => {
              history.goBack(); // 뒤로가기
            }}
          >
            뒤로가기
          </button>
        </div>
      ) : null}
    </div>
  );
}

// redux에 저장되어있는 state를 props없이 가져다가 씀
// function rdxFunc(store) {
//   return {arrData: store.reducer, isAlert: store.reducer2};
// }

// connect라는 redux함수를 이용하여 rdxFunc으로 redux store를 받아와서 Cart에서 props로 사용할 수 있도록 만듬
//export default connect(rdxFunc)(Cart);

export default Cart;
