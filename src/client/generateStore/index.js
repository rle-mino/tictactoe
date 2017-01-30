import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import io from 'socket.io-client';
import apiURI from '../apiURI';
import socketMiddleware from '../socketMiddleware';
import reducers from '../reducers';
import initialState from '../initialState';
import { GAME_JOIN, GAME_READY } from '../actions/server';

const logger = createLogger();

const socket = io(apiURI);

const generateStore = (mode) => {
  if (mode && mode.includes('production')) {
    return createStore(
      reducers,
      initialState,
      applyMiddleware(
        socketMiddleware(socket),
        thunkMiddleware,
      )
    );
  }
  return createStore(
    reducers,
    initialState,
    applyMiddleware(
      logger,
      thunkMiddleware,
      socketMiddleware(socket),
    ),
  );
};

const store = generateStore(process.env.NODE_ENV);

if (window.location.hash) {
  // eslint-disable-next-line no-unused-vars
  const [_, id, player] = window.location.hash.match(/^#(\w*)\[(\w*)]/);
  store.dispatch({ type: GAME_JOIN, payload: { id, player } });
  socket.on('reconnect', () => {
    store.dispatch({ type: GAME_JOIN, payload: { id, player } });
  });
  socket.on('game:joined', () => store.dispatch({ type: GAME_READY }));
}

export default store;
