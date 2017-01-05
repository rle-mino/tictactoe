import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import reducers from './modules';

console.log('mounting react app ...');  // eslint-disable-line no-console

const initialState = {
  map: {
    1: 2,
    2: 1,
    3: 1,
    4: 1,
    5: 2,
    6: 1,
    7: 1,
    8: 2,
    9: 1,
  },
};

const store = createStore(reducers, initialState);

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(Root, document.getElementById('__TTT__'));
