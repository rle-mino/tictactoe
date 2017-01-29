import * as checkers from '../helpers/game/checkers';
import initialState from '../initialState';
import { PUT_PIECE, RESET_MAP } from '../actions/game';
import { GAME_JOINED, GAME_LEAVED } from '../actions/server';

const putPiece = (state, where) => {
  if (state.winner) return state;
  const newBoard = state.board.map((cell, index) => {
    if (index === where && !cell) {
      return state.player.playing;
    } else if (index === where) {
      return -1;
    }
    return cell;
  });

  const shouldUpdate = !newBoard.find(cell => cell === -1);
  if (!shouldUpdate) return state;

  const thereIsAWinner = checkers.win(newBoard);
  const isFinished = checkers.full(newBoard);
  const winner = thereIsAWinner ? thereIsAWinner(newBoard) : null;

  const { playing, player1, player2 } = state.player;

  return {
    ...state,
    winner,
    isFinished,
    board: newBoard,
    player: {
      ...state.player,
      playing: playing.name === player1.name ? player2 : player1,
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
      name: him ? him.username : null,
    },
  },
});

const removePlayer = state => ({
  ...state,
  player: {
    ...state.player,
    me: { ...state.player.me },
    him: { name: 'NO PLAYER' },
  },
});

export default (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case GAME_JOINED:
      return addPlayer(state, payload.me, payload.him);
    case GAME_LEAVED:
      return removePlayer(state);
    case PUT_PIECE:
      return putPiece(state, payload);
    case RESET_MAP:
      return initialState.game;
    default: return state;
  }
};
