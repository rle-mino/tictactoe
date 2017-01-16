import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducers from '../reducers';
import initialState from '../initialState';

const logger = createLogger();

const generateStore = (mode) => {
  if (mode && mode.includes('production')) {
    return createStore(
      reducers,
      initialState,
    );
  }
  return createStore(
    reducers,
    initialState,
    applyMiddleware(
      logger,
    ),
  );
};

const store = generateStore(process.env.NODE_ENV);

export default store;
