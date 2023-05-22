const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
    headers: {
      authorization: 'e03c6a58-2a56-454c-8255-6314725b68cd',
      'Content-Type': 'application/json'
    }
  }

function checkResult(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

// отправка запроса на изменение аватара
function patchAvatar(src) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: src
        })
    })
    .then(res => checkResult(res))
}

// отправка запроса на добавление поста
function uploadPost(link, name) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => checkResult(res))
};

// отправка запроса на изменение профиля
function patchProfile(name, description) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: description
        })
    })
    .then(res => checkResult(res))
};

// отправка запроса на удаление поста
function deletePost(currentPost) {
    return fetch(`${config.baseUrl}/cards/${currentPost.dataset.id}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => checkResult(res))
};

// запрос на получение постов
function getPosts() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => checkResult(res))
};

// запрос на получение данных профиля
function getProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => checkResult(res))
}

// отправка запроса на установку лайка
function putLike(postId) {
    return fetch(`${config.baseUrl}/cards/likes/${postId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => checkResult(res))
};

// отправка запроса на удаление лайка
function deleteLike(postId) {
    return fetch(`${config.baseUrl}/cards/likes/${postId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => checkResult(res))
};

export { patchAvatar, uploadPost, patchProfile, deletePost, getPosts, getProfile, putLike, deleteLike }