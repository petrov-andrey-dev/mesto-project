export default class UserInfo {
    constructor(nameSelector, descriptionSelector, avatarSelector) {
        this._nameElement = document.querySelector(nameSelector);
        this._descriptionElement = document.querySelector(descriptionSelector);
        this._avatarElement = document.querySelector(avatarSelector);
        // this.name;
        // this.about;
        // this.avatar;
        // this.userId;
    }
//получает данные пользователя при открытии формы
    getUserInfo() {
        this._info = {
            name: this.name,
            about: this.about,
            avatar: this.avatar,
            userId: this.userId
        }
        return this._info;
    }
//принимает новые данные пользователя и добавляет их на страницу
    setUserInfo({name, about, avatar, _id}) {
        this.name = name;
        this.about = about;
        this.avatar = avatar;
        this.userId = _id;
    }

    renderUserInfo() {
        this._nameElement.textContent = this.name;
        this._descriptionElement.textContent = this.about;
    }

    renderAvatar() {
        this._avatarElement.src = this.avatar;
    }
}
