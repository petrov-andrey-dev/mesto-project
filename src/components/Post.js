import {
    userId,
} from "../index.js";
import {
    bigImage,
    figcaption
} from '../utils/constants.js'

// ----> ООП создание поста<-----------------------------------------------------------
export default class Post {
    constructor({ data, handleLike, handleImageOpen, handleTrash }, selector) {
        this.link = data.link;
        this.name = data.name;
        this.likes = data.likes;
        this._owner = data.owner;
        this.id = data._id;
        this._handleLike = handleLike;
        this._handleOpen = handleImageOpen;
        this._handleTrash = handleTrash;
        this._selector = selector;
    }
    // копирование темплейта поста
    _getElement() {
        const postElement = document
            .querySelector(this._selector)
            .content.querySelector(".post")
            .cloneNode(true);
        return postElement;
    }
    // установка слушателей на элементы поста
    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => this._handleTrash(this));
        this._likeButton.addEventListener('click', () => this._handleLike(this));
        this._postImgBtn.addEventListener('click', () => this._handleOpen(this));
    }
    // отрисовка кол-ва лайков+
    renderLikeCounter() {
        this._element.querySelector('.post__like-counter').textContent = this.likes.length;
    }
    // проверка лайка текущего пользователя+
    checkCurrentUserLike() {
        return this.likes.some(like => {
            return like._id === userId;
        })
    }
    // переключение стиля лайка+
    toggleLike() {
        this._likeButton.classList.toggle("post__like_liked");
    }
    
    _openImage() {
        bigImage.src = this._img.src;
        bigImage.alt = this._imgName.textContent;
        figcaption.textContent = this._imgName.textContent;
    }

    deletePost() {
        this._element.remove();
    }
    // возврат готового элемента карточки
    generateCard() {
        this._element = this._getElement();
        this._img = this._element.querySelector(".post__img");
        this._imgName = this._element.querySelector(".post__title");
        this._likeButton = this._element.querySelector(".post__like");
        this._deleteButton = this._element.querySelector(".post__trash");
        this._postImgBtn = this._element.querySelector(".post__open-img");

        this._imgName.textContent = this.name;
        this._img.alt = this.name;
        this._img.src = this.link;

        this._element.setAttribute('data-id', `${this.id}`);
        this._setEventListeners();
        this.renderLikeCounter();

        if (this.checkCurrentUserLike()) this.toggleLike();
        if (this._owner._id !== userId) this._deleteButton.remove();

        return this._element;
    }
};




