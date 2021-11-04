export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
    // return res => res.ok ? res.json() : Promise.reject(res.status);
  }

  /**
   * promiseAll для получения данных пользователя и карточек с сервера
   * @returns {Promise<any[]>}
   */
  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  /**
   *публичный метод загрузки данных пользователя с сервера
   * @returns {Promise<any>}
   */
  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {headers: this._headers})
      .then(this._checkResponse);
  }

  setAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: data.avatar})
    })
      .then(this._checkResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name: data.popup_name, about: data.popup_job})
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {headers: this._headers})
      .then(this._checkResponse);
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name: data.name, link: data.link})
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

  updateCardLike(id, liked) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: liked ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse);
  }

}
