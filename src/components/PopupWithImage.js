import Popup from "./modal";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImg = this._popup.querySelector(".popup__big-image");
        this._popupViewTitle = this._popup.querySelector(".popup__figcaption");
    }

    //открытие попапа c изображением
    open(name, link) {
        this._popupImg.src = link;
        this._popupImg.alt = name;
        this._popupViewTitle.textContent = name;
        super.open();
    }
}

