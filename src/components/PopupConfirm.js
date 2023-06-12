import Popup from "./Popup";

//Попап подтверждения действя
export default class PopupConfirm extends Popup {
    constructor(popupSelector, handleConfirm) {
        super(popupSelector);
        this._handleConfirm = handleConfirm;
        this._button = this.popup.querySelector('.popup__submit');
    }

    getCard(card) {
        this.card = card;
    }
    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener('submit', (evt) => this._handleConfirm(this.card, evt))
    }
}