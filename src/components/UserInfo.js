export default class UserInfo {
    constructor(nameSelector, descriptionSelector, avatarSelector) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }
//получает данные пользователя при открытии формы
    getUserInfo() {
        this._info = {
            name: this._name.textContent,
            job: this._description.textContent,
            avatar: this._avatar.src
        }
        return this._info;
    }
//принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this._name.textContent = data.name;
        this._description.textContent = data.job;
        this._avatar.src = data.avatar;
    }
}
