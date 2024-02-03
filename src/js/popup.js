export default class Popup {
  constructor() {
    this.popup = document.querySelector(".popup");
    this.btn = this.popup.querySelector(".btn");
  }
  showPopup() {
    this.popup.classList.add("active");
  }

  hidePopup() {
    this.popup.classList.remove("active");
  }

  btnClick(callback) {
    this.btn.addEventListener("click", callback);
  }
}
