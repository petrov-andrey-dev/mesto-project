export default class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }
    // проверка ответа
    _checkResult(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    // универсальная функция соправки запроса и проверки ответа
    _request(url, options) {
        return fetch(`${this._baseUrl}${url}`, options).then(this._checkResult)
    };

    // отправка запроса на изменение аватара
    patchAvatar(src) {
        return this._request(`/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: src
            })
        })
    };

    // отправка запроса на добавление поста
    uploadPost(link, name) {
        return this._request(`/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
    };

    // отправка запроса на изменение профиля
    patchProfile(name, description) {
        return this._request(`/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: description
            })
        })
    };

    // отправка запроса на удаление поста
    deletePost(currentPost) {
        return this._request(`/cards/${currentPost.dataset.id}`, {
            method: 'DELETE',
            headers: this._headers
        })
    };

    // запрос на получение постов
    getPosts() {
        return this._request(`/cards`, {
            headers: this._headers
        })
    };

    // запрос на получение данных профиля
    getProfile() {
        return this._request(`/users/me`, {
            headers: this._headers
        })
    };

    // отправка запроса на установку лайка
    putLike(postId) {
        return this._request(`/cards/likes/${postId}`, {
            method: 'PUT',
            headers: this._headers
        })
    };

    // отправка запроса на удаление лайка
    deleteLike(postId) {
        return this._request(`/cards/likes/${postId}`, {
            method: 'DELETE',
            headers: this._headers
        })
    };
}
