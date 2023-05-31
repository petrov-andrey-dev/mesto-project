import { userId, handleLike, handleTrash } from "../index.js";
import { handleImageOpen } from "./modal.js";

const bigImage = document.querySelector('.popup__big-image');
const figcaption = document.querySelector('.popup__figcaption');
const postGrid = document.querySelector('.posts__grid');
const btnAddPost = document.querySelector('.profile__add-post');
const captionInput = document.querySelector('#caption');
const linkInput = document.querySelector('#link');

// создание поста
function createPost(link, name, likes, ownerId, postId) {
    const post = document.querySelector('#post').content;
    const postElement = post.querySelector('.post').cloneNode(true);
    const postImg = postElement.querySelector('.post__img');
    const postDeleteBtn = postElement.querySelector('.post__trash');
    const postLike = postElement.querySelector('.post__like');
    const postImgBtn = postElement.querySelector('.post__open-img');

    postImg.src = link;
    postImg.alt = name;
    postElement.querySelector('.post__title').textContent = name;
    postElement.setAttribute('data-id', `${postId}`);
    renderLikeCounter(postElement, likes)
    if (chekCurrenUserLike(likes)) toggleLike(postLike);
    if (ownerId !== userId) postDeleteBtn.remove();

    postDeleteBtn.addEventListener('click', handleTrash);
    postLike.addEventListener('click', evt => handleLike(evt));
    postImgBtn.addEventListener('click', evt => handleImageOpen(evt));

    return postElement;
};

class Post {
    constructor(data, selector) {
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._owner = data.owner;
        this._id = data._id;
        this._selector = selector;
    }
    _getElement() {
        const postElement = document
            .querySelector(this._selector)
            .content.querySelector(".post")
            .cloneNode(true);
        return postElement;
    }
    _setEventListeners() {
        this._deleteButton.addEventListener('click', handleTrash);
        this._likeButton.addEventListener('click', evt => handleLike(evt));
        this._postImgBtn.addEventListener('click', evt => handleImageOpen(evt));
    }

    _renderLikeCounter() {
        this._element.querySelector('.post__like-counter').textContent = this._likes.length;
    }

    generateCard() {
        this._element = this._getElement();
        this._img = this._element.querySelector(".post__img");
        this._imgName = this._element.querySelector(".post__title");
        this._imgName.textContent = this._name;
        this._likeButton = this._element.querySelector(".post__like");
        this._deleteButton = this._element.querySelector(".post__trash");
        this._postImgBtn = this._element.querySelector(".post__open-img");
        this._img.alt = this._name;
        this._img.src = this._link;
        
        this._element.setAttribute('data-id', `${this._id}`);
        this._setEventListeners();
        this._renderLikeCounter();

        //(тут вызывать методы дальнейшие еще)

        return this._element;
    }
}

// открытие картинки
function openImage(evt) {
    const title = evt.target.closest(('.post')).querySelector('.post__title');
    const img = evt.target.querySelector('.post__img');
    bigImage.src = img.src;
    bigImage.alt = title.textContent;
    figcaption.textContent = title.textContent;
};

// проверка наличия лайка текущего пользователя
function chekCurrenUserLike(likes) {
    return likes.some(like => {
        return like._id === userId;
    })
};

// отрисовка количества лайков
function renderLikeCounter(postElement, likes) {
    postElement.querySelector('.post__like-counter').textContent = likes.length;
};

// простановка/снятие лайка
function toggleLike(postLike) {
    postLike.classList.toggle('post__like_liked');
};

export { Post, createPost, openImage, chekCurrenUserLike, renderLikeCounter, toggleLike, postGrid, btnAddPost, captionInput, linkInput };




