import * as React from "react";
import * as auth from "./auth-provider";
import { BrowserRouter as Router } from "react-router-dom";
import { client } from './utils/api-client'
import { useAsync } from "./utils/hooks";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { useAppContext } from "./appdata";

async function getUser() {
  const token = await auth.getToken();
  let user = null;

  if (token) {
    user = await client("user/me", { headers: { ID: token } });
  }

  return user;
}

function App() {
  const [state, dispatch] = useAppContext();

  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync();

  React.useEffect(() => {
    run(getUser())
      .then((data) => dispatch({ type: "LOGIN", user: data }))
      .catch();
  }, [run, dispatch]);

  const login = (form) =>
    auth.login(form).then((user) => dispatch({ type: "LOGIN", user: user }));
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
        <pre>{error.message}</pre>
      </div>
    );
  }

  if (isSuccess) {
    const { user } = state;
    console.log("isSucc", user);
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
