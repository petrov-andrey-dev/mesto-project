//-------------------------->      ООП Popup       <------------------------------------
export default class Popup {
    // Принимает в конструктор единственный параметр — селектор попапа
    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector);
    }
    open() {
        this.popup.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
    }
    close() {
        this.popup.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }
    //   закрытие попапа клавишей Esc
    _handleEscClose=(evt) =>{
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this.popup.addEventListener("mousedown", () => this._handlePopupClose());
    }
    _handlePopupClose=()=> {
        this.popup.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup_opened")||(evt.target.classList.contains('popup__close')) ) {
              this.close();
            }
        })
}
}