import {authActions} from './auth'
import {client as authClient} from '../utils/api-client'

const localStorageKey = "__auth_provider_token__";


async function getToken() {
  let id = window.localStorage.getItem(localStorageKey);
  return id;
}

 export function tryAutoLogin() {
    return async dispatch => {
        dispatch(authActions.setLoading(true))
        const token = await getToken();
        let user = null;
      
        if (token) {
          user = await authClient("user/me", { headers: { ID: token } });
          if(user) {
              dispatch(authActions.setUser(user))
            } else {
                dispatch(authActions.setLoading(false))
          }
        }
    }
}

function handleUserResponse(user) {
  const { id } = user;
  window.localStorage.setItem(localStorageKey, id);
  return user;
}

function login({ email, password }) {
  return client("login", { email, password }).then(handleUserResponse);
}

function register({ username, password }) {
  return client("register", { username, password }).then(handleUserResponse);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

const authURL = "user";

async function client(endpoint, data) {
  const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };

  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}
