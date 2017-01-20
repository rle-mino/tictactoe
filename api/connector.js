/* eslint-disable no-param-reassign */
const setupSocket = (socket, game, player) => {
  socket.game = game;
  socket.player = player;
  game.on('start', (data) => {
    console.log('ok');
    socket.emit('game:start', data);
  });
};

const responseJoin = (socket, cb) => ({ game, player }) => {
  if (cb) {
    cb({
      status: 'success',
      me: player,
      him: game.getOtherPlayer(player.username),
    });
  }
  setupSocket(socket, game, player);
};

const connector = (io, organizer) => {
  io.on('connection', (socket) => {
    socket.on('game:join', (data, cb) => {
      organizer.joinGame(data)
        .then(responseJoin(socket, cb))
        .catch(console.error);
    });

    socket.on('disconnect', () => {
      organizer.leaveGame(socket.game, socket.player)
        .then(console.log)
        .catch(console.error);
    });
  });
};

export default connector;
