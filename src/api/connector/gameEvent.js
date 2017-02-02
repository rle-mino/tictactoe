import {
  SOCKET_START,
  SOCKET_LEFT,
  SOCKET_PIECE_SET,
  SOCKET_JOINED,
  SOCKET_YOUR_TURN,
  SOCKET_HIS_TURN,
  SOCKET_OTHER_READY,
  SOCKET_END,
} from '../../constants/socket';

const start = socket => () => socket.emit(SOCKET_START);
const left = socket => () => socket.emit(SOCKET_LEFT);
const pieceSet = socket => index => socket.emit(SOCKET_PIECE_SET, index);

const joined = (socket, game, player) => () => {
  const data = {
    id: game.id,
    me: player,
    him: game.getOtherPlayer(player),
  };
  socket.emit(SOCKET_JOINED, data);
};

const yourTurn = socket => (username) => {
  if (socket.player.username !== username) {
    socket.emit(SOCKET_HIS_TURN);
  } else {
    socket.emit(SOCKET_YOUR_TURN);
  }
};

const otherReady = socket => (username) => {
  if (socket.player.username !== username) {
    socket.emit(SOCKET_OTHER_READY, { message: 'the other player is ready' });
  }
};

const end = socket => data => socket.emit(SOCKET_END, data);

export default {
  start,
  left,
  joined,
  yourTurn,
  pieceSet,
  end,
  otherReady,
};
