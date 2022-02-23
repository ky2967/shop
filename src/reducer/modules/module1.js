import React from 'react';
import {createAction, handleActions} from 'redux-actions';

let initialState = [
  {id: 0, name: 'nice shoes', quan: 2},
  {id: 1, name: 'agly shoes', quan: 7},
];

const ITEM_INSERT = '항목추가';
const QUAN_UP = '수량증가';
const QUAN_DOWN = '수량감소';

export const itemInsert = createAction(ITEM_INSERT); // name, quan
export const quanUp = createAction(QUAN_UP, (id) => id); // id
export const quanDown = createAction(QUAN_DOWN, (id) => id); // id

const module1 = handleActions(
  {
    [ITEM_INSERT]: (state, action) => {
      //debugger;
      let temp = [...state];
      let index = state.findIndex((item) => item.name === action.payload.name);

      if (index === -1) {
        temp.push(action.payload);
      } else {
        state[index].quan += action.payload.quan;
      }
      return temp;
    },
    [QUAN_DOWN]: (state, action) => {
      //debugger;
      state[action.payload.id].quan--;
      if (state[action.payload.id].quan < 0) state[action.payload.id].quan = 0;
      return state;
    },
    [QUAN_UP]: (state, action) => {
      //debugger;
      state[action.payload.id].quan++;
      return state;
    },
  },
  initialState
);

export default module1;
