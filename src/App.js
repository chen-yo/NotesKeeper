import * as React from "react";
import * as auth from "./auth-provider";
import { BrowserRouter as Router } from "react-router-dom";
import { client } from './utils/api-client'
import { useAsync } from "./utils/hooks";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import {login as userLogin} from './utils/actions'
import { useDispatch, useSelector } from "react-redux";
import {authActions} from './store/auth'

async function getUser() {
  const token = await auth.getToken();
  let user = null;

  if (token) {
    user = await client("user/me", { headers: { ID: token } });
  }

  return user;
}

function App() {

  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  

  const {
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();

  React.useEffect(() => {
    run(getUser().then(user => user && dispatch(authActions.setLogin(user))))
  }, [run, dispatch]);

  const login = (form) =>
    auth.login(form).then((user) => { userLogin(dispatch, user)});
  const register = (form) => auth.register(form).then((user) => setData(user));
  const logout = () => {
    auth.logout();
    setData(null);
  };

  if (isLoading || isIdle) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return (
      <div>
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error?.message}</pre>
      </div>
    );
  }

  if (isSuccess) {
    const {user } = auth
    const props = { login, register, logout };
    return user ? (
      <Router>
        <AuthenticatedApp {...props} />
      </Router>
    ) : (
      <UnauthenticatedApp {...props} />
    );
  }
}

export { App };
