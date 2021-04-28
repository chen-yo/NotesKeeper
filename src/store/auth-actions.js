import { authActions } from "./auth";
import { client as authClient } from "../utils/api-client";
import { errorsActions } from "./errors";

const localStorageKey = "__auth_provider_token__";

async function getToken() {
  let id = window.localStorage.getItem(localStorageKey);
  return id;
}

export function tryAutoLogin() {
  return async (dispatch) => {
    dispatch(authActions.setLoading(true));
    const token = await getToken();
    if (!token) {
      dispatch(authActions.setLoading(false));
      return;
    }
    try {
      let user = await authClient("user/me", { headers: { ID: token } });
      dispatch(authActions.setUser(user));
    } catch (errors) {
      dispatch(errorsActions.setUnhandled(errors));
    } finally {
      dispatch(authActions.setLoading(false));
    }
  };
}

function handleUserResponse(user) {
  return user;
}

export function login({ email, password }) {
  return async (dispatch) => {
    try {
      let user = await client("login", { email, password });
      const { id } = user;
      window.localStorage.setItem(localStorageKey, id);
      dispatch(authActions.setUser(user));
    } catch (error) {
      dispatch(errorsActions.setUnhandled(error));
    } finally {
    }
  };
}

export function logout() {
  return async dispatch => {
    await window.localStorage.removeItem(localStorageKey);
    dispatch(authActions.setUser(null))
  }
}

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

function register({ username, password }) {
  return client("register", { username, password }).then(handleUserResponse);
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
