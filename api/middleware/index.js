const handler = require('feathers-errors/handler');

function applyMiddleware() {
  const app = this;

  app.use(handler());
}

export default applyMiddleware;
