import Game from "./game";

export default class App {
  static init() {
    this.game = new Game();
    this.game.init();
  }
}
