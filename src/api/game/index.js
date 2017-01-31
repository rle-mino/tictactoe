/* eslint-disable no-underscore-dangle */
import EventEmitter from 'events';
import R from 'ramda';
import patterns from './patterns';
import { loginfo } from '../util';

export const READY = 'ready';
export const WAITING = 'waiting';

class ErrorNotYourTurn extends Error {
  constructor() {
    super();
    this.toString = () => 'Not your turn';
  }
}

class ErrorCellUnavailable extends Error {
  constructor() {
    super();
    this.toString = () => 'Cell not avaible';
  }
}

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
    this.playing = {};
  }

  getPlayers = () => R.pickBy(val => val.isSpectator === false, this.players);
  areBothReady = () => R.values(R.pickBy(val => !!val.isReady, this.players)).length === 2;
  isGameFull = () => this.players.length === 2
  findWinner = () => patterns.find(pattern => pattern(this.board));
  checkFull = () => this.board.indexOf(null) === -1;

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
    const players = this.getPlayers();
    return R.values(players).find(playerB => !R.equals(playerB, playerA)) || null;
  }

  startGame = () => {
    this.emit('start');
    this.status = READY;
    const players = R.values(this.players);
    this.playing = players[Math.round((Math.random()))];
    this.emit('your turn', this.playing.username);
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

  putPiece = (player, index) => {
    if (this.status === WAITING) return;
    if (this.board[index]) {
      throw new ErrorCellUnavailable();
    }
    if (this.playing.username !== player.username) {
      throw new ErrorNotYourTurn();
    }
    this.board = this.board.map((cell, i) => {
      if (i === index && !cell) return player;
      return cell;
    });
    this.emit('piece set', index);
    this.playing = this.getOtherPlayer(player);

    const isThereAWinner = this.findWinner();
    if (isThereAWinner) {
      this.winner = isThereAWinner(this.board);
      this.emit('end', {
        winner: this.winner,
        message: 'we have a winner',
      });
      this.status = WAITING;
      return;
    }

    this.full = this.checkFull();
    if (this.full) {
      this.emit('end', {
        winner: null,
        message: 'game is full',
      });
      this.status = WAITING;
    }
  }
}
