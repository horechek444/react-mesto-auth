import {setToken} from "./utils/token";

export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password})
  })
    .then(response => {
      let data = response.json();
      if(response.ok) {
        return data;
      }
      return data.then(Promise.reject.bind(Promise));
    })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then((response => {
      let data = response.json();
      console.log(response.status);
      if (response.ok) {
        return data;
      }
      return data.then(Promise.reject.bind(Promise));
    }))
    .then((data) => {
      if (data.token){
        setToken(data.token);
        return data;
      } else {
        return;
      }
    })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
};

