/* eslint-disable no-plusplus */
export default class Score {
  constructor() {
    this.hitElement = document.querySelector('.hit');
    this.missElement = document.querySelector('.miss');
  }

  init() {
    this.missElement.innerHTML = 0;
    this.missScore = +this.missElement.innerHTML;
    this.hitElement.innerHTML = 0;
    this.hitScore = +this.hitElement.innerHTML;
  }

  increaseHit() {
    this.hitScore++;
    this.hitElement.innerHTML = this.hitScore;
  }

  increaseMiss() {
    this.missScore++;
    this.missElement.innerHTML = this.missScore;
  }

  getMiss() {
    return this.missScore;
  }
}
