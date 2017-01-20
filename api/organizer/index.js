import Game from '../game';
import Player from '../player';

class Organizer {
  games = [];

  leaveGame = (game, player) => {
    if (game) {
      const isEmpty = game.removePlayer(player);
      if (isEmpty) {
        this.games = this.games.filter(party => party.id !== game.id);
      }
      return Promise.resolve({
        details: 'player removed',
      });
    }
    return Promise.reject({
      details: 'user has no game',
    });
  }

  joinGame = ({ id, player }) => {
    const askedGame = this.games.find(game => game.id === id);

    if (askedGame) {
      const isGameFull = askedGame.players.length === 2;

      if (isGameFull) {
        return Promise.reject({
          details: 'the game is full',
        });
      }
      const newPlayer = new Player(player);
      const isAdded = askedGame.addPlayer(newPlayer);

      if (isAdded === true) {
        return Promise.resolve({
          message: 'joined',
          game: askedGame,
          player: newPlayer,
        });
      }
      return Promise.reject({
        details: 'username already taken',
      });
    }
    const newPlayer = new Player(player);
    const newGame = new Game(id, newPlayer);
    this.games = [...this.games, newGame];
    return Promise.resolve({
      message: 'joined',
      game: newGame,
      player: newPlayer,
    });
  }
}

const createOrganizer = () => new Organizer();

export default createOrganizer;
