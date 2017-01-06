import * as patterns from './patterns';

const checkWin = (map) => {
  let toFind;

  toFind = patterns.line(map, 0);
  if (toFind) return toFind;
  toFind = patterns.line(map, 3);
  if (toFind) return toFind;
  toFind = patterns.line(map, 6);
  if (toFind) return toFind;

  toFind = patterns.column(map, 0);
  if (toFind) return toFind;
  toFind = patterns.column(map, 1);
  if (toFind) return toFind;
  toFind = patterns.column(map, 2);
  if (toFind) return toFind;


  toFind = patterns.checkCrookedUpwards(map);
  if (toFind) return toFind;

  toFind = patterns.checkCrookedDownwards(map);
  return toFind;
};

const checkFull = map => map.indexOf(null) === -1;

const putPiece = (state, where) => {
  if (state.win) return state;
  const newMap = state.map.map((cell, index) => {
    if (index === where && !cell) {
      return state.player.playing;
    } else if (index === where) {
      return -1;
    }
    return cell;
  });

  const shouldNotUpdate = !!newMap.find(cell => cell === -1);
  if (shouldNotUpdate) return state;

  const win = checkWin(newMap);
  const full = checkFull(newMap);

  return {
    ...state,
    win,
    full,
    map: newMap,
    player: {
      playing: state.player.playing === 1 ? 2 : 1,
    },
  };
};

export const dispatchPutPiece = payload => (dispatch) => {
  dispatch({ type: 'PUT_PIECE', payload });
};

export default (state = {}, action) => {
  switch (action.type) {
    case 'PUT_PIECE':
      return putPiece(state, action.payload);
    default: return state;
  }
};
