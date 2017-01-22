/* eslint-disable no-param-reassign */
const setupSocket = (socket, game, player, onSubscribe) => {
  socket.game = game;
  socket.player = player;
  game.on('start', (data) => {
    socket.emit('game:start', data);
  });
  if (onSubscribe) onSubscribe();
};

const successJoin = (socket, cb) => ({ game, player, onSubscribe }) => {
  if (cb) {
    cb({
      status: 'success',
      me: player,
      him: game.getOtherPlayer(player.username),
    });
  }
  setupSocket(socket, game, player, onSubscribe);
};

const failJoin = socket => ({ details }) => {
  socket.emit('game:error', details);
};

const connector = (io, organizer) => {
  io.on('connection', (socket) => {
    socket.on('game:join', (data, cb) => {
      organizer.joinGame(data)
        .then(successJoin(socket, cb))
        .catch(failJoin(socket));
    });

    socket.on('disconnect', () => {
      organizer.leaveGame(socket.game, socket.player)
        .then(console.log)
        .catch(console.error);
    });
  });
};

export default connector;
