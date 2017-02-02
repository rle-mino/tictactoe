import {
  SOCKET_PUT_PIECE,
  SOCKET_REPLAY,
} from '../../constants/socket';

export const putPiece = coord => ({
  type: SOCKET_PUT_PIECE,
  payload: coord,
});

export const replay = () => ({
  type: SOCKET_REPLAY,
});
