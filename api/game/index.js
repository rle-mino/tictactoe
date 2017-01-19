export default class Game {
  constructor(id, player) {
    this.id = id;
    this.status = 'waiting for player';
    this.players = [player];
    this.board = new Array(9).fill(null);
  }

  addPlayer(newPlayer) {
    const nameAlreadyTaken = this.players.find(
      player => player.username === newPlayer.username
    );
    if (nameAlreadyTaken) return false;
    this.players = [...this.players, newPlayer];
    this.status = 'game ready';
    return true;
  }

  removePlayer(id) {
    this.players = this.players.filter(
      player => player.id !== id
    );
    this.status = 'waiting for player';
  }
}
