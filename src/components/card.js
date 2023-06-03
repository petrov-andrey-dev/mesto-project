import {
    userId,
    handleTrash,
    popupImage,
    api
} from "../index.js";
import {
    openPopup
} from "./modal.js";

const bigImage = document.querySelector(".popup__big-image");
const figcaption = document.querySelector(".popup__figcaption");
const postGrid = document.querySelector(".posts__grid");
const btnAddPost = document.querySelector(".profile__add-post");
const captionInput = document.querySelector("#caption");
const linkInput = document.querySelector("#link");

// ----> ООП создание поста<-----------------------------------------------------------
export default class Post {
    constructor(data, selector) {
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._owner = data.owner;
        this._id = data._id;
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
        this._deleteButton.addEventListener('click', handleTrash);
        this._likeButton.addEventListener('click', () => this._handleLike());
        this._postImgBtn.addEventListener('click', () => this._handleImageOpen());
    }
    // отрисовка кол-ва лайков
    _renderLikeCounter() {
        this._element.querySelector('.post__like-counter').textContent = this._likes.length;
    }
    // проверка лайка текущего пользователя
    _checkCurrentUserLike() {
        return this._likes.some(like => {
            return like._id === userId;
        })
    }
    // переключение стиля лайка
    _toggleLike() {
        this._likeButton.classList.toggle("post__like_liked");
    }
    // обработчик события клика по лайку
    _handleLike() {
        if (!this._likeButton.classList.contains('post__like_liked')) {
            api.putLike(this._id)
                .then(() => {
                    this._toggleLike();
                    this._renderLikeCounter();
                })
                .catch(err => console.log(err))
        } else {
            api.deleteLike(this._id)
                .then(() => {
                    this._toggleLike();
                    this._renderLikeCounter();
                })
                .catch(err => console.log(err))
        }
    };
    // обработчик события клика по картинке
    _handleImageOpen() {
        openPopup(popupImage);
        this._openImage();
    }
    // открытие попапа картинки
    _openImage() {
        bigImage.src = this._img.src;
        bigImage.alt = this._imgName.textContent;
        figcaption.textContent = this._imgName.textContent;
    }
    // возврат готового элемента карточки
    generateCard() {
        this._element = this._getElement();
        this._img = this._element.querySelector(".post__img");
        this._imgName = this._element.querySelector(".post__title");
        this._likeButton = this._element.querySelector(".post__like");
        this._deleteButton = this._element.querySelector(".post__trash");
        this._postImgBtn = this._element.querySelector(".post__open-img");

        this._imgName.textContent = this._name;
        this._img.alt = this._name;
        this._img.src = this._link;

        this._element.setAttribute('data-id', `${this._id}`);
        this._setEventListeners();
        this._renderLikeCounter();

        if (this._checkCurrentUserLike()) this._toggleLike();
        if (this._owner._id !== userId) this._deleteButton.remove();

        return this._element;
    }
}

//-------------------------------------------------------------------------------
// function createPost(link, name, likes, ownerId, postId) {
//     const post = document.querySelector("#post").content;
//     const postElement = post.querySelector(".post").cloneNode(true);
//     const postImg = postElement.querySelector(".post__img");
//     const postDeleteBtn = postElement.querySelector(".post__trash");
//     const postLike = postElement.querySelector(".post__like");
//     const postImgBtn = postElement.querySelector(".post__open-img");

//     postImg.src = link;
//     postImg.alt = name;
//     postElement.querySelector(".post__title").textContent = name;

//     postElement.setAttribute("data-id", `${postId}`);
//     renderLikeCounter(postElement, likes);
//     if (chekCurrenUserLike(likes)) toggleLike(postLike);
//     if (ownerId !== userId) postDeleteBtn.remove();

//     postDeleteBtn.addEventListener("click", handleTrash);
//     postLike.addEventListener("click", (evt) => handleLike(evt));
//     postImgBtn.addEventListener("click", (evt) => handleImageOpen(evt));

//     return postElement;
// };

// открытие картинки
// function openImage(evt) {
//     const title = evt.target.closest(".post").querySelector(".post__title");
//     const img = evt.target.querySelector(".post__img");
//     bigImage.src = img.src;
//     bigImage.alt = title.textContent;
//     figcaption.textContent = title.textContent;
// }

// проверка наличия лайка текущего пользователя
// function chekCurrenUserLike(likes) {
//     return likes.some((like) => {
//         return like._id === userId;
//     });
// }

// отрисовка количества лайков
// function renderLikeCounter(postElement, likes) {
//     postElement.querySelector(".post__like-counter").textContent = likes.length;
// }

// простановка/снятие лайка
// function toggleLike(postLike) {
//     postLike.classList.toggle("post__like_liked");
// }

export {
    Post,
    postGrid, 
    btnAddPost, 
    captionInput, 
    linkInput
};




