import Game from '../../game';
import Player from '../../player';

function leaveGame(socketID) {
  const playerGame = this.games.find(
    game => game.players.find(
      player => player.id === socketID
    )
  );
  if (playerGame) {
    playerGame.removePlayer(socketID);
    return Promise.resolve({
      details: 'player removed',
    });
  }
  return Promise.reject({
    details: 'user has no game',
  });
}

function joinGame({ id, player }, playerId) {
  const askedGame = this.games.find(game => game.id === id);

  if (askedGame) {
    const isGameFull = askedGame.players.length === 2;

    if (isGameFull) {
      return Promise.reject({
        status: 'error',
        details: 'the game is full',
      });
    }
    const isAdded = askedGame.addPlayer(new Player(player, playerId));

    if (isAdded === true) {
      return Promise.resolve({
        board: askedGame.board,
        players: askedGame.players,
      });
    }
    return Promise.reject({
      details: 'username already taken',
    });
  }
  const newGame = new Game(id, new Player(player, playerId));
  this.games = [...this.games, newGame];
  return Promise.resolve({
    board: newGame.board,
    players: newGame.players,
  });
}

export default {
  joinGame,
  leaveGame,
};
