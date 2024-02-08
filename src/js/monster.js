/* eslint-disable no-param-reassign */
export default class Monster {
  static showMonster(element) {
    element.innerHTML = '<div class="goblin show"></div>';
  }

  static hitMonster(element) {
    element.innerHTML = '<div class="goblin goblin-hit"></div>';
  }
}
