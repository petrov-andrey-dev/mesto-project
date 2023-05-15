const bigImage = document.querySelector('.popup__big-image');
const figcaption = document.querySelector('.popup__figcaption');
const postGrid = document.querySelector('.posts__grid');
const btnAddPost = document.querySelector('.profile__add-post');
const captionInput = document.querySelector('#caption');
const linkInput = document.querySelector('#link');

function createPost(link, name) {
    const post = document.querySelector('#post').content;
    const postElement = post.querySelector('.post').cloneNode(true);
    const postImg = postElement.querySelector('.post__img');

    postImg.src = link;
    postImg.alt = name;
    postElement.querySelector('.post__title').textContent = name;

    return postElement;
};

function openImage(evt) {
    const title = evt.target.closest(('.post')).querySelector('.post__title');
    const img = evt.target.querySelector('.post__img');
    bigImage.src = img.src;
    bigImage.alt = title.textContent;
    figcaption.textContent = parentPostTitle.textContent;
}

export {createPost, openImage, postGrid, btnAddPost, captionInput, linkInput};