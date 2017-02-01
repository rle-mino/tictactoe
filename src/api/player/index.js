export default class Player {
  constructor(player) {
    this.username = player;
    this.isReady = false;
    this.isSpectator = false;
  }

  unsetReady = () => (this.isReady = false);

  setReady = () => (this.isReady = true);
}
