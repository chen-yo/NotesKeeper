import { authActions } from "./auth";
import { errorsActions } from "./errors";
import { handleErrors } from "./errors-actions";
import axios from 'axios'


const localStorageKey = "__auth_provider_token__";


function getToken() {
  let token = window.localStorage.getItem(localStorageKey);
  return token;
}

export function tryAutoLogin() {
  return (dispatch) => {
    dispatch(authActions.tryAutoLoginStart());
    const token = getToken();
    if (!token) {
      dispatch(authActions.tryAutoLoginFail());
      return;
    }

    let headers = {
      Token: token,
    };

    return axios
      .get("/api/user/me", { headers: headers })
      .then((res) => {
        let user = res.data;
        axios.defaults.headers.common["Token"] = user.token;
        dispatch(authActions.tryAutoLoginSuccess(user));
      })
      .catch(() => dispatch(authActions.tryAutoLoginFail()))
  };
}
    
    

export function login({ email, password }) {
  return async (dispatch) => {
    dispatch(errorsActions.clearErrors());
    dispatch(authActions.userLoginStart());
    axios.post("/api/user/login", { email, password })
    .then(res => {
      let user = res.data
      let { token } = user;
      window.localStorage.setItem(localStorageKey, token);
      axios.defaults.headers.common["Token"] = user.token;
      dispatch(authActions.userLoginSuccess(user));
    })
    .catch(error => {
      dispatch(authActions.userLoginFail())
      dispatch(errorsActions.setError(error.response.data))
    })
  };
}

export function register(form) {
  return (dispatch) => {
    dispatch(authActions.userRegisterStart());
    axios
      .post("/api/user/register", form)
      .then((res) => {
        let user = res.data;
        let { token } = user;
        window.localStorage.setItem(localStorageKey, token);
        axios.defaults.headers.common["Token"] = user.token;
        dispatch(authActions.userRegisterSuccess(user));
      })
      .catch(handleErrors);
  };
}

export function logout() {
  return async (dispatch) => {
    delete axios.defaults.headers.common["Token"];
    await window.localStorage.removeItem(localStorageKey);
    dispatch(authActions.userLogout());
  };
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
