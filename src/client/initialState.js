import R from 'ramda';

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
    board: R.times(() => null, 9),
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
