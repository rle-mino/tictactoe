import {
  GAME_PUT_PIECE,
  GAME_REPLAY,
} from './server';

export const RESET_MAP = 'RESET_MAP';

export const putPiece = coord => ({
  type: GAME_PUT_PIECE,
  payload: coord,
});

export const replay = () => ({
  type: GAME_REPLAY,
});
