import * as checkers from '../helpers/game/checkers';
import initialState from '../initialState';
import { PUT_PIECE, RESET_MAP } from '../actions/game';
import {
  GAME_JOINED,
  GAME_LEAVED,
  GAME_YOUR_TURN,
  GAME_HIS_TURN,
} from '../actions/server';

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

export default (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case GAME_JOINED:
      return addPlayer(state, payload.me, payload.him);
    case GAME_LEAVED:
      return removePlayer(state);
    case GAME_YOUR_TURN:
      return myTurn(state);
    case GAME_HIS_TURN:
      return hisTurn(state);
    case PUT_PIECE:
      return putPiece(state, payload);
    case RESET_MAP:
      return initialState.game;
    default: return state;
  }
};
