import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';
import App from './components/App';
import reducers from './modules';
import initialState from './initialState';

console.log('mounting react app ...');  // eslint-disable-line no-console

const socket = io('http://localhost:8080');
const socketIOMiddleware = createSocketIoMiddleware(socket, 'server/');

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(
    thunkMiddleware,
    socketIOMiddleware,
  ),
);

store.dispatch({
  type: 'server/CREATE_OR_JOIN_ROOM',
  payload: '42',
});

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
);

render(Root, document.getElementById('__TTT__'));
