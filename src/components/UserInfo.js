export default class UserInfo {
  constructor(name, job, avatar) {
    this._userName = document.querySelector(name);
    this._userJob = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  /**
   * публичный метод получение данных пользователя в объект
   * @returns {{name: *, avatar: *, job: *}}
   */
  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      avatar: this._avatar.src
    }
  }

  /**
   * публичный метод установки данных пользователя
   * @param data
   */
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this.setUserAvatar(data);
  }

  /**
   * публичный метод установки аватара
   * @param data
   */
  setUserAvatar(data) {
    this._avatar.src = data.avatar
  }
}