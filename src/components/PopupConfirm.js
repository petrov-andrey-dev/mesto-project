import Popup from "./Popup";

//Попап подтверждения действя
export default class PopupConfirm extends Popup {
    constructor(popupSelector, submitDeletePost) {
        super(popupSelector);
        this._submitDeletePost = submitDeletePost;
        this._button = this.popup.querySelector('.popup__submit');
    }

    getPost(post) {
        this.post = post;
    }
    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener('submit', (evt) => this._submitDeletePost(this.post, evt))
    }
}