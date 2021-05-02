import { authActions } from "./auth";
import { errorsActions, errorsReducer } from "./errors";
import axios from "axios";
import store from './index'


const localStorageKey = "__auth_provider_token__";

async function getToken() {
  let id = window.localStorage.getItem(localStorageKey);
  return id;
}

export function tryAutoLogin() {
  return async (dispatch) => {
    dispatch(authActions.tryAutoLoginStart())
    const token = await getToken();
    if (!token) {
      dispatch(authActions.tryAutoLoginFail());
      return;
    }
    try {
      let headers = {
        ID: token,
      };
      let user = await axios.get("/user/me", { headers: headers });
      user = user.data;
      axios.defaults.headers.common["Email"] = user.email;
      dispatch(authActions.tryAutoLoginSuccess(user));
    } catch (errors) {
      dispatch(errorsActions.setUnhandled(errors));
    } finally {
      dispatch(authActions.tryAutoLoginFail());
    }
  };
}

export function login({ email, password }) {
  return async (dispatch) => {
    dispatch(errorsActions.clearErrors());
    dispatch(authActions.userLoginStart());

    try {
      let user = await axios.post("/user/login", { email, password });
      user = user.data;
      let { id } = user;
      window.localStorage.setItem(localStorageKey, id); // save the id as a token
      axios.defaults.headers.common["Email"] = user.email; //
      dispatch(authActions.userLoginSuccess(user));
    } catch (error) {
      dispatch(authActions.userLoginFail());
      handleErrors(error);
    }
  };
}

export function register(form) {
  return (dispatch) => {
    dispatch(authActions.setLoading(true))
    axios
      .post("/user/register", form)
      .then(() => {
        dispatch(login({ email: form.email, password: form.password }));
      })
      .catch(handleErrors)
      // .finally(()=>dispatch(authActions.setLoading(false)))
  };
}

function handleErrors(error) {
  let fields = error?.response?.data?.errorFields
  if(fields) {
    fields && store.dispatch(errorsActions.setError(error.response.data.errorFields));
  } else {
    store.dispatch(errorsActions.setUnhandled(error))
  }
}

export function logout() {
  return async (dispatch) => {
    delete axios.defaults.headers.common["Email"];
    await window.localStorage.removeItem(localStorageKey);
    dispatch(authActions.userLoginSuccess(null));
  };
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// function register({ username, password }) {
//   return axios.post("register", { username, password }).then(handleUserResponse);
// }

const authURL = "user";

// async function client(endpoint, data) {
//   const config = {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" },
//   };

//   return window
//     .fetch(`${authURL}/${endpoint}`, config)
//     .then(async (response) => {

//       if (response.ok) {
//         const data = await response.json();
//         return data;
//       } else {
//         let error = await response.text()
//         return Promise.reject(error);
//       }
//     });
// }
