import React from 'react';
import {combineReducers} from 'redux';
import module1 from './modules/module1';

let initState = [
  {id: 0, name: 'nice shoes', quan: 2},
  {id: 1, name: 'agly shoes', quan: 7},
];

const ITEM_INSERT = '항목추가';
const QUAN_UP = '수량증가';
const QUAN_DOWN = '수량감소';

// redux에 등록된 state를 수정해주는 함수
function reducer(state = initState, action) {
  console.log('reducer');
  let temp = [...state];
  //debugger;

  switch (action.type) {
    case ITEM_INSERT:
      let index = state.findIndex((item) => item.name === action.payload.name);

      if (index === -1) {
        temp.push(action.payload);
      } else {
        state[index].quan += action.payload.quan;
      }
      return temp;
    case QUAN_UP:
      temp[action.payload.id].quan++;
      return temp;
    case QUAN_DOWN:
      temp[action.payload.id].quan--;
      if (temp[action.payload.id].quan < 0) temp[action.payload.id].quan = 0;
      return temp;
    default:
      return state;
  }
}

function reducer2(state = true, action) {
  console.log('reducer2');
  if (action.type === 'CloseAlert') return false;
  return state;
}

const rootRecuder = combineReducers({reducer, reducer2});

export default rootRecuder;
