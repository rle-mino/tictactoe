import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reducers from '../reducers';
import initialState from '../initialState';

if (process.env.NODE_ENV === 'production') {
  module.exports = createStore(
    reducers,
    initialState,
  );
} else {
  const logger = createLogger();
  module.exports = createStore(
    reducers,
    initialState,
    applyMiddleware(
      logger,
    ),
  );
}
