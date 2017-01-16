class Game {
  find(params) {
    return Promise.resolve({
      method: 'find',
      params,
    });
  }

  get(id, params) {
    return Promise.resolve({
      method: 'get',
    });
  }

  create(data, params) {
    return Promise.resolve({
      method: 'create',
      data,
      params,
    });
  }

  update(id, data, params) {
    return Promise.resolve({
      method: 'update',
      id,
      data,
      params,
    });
  }

  patch(id, data, params) {
    return Promise.resolve({
      method: 'patch',
      id,
      data,
      params,
    });
  }

  remove(id, params) {
    return Promise.resolve({
      method: 'remove',
      id,
      params,
    });
  }

  setup(app, path) {
  }
}

function game() {
  const app = this;

  app.use('/game', new Game());
}

export default game;
