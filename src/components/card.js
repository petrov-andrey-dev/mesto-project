import { currentUserId } from "../index.js";

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
    const postLike = postElement.querySelector('.post__like')

    postImg.src = link;
    postImg.alt = name;
    postElement.querySelector('.post__title').textContent = name;
    postElement.setAttribute('data-id', `${postId}`);
    renderLikeCounter(postElement, likes)
    if (chekCurrenUserLike(likes)) toggleLike(postLike);
    if (ownerId !== currentUserId) postDeleteBtn.remove();

    return postElement;
};


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
        return like._id === currentUserId;
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

// отправка запроса на установку лайка
function putLike(postId) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-24/cards/likes/${postId}`, {
        method: 'PUT',
        headers: {
            authorization: 'e03c6a58-2a56-454c-8255-6314725b68cd'
        }
    })
};

// отправка запроса на удаление лайка
function deleteLike(postId) {
    return fetch(`https://nomoreparties.co/v1/plus-cohort-24/cards/likes/${postId}`, {
        method: 'DELETE',
        headers: {
            authorization: 'e03c6a58-2a56-454c-8255-6314725b68cd'
        }
    })
};


export { createPost, openImage, chekCurrenUserLike, renderLikeCounter, toggleLike, putLike, deleteLike, postGrid, btnAddPost, captionInput, linkInput};




