import game from './game';

function services() {
  const app = this;

  app.configure(game);
}

export default services;
