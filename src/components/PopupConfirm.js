import Popup from "./modal";

export default class PopupConfirm extends Popup {
    constructor(popupSelector, submitDeletePost) {
        super(popupSelector);
        this._submitDeletePost = submitDeletePost;
        this._button = this._popup.querySelector('.popup__submit');
    }

    getPost(post) {
        this.post = post;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => this._submitDeletePost(this.post, evt))
    }
}