 class Api {
     constructor({baseUrl, headers}) {
         this._baseUrl = baseUrl;
         this._headers = headers;
     }

     getProfile() {
         return fetch(`${this._baseUrl}/users/me`, {
             headers: this._headers
         })
             .then((res) => res.ok ? res.json() : Promise.reject(res.status))
     }

     getInitialCards() {
         return fetch(`${this._baseUrl}/cards`, {
             headers: this._headers
         })
             .then((res) => res.ok ? res.json() : Promise.reject(res.status)) //если сервер ответил успешно(ok) создаем из ответа объект, если нет то появляется ошибка
     }

     editProfile(data) {                      //метод редактирования профиля
         return fetch(`${this._baseUrl}/users/me`, {
             method: "PATCH",                 //метод изменяет существующие данные на сервере
             headers: this._headers,
             body: JSON.stringify({     //делает из объекта строку
                 name: data.name,
                 about: data.about
             })
         })
             .then((res) => res.ok ? res.json() : Promise.reject(res.status)) //если сервер ответил успешно(ok) создаем из ответа объект, если нет то появляется ошибка
     }

     addCard(name, link) {
         return fetch(`${this._baseUrl}/cards`, {
             method: "POST",                 //метод изменяет существующие данные на сервере
             headers: this._headers,
             body: JSON.stringify({     //делает из объекта строку
                 name,
                 link
             })
         })
                 .then((res) => res.ok ? res.json() : Promise.reject(res.status))
     }

     deleteCard(id) {
         return fetch(`${this._baseUrl}/cards/${id}`, {
             method: "DELETE",
             headers: this._headers
             })
             .then((res) => res.ok ? res.json() : Promise.reject(res.status))
     }

     deleteLike(id) {
         return fetch(`${this._baseUrl}/cards/${id}/likes`, {
             method: "DELETE",
             headers: this._headers
             })
             .then((res) => res.ok ? res.json() : Promise.reject(res.status))
     }

     addLike(id) {
         return fetch(`${this._baseUrl}/cards/${id}/likes`, {
             method: "PUT",
             headers: this._headers
             })
             .then((res) => res.ok ? res.json() : Promise.reject(res.status))

     }

     newAvatar(data) {                      //метод редактирования профиля
         return fetch(`${this._baseUrl}/users/me/avatar`, {
             method: "PATCH",                 //метод изменяет существующие данные на сервере
             headers: this._headers,
             body: JSON.stringify({     //делает из объекта строку
                 avatar: data.avatar
             })
         })
             .then((res) => res.ok ? res.json() : Promise.reject(res)) //если сервер ответил успешно(ok) создаем из ответа объект, если нет то появляется ошибка

     }

 }

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'b0b415dc-4ab5-4282-b366-67357f280c75',
    'Content-Type': 'application/json'
  }
});
