/* eslint-disable no-underscore-dangle */
import EventEmitter from 'events';
import R from 'ramda';

export const READY = 'ready';
export const WAITING = 'waiting';

export default class Game extends EventEmitter {
  constructor(id, player) {
    super();
    this.id = id;
    this.status = WAITING;
    this.players = {
      [player.username]: player,
    };
    this.board = new Array(9).fill(null);
  }

  addPlayer(newPlayer) {
    const nameAlreadyTaken = !!this.players[newPlayer.username];
    if (nameAlreadyTaken) return false;
    this.players = { ...this.players, [newPlayer.username]: newPlayer };
    return true;
  }

  removePlayer(playerToRemove) {
    this.players = R.omit(playerToRemove.username, this.players);
    this.status = WAITING;
    return R.isEmpty(this.players);
  }

  getOtherPlayer(username) {
    const hisUsername = Object.keys(this.players)
      .find(player => player !== username);
    if (hisUsername) {
      return this.players[hisUsername];
    }
    return null;
  }
}
