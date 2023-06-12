// ----> ООП создание поста<-----------------------------------------------------------
export default class Card {
    constructor(data, userId, handleLike, handleImageOpen, handleTrash, selector) {
        this.link = data.link;
        this.name = data.name;
        this.likes = data.likes;
        this._owner = data.owner;
        this._userId = userId;
        this.id = data._id;
        this._handleLike = handleLike;
        this._handleOpen = handleImageOpen;
        this._handleTrash = handleTrash;
        this._selector = selector;
    }
    // копирование темплейта поста
    _getElement() {
        const cardElement = document
            .querySelector(this._selector)
            .content.querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }
    // установка слушателей на элементы поста
    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => this._handleTrash(this));
        this._likeButton.addEventListener('click', () => this._handleLike(this));
        this._cadrImgBtn.addEventListener('click', () => this._handleOpen(this));
    }
    // отрисовка кол-ва лайков+
    renderLikeCounter() {
        this._likeCounter.textContent = this.likes.length;
    }
    // проверка лайка текущего пользователя+
    checkCurrentUserLike() {
        return this.likes.some(like => {
            return like._id === this._userId;
        })
    }
    // переключение стиля лайка+
    toggleLike() {
        this._likeButton.classList.toggle("card__like_liked");
    }

    deleteCard() {
        this._element.remove();
    }
    // возврат готового элемента карточки
    generateCard() {
        this._element = this._getElement();
        this._likeCounter = this._element.querySelector('.card__like-counter')
        this._img = this._element.querySelector(".card__img");
        this._imgName = this._element.querySelector(".card__title");
        this._likeButton = this._element.querySelector(".card__like");
        this._deleteButton = this._element.querySelector(".card__trash");
        this._cadrImgBtn = this._element.querySelector(".card__open-img");

        this._imgName.textContent = this.name;
        this._img.alt = this.name;
        this._img.src = this.link;

        this._element.setAttribute('data-id', `${this.id}`);
        this._setEventListeners();
        this.renderLikeCounter();

        if (this.checkCurrentUserLike()) this.toggleLike();
        if (this._owner._id !== this._userId) this._deleteButton.remove();

        return this._element;
    }
};




