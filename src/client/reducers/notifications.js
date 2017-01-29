/* eslint-disable no-return-assign */
import { REMOVE_NOTIF } from '../actions/notifications';
import { GAME_JOINED, GAME_LEAVED, GAME_READY } from '../actions/server';

let id = 0;

export default (state = [], action) => {
  switch (action.type) {
    case GAME_JOINED:
      return [...state, { text: 'game joined', id: id += 1 }];
    case GAME_LEAVED:
      return [...state, { text: 'The other player left', id: id += 1 }];
    case GAME_READY:
      return [...state, { text: 'The game is now ready', id: id += 1 }];
    case REMOVE_NOTIF:
      return state.filter(el => el.id !== action.payload);
    default:
      return state;
  }
};
