import { authActions } from "./auth";
import { errorsActions } from "./errors";
import axios from 'axios'

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
      let headers = {
        'ID': token
      }
      let user = await axios.get("/user/me",{ headers: headers });
      user = user.data
      axios.defaults.headers.common["Email"] = user.email; 
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
      let user = await axios.post("/user/login", { email, password });
      user = user.data
      let { id } = user
      window.localStorage.setItem(localStorageKey, id);
      axios.defaults.headers.common["Email"] = user.email; 
      dispatch(authActions.setUser(user));
    } catch (error) {
      if(error.response.status === 401) {
        dispatch(errorsActions.setError({message: 'Email or\\and password are incorrect'}));
      }else dispatch(errorsActions.setUnhandled(error));
    } finally {
    }
  };
}

export function register(form) {
  return dispatch => {
    axios.post('/user/register', form)
    .then(()=>dispatch(login({email: form.email, password: form.password})))
    .catch(error=>{
      dispatch(errorsActions.setError(error.response.data.errorFields))
    })
  }
}

export function logout() {
  return async dispatch => {
    delete axios.defaults.headers.common["Email"];
    await window.localStorage.removeItem(localStorageKey);
    dispatch(authActions.setUser(null))
  }
}

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

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
