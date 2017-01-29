const size = 9;

const player1 = {
  name: 'player1',
};

const player2 = {
  name: 'NO PLAYER',
};

const initialState = {
  game: {
    size,
    board: new Array(size).fill(null),
    player: {
      playing: player1,
      me: player1,
      him: player2,
    },
    winner: null,
    isFinished: false,
  },
};

export default initialState;
