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



}

// export default class Api {
//   constructor({address, groupId, token}) {
//     this._address = address
//     this._groupId = groupId
//     this._token = token
//   }
//
//   getAppInfo() {
//     return Promise.all([this.getUserInfo(), this.getCardList()])
//   }
//
//   getUserInfo() {
//     return this._get('users/me')
//   }
//

//
//   getCardList() {
//     return this._get('cards')
//     // return fetch(`${this._address}/${this._groupId}/cards`, {
//     // headers: {
//     // authorization: this._token
//     // }
//     // })
//     // .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
//   }
//
//   _get(query) {
//     const options = {
//       headers: {
//         authorization: this._token
//       }
//     }
//
//     return fetch(this._url(query), options)
//       .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
//   }

//   setUserInfo(name, description) {
//     return this._set('users/me', 'PATCH', {name, about: description})
//   }

//   _set(query, method, body) {
//     const options = {
//       method,
//       headers: {
//         authorization: this._token,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(body)
//     }
//
//     return fetch(this._url(query), options)
//       .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
//   }
//
//   _url(query) {
//     return `${this._address}/${this._groupId}/${query}`
//   }
// }
