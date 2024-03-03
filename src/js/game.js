import Field from './field';
import Cursor from './cursor';
import Monster from './monster';
import Score from './score';
import Popup from './popup';

export default class Game {
  init() {
    this.score = new Score();
    this.field = new Field(document.querySelector('.field'));
    this.popup = new Popup();
    Cursor.init();
    this.registerEvents();
    this.playGame();
  }

  registerEvents() {
    this.field.clickHole((isCurrent) => {
      if (isCurrent) {
        this.score.increaseHit();
        Monster.hitMonster(this.currentField);
        this.field.removeClick();
      }
    });

    this.popup.btnClick((e) => {
      e.preventDefault();
      this.popup.hidePopup();
      this.playGame();
    });
  }

  playGame() {
    this.score.init();
    setTimeout(function run() {
      if (this.currentField && Monster.findMonster(this.currentField)) {
        this.score.increaseMiss();
      }
      if (this.score.getMiss() === 5) {
        this.endGame();
      }
      if (this.score.getMiss() !== 5) {
        this.field.clearHoles();
        this.currentField = this.field.getHole();
        Monster.showMonster(this.currentField);
        setTimeout(run.bind(this), 1250);
      }
    }.bind(this), 1250);
  }

  endGame() {
    this.popup.showPopup();
    this.field.clearHoles();
  }
}
