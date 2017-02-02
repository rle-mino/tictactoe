import chai from 'chai';
import R from 'ramda';
import game from '../game';
import { SOCKET_PIECE_SET } from '../../../constants/socket';

const { describe, it } = global;
const { expect } = chai;

const player1 = {
  name: 'player1',
};

const player2 = {
  name: 'player2',
};

const initialGameState = {
  size: 9,
  board: R.times(() => null, 9),
  player: {
    playing: player1,
    me: player1,
    him: player2,
  },
  winner: null,
  isFinished: false,
};

describe('[UT] game reducer', () => {
  const firstStepState = game(initialGameState, { type: SOCKET_PIECE_SET, payload: 0 });
  it('should put a piece 1', () => {
    expect(firstStepState).to.deep.equal({
      size: 9,
      board: [
        player1,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      winner: null,
      isFinished: false,
      player: {
        playing: player2,
        me: player1,
        him: player2,
      },
    });
  });

  const secondStepTest = game(firstStepState, { type: SOCKET_PIECE_SET, payload: 1 });
  it('should put a piece 2', () => {
    expect(secondStepTest).to.deep.equal({
      size: 9,
      board: [
        player1,
        player2,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      winner: null,
      isFinished: false,
      player: {
        playing: player1,
        me: player1,
        him: player2,
      },
    });
  });
});
