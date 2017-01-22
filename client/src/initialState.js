import io from 'socket.io-client';
import apiURI from './apiURI';

const size = 9;

const player1 = {
  name: 'player1',
};

const player2 = {
  name: 'player2',
};

// const socket = io(apiURI);

// if (window.location.hash) {
//   // eslint-disable-next-line no-unused-vars
//   const [_, id, player] = window.location.hash.match(/^#(\w*)\[(\w*)]/);
//   socket.emit('game:join', { id, player }, (data) => {
//     console.log(data);
//   });
//   socket.on('game:start', () => console.log('game:start'));
//   socket.on('game:error', details => console.error(details));
// }


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
  // socket,
};

export default initialState;
