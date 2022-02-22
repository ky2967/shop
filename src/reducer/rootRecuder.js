import React from 'react';
import {combineReducers} from 'redux';

let 기본state = [
  {id: 0, name: 'nice shoes', quan: 2},
  {id: 1, name: 'agly shoes', quan: 7},
];

// redux에 등록된 state를 수정해주는 함수
function reducer(state = 기본state, 액션) {
  console.log('reducer');
  let temp = [...state];

  if (액션.type === '항목추가') {
    let index = state.findIndex((item) => item.name === 액션.payload.name);

    if (index === -1) {
      temp.push(액션.payload);
    } else {
      state[index].quan++;
    }
    return temp;
  } else if (액션.type === '수량증가') {
    temp[액션.payload.id].quan++;
    return temp;
  } else if (액션.type === '수량감소') {
    temp[액션.payload.id].quan--;
    if (temp[액션.payload.id].quan < 0) temp[액션.payload.id].quan = 0;
    return temp;
  }
  return state;
}

function reducer2(state = true, 액션) {
  console.log('reducer2');
  if (액션.type === 'CloseAlert') return false;
  return state;
}

const rootRecuder = combineReducers({reducer, reducer2});

export default rootRecuder;
