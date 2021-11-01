export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {headers: this._headers})
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name: data.popup_name, about: data.popup_job})
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {headers: this._headers})
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name: data.name, link: data.link})
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  deleteCard(card) {
    return fetch(`${this._baseUrl}cards/${card._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  setLike(card) {
    return fetch(`${this._baseUrl}cards/likes/${card._id}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

  delLike(card) {
    return fetch(`${this._baseUrl}cards/likes/${card._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
  }

}
