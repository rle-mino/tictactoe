const start = socket => () => socket.emit('game:start');
const leaved = socket => () => socket.emit('game:leaved');
const joined = (socket, game, player) => () => {
  const data = {
    id: game.id,
    me: player,
    him: game.getOtherPlayer(player),
  };
  socket.emit('game:joined', data);
};

export default {
  start,
  leaved,
  joined,
};
