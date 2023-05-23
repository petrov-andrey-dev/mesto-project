const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
    headers: {
        authorization: 'e03c6a58-2a56-454c-8255-6314725b68cd',
        'Content-Type': 'application/json'
    }
};

// проверка ответа
function checkResult(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

// универсальная функция соправки запроса и проверки ответа
function request(url, options) {
    return fetch(`${config.baseUrl}${url}`, options).then(checkResult)
};

// отправка запроса на изменение аватара
function patchAvatar(src) {
    return request(`/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: src
        })
    })
};

// отправка запроса на добавление поста
function uploadPost(link, name) {
    return request(`/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
};

// отправка запроса на изменение профиля
function patchProfile(name, description) {
    return request(`/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: description
        })
    })
};

// отправка запроса на удаление поста
function deletePost(currentPost) {
    return request(`/cards/${currentPost.dataset.id}`, {
        method: 'DELETE',
        headers: config.headers
    })
};

// запрос на получение постов
function getPosts() {
    return request(`/cards`, {
        headers: config.headers
    })
};

// запрос на получение данных профиля
function getProfile() {
    return request(`/users/me`, {
        headers: config.headers
    })
};

// отправка запроса на установку лайка
function putLike(postId) {
    return request(`/cards/likes/${postId}`, {
        method: 'PUT',
        headers: config.headers
    })
};

// отправка запроса на удаление лайка
function deleteLike(postId) {
    return request(`/cards/likes/${postId}`, {
        method: 'DELETE',
        headers: config.headers
    })
};

export { patchAvatar, uploadPost, patchProfile, deletePost, getPosts, getProfile, putLike, deleteLike }