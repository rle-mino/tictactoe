import io from 'socket.io-client';
import apiURI from './apiURI';

const size = 9;

const player1 = {
  name: 'player1',
};

const player2 = {
  name: 'player2',
};

const socket = io(apiURI);
socket.emit('game::create', {
  username: 'raph',
}, (err, message) => console.log(err || message));

const initialState = {
  game: {
    size,
    board: new Array(size).fill(null),
    player: {
      playing: player1,
      player1,
      player2,
    },
    winner: null,
    isFinished: false,
  },
  socket,
};

export default initialState;
