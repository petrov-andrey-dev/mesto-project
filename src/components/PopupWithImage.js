import Popup from "./Popup";

//Попап с картинкой
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImg = this.popup.querySelector(".popup__big-image");
        this._popupViewTitle = this.popup.querySelector(".popup__figcaption");
    }

    //открытие попапа c изображением
    open(data) {
        this._popupImg.src = data.link;
        this._popupImg.alt = data.name;
        this._popupViewTitle.textContent = data.name;
        super.open();
    }
}

