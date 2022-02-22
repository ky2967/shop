import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'; // 라우팅을 리액트가 아닌 서버에게 요청할 수 있으므로 위험.
//import {HashRouter} from 'react-router-dom';  // 안전한 라우팅을 할 수 있게 함. #뒤에 적혀있는 건 서버로 전송안함.
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootRecuder from './reducer/rootRecuder';

// combineReducer : reducer를 여러개 묶어서 store에 저장
let store = createStore(rootRecuder);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
