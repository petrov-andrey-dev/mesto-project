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

export { createPost, openImage, chekCurrenUserLike, renderLikeCounter, toggleLike, postGrid, btnAddPost, captionInput, linkInput };




