import chai from 'chai';
import Game from '../';
import Player from '../../player';

const { describe, it } = global;
const { expect } = chai;

describe('class Game', () => {
  it('should create a game with the given id', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    expect(game.id).to.equal('42');
  });

  it('should create a game with the given player', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    expect(game.players).to.deep.equal({
      usernameTest: {
        username: 'usernameTest',
        isSpectator: false,
        isReady: false,
      },
    });
  });

  it('should add another player', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    expect(game.players).to.deep.equal({
      usernameTest: {
        username: 'usernameTest',
        isSpectator: false,
        isReady: false,
      },
      usernameTest2: {
        username: 'usernameTest2',
        isSpectator: false,
        isReady: false,
      },
    });
  });

  it('should give the other player', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    const otherPlayer = game.getOtherPlayer(newPlayer);
    expect(otherPlayer).to.deep.equal({
      username: 'usernameTest2',
      isSpectator: false,
      isReady: false,
    });
  });

  it('should give all the players', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    const players = game.getPlayers();
    expect(players).to.deep.equal({
      usernameTest: { username: 'usernameTest', isSpectator: false, isReady: false },
      usernameTest2: { username: 'usernameTest2', isSpectator: false, isReady: false },
    });
  });

  it('should know if both players are ready', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    const ready = game.areBothReady();
    expect(ready).to.equal(false);
    newPlayer2.isReady = true;
    const ready2 = game.areBothReady();
    expect(ready2).to.equal(false);
    newPlayer.isReady = true;
    const ready3 = game.areBothReady();
    expect(ready3).to.equal(true);
  });

  it('should remove a player', () => {
    const newPlayer = new Player('usernameTest');
    const game = new Game('42', newPlayer);
    const newPlayer2 = new Player('usernameTest2');
    game.addPlayer(newPlayer2);
    game.removePlayer(newPlayer2);
    expect(game.players).to.deep.equal({
      usernameTest: { username: 'usernameTest', isSpectator: false, isReady: false },
    });
    const empty = game.removePlayer(newPlayer);
    expect(empty).to.equal(true);
  });
});
