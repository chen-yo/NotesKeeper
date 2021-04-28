import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { useDispatch, useSelector } from "react-redux";
import { tryAutoLogin } from "./store/auth-actions";
import { NotifyError } from "./components/NotifyError";

function App() {
  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(tryAutoLogin());
  }, [dispatch]);


  // const register = (form) => auth.register(form).then((user) => setData(user));
  // const logout = () => {
  //   auth.logout();
  //   setData(null);
  // };

  if (loading) {
    return <span>Loading...</span>;
  }

  // if (isError) {
  //   return (
  //     <div>
  //       <p>Uh oh... There's a problem. Try refreshing the app.</p>
  //       <pre>{error?.message}</pre>
  //     </div>
  //   );
  // }

  return user ? (
    <Router>
      <AuthenticatedApp />
      <NotifyError />
    </Router>
  ) : (
    <>
      <NotifyError />
      <UnauthenticatedApp />
    </>
  );
}

export { App };
