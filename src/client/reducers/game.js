// import * as checkers from '../helpers/game/checkers';
import R from 'ramda';
import {
  GAME_JOINED,
  GAME_LEAVED,
  GAME_YOUR_TURN,
  GAME_HIS_TURN,
  GAME_PIECE_SET,
  GAME_END,
  GAME_START,
} from '../actions/server';

const putPiece = (state, where) => {
  if (state.winner) return state;
  if (state.board[where]) return state;
  const newBoard = state.board.map((cell, index) => {
    if (index === where && !cell) {
      return state.player.playing;
    }
    return cell;
  });
  const { playing, me, him } = state.player;

  return {
    ...state,
    board: newBoard,
    player: {
      ...state.player,
      playing: playing.name === me.name ? him : me,
    },
  };
};

const addPlayer = (state, me, him) => ({
  ...state,
  player: {
    ...state.player,
    me: {
      ...state.player.me,
      name: me.username,
    },
    him: {
      ...state.player.him,
      name: him ? him.username : 'NO PLAYER',
    },
  },
});

const removePlayer = state => ({
  ...state,
  player: {
    ...state.player,
    him: { name: 'NO PLAYER' },
  },
});

const myTurn = state => ({
  ...state,
  player: {
    ...state.player,
    playing: { ...state.player.me },
  },
});

const hisTurn = state => ({
  ...state,
  player: {
    ...state.player,
    playing: { ...state.player.him },
  },
});

const gameEnd = (state, payload) => ({
  ...state,
  winner: payload.winner ? { name: payload.winner.username } : null,
  isFinished: !payload.winner,
});

export default (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case GAME_START:
      return { ...state, board: R.times(() => null, 9), winner: null, isFinished: null };
    case GAME_JOINED:
      return addPlayer(state, payload.me, payload.him);
    case GAME_LEAVED:
      return removePlayer(state);
    case GAME_YOUR_TURN:
      return myTurn(state);
    case GAME_HIS_TURN:
      return hisTurn(state);
    case GAME_PIECE_SET:
      return putPiece(state, payload);
    case GAME_END:
      return gameEnd(state, payload);
    default: return state;
  }
};
