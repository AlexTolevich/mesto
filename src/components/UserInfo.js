export default class UserInfo {
  constructor(name, job, avatar) {
    this._userName = document.querySelector(name);
    this._userJob = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.popup_name;
    this._userJob.textContent = data.popup_job;
    this._avatar.src = data.avatar
  }
}