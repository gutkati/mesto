export default class UserInfo {
    constructor(profileTitle, profileSubtitle, avatarSelector) {
        this._profileTitle = profileTitle;
        this._profileSubtitle = profileSubtitle;
        this._avatarSelector = avatarSelector;
    }

    getUserInfo() {
        return {
            name: this._profileTitle.textContent,
            about: this._profileSubtitle.textContent,
            avatar: this._avatarSelector.src
        }
    }

    setUserInfo(input) {                                //добавление новых данных
        this._profileTitle.textContent = input.name;
        this._profileSubtitle.textContent = input.about;
        this._avatarSelector.src = input.avatar;
    }

}