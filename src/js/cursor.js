export default class Cursor {
  static init() {
    this.cursor = document.querySelector('.cursor');

    window.addEventListener('mousemove', (e) => {
      this.cursor.style.top = `${e.pageY} 'px'`;
      this.cursor.style.left = `${e.pageX} 'px'`;
    });

    window.addEventListener('mousedown', () => {
      this.cursor.classList.add('active');
    });

    window.addEventListener('mouseup', () => {
      this.cursor.classList.remove('active');
    });
  }
}
