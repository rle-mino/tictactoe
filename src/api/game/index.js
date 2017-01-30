/* eslint-disable no-underscore-dangle */
import EventEmitter from 'events';
import R from 'ramda';
import loginfo from '../util';

export const READY = 'ready';
export const WAITING = 'waiting';

class ErrorNameAlreadyTaken extends Error {
  constructor(name) {
    super();
    this.toString = () => `${name} already taken`;
  }
}

class ErrorSpectator extends Error {
  constructor() {
    super();
    this.toString = () => 'this user is a spectator';
  }
}

export default class Game extends EventEmitter {
  constructor(id, player) {
    super();
    this.id = id;
    this.status = WAITING;
    this.players = {
      [player.username]: player,
    };
    this.board = R.times(() => null, 9);
  }

  addPlayer = (newPlayer) => {
    const { username } = newPlayer;
    const nameAlreadyTaken = !!this.players[username];
    if (nameAlreadyTaken) { throw new ErrorNameAlreadyTaken(username); }
    this.players = { ...this.players, [username]: newPlayer };
    this.emit('joined');
  }

  removePlayer = (playerToRemove) => {
    this.players = R.omit([playerToRemove.username], this.players);
    this.status = WAITING;
    this.emit('leaved');
    return R.isEmpty(this.players);
  }

  getOtherPlayer = (playerA) => {
    const hisUsername = Object.keys(this.players)
      .find(playerB => playerB !== playerA.username);
    return this.players[hisUsername] || null;
  }

  getPlayers = () => R.pickBy(val => val.isSpectator === false, this.players);

  areBothReady = () => R.values(R.pickBy(val => !!val.isReady, this.players)).length === 2;

  startGame = () => {
    this.emit('start');
    this.status = READY;
    const players = R.values(this.players);
    const firstToPlay = players[Math.round((Math.random()))];
    this.emit('your turn', firstToPlay.username);
  }

  setAsReady = (player) => {
    if (this.status === READY) return;
    const confirmedPlayer = this.players[player.username];
    if (confirmedPlayer.isSpectator) {
      throw new ErrorSpectator();
    } else {
      confirmedPlayer.isReady = true;
      if (this.areBothReady()) {
        this.startGame();
      }
    }
  }

  isGameFull = () => this.players.length === 2
}
