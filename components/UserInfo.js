export default class UserInfo {
    constructor(profileTitle, profileSubtitle) {
        this._profileTitle = profileTitle;
        this._profileSubtitle = profileSubtitle;
    }

    getUserInfo() {
        return {
            name: this._profileTitle.textContent,
            about: this._profileSubtitle.textContent
        }
    }

    setUserInfo(input) {                                //добавление новых данных
        this._profileTitle.textContent = input.name;
        this._profileSubtitle.textContent = input.about;
    }

}