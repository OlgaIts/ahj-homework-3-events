export default class Field {
  constructor(element, holeCount) {
    if (!element) {
      throw new Error('не передан элемент Field');
    }
    this.element = element;
    this.generateHoles(holeCount !== undefined ? holeCount : 16);
    this.currentElement = null;
    this.currentHoleIndex = null;
  }

  clickHole(callback) {
    this.clickEvent = (e) => {
      const isCurrent = e.target.closest('.hole') === this.currentElement;
      if (callback !== undefined) {
        callback(isCurrent);
      }
    };
  }

  generateHoles(holeCount) {
    this.holes = [];
    for (let i = 0; i < holeCount; i += 1) {
      const hole = document.createElement('div');
      hole.classList.add('hole');
      this.holes.push(hole);
      this.element.appendChild(hole);
    }
  }

  // eslint-disable-next-line consistent-return
  getHole() {
    this.element.addEventListener('click', this.clickEvent);
    if (this.holes.length > 0) {
      const i = Math.floor(Math.random() * this.holes.length);
      if (this.currentHoleIndex === i) {
        return this.getHole();
      }
      this.currentHoleIndex = i;
      this.currentElement = this.holes[i];
      return this.currentElement;
    }
  }

  clearHoles() {
    this.holes.forEach((hole) => {
      // eslint-disable-next-line no-param-reassign
      hole.innerHTML = '';
    });
  }

  removeClick() {
    this.element.removeEventListener('click', this.clickEvent);
  }
}
