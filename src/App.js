import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { useDispatch, useSelector } from "react-redux";
import { tryAutoLogin } from "./store/auth-actions";
import { NotifyError } from "./components/NotifyError";
// import {setUser} from './store/auth'

function App() {
  const { user } = useSelector((state) => state.auth);
  const {TRY_AUTO_LOGIN} = useSelector((state) => state.pending);
  const pending = TRY_AUTO_LOGIN?.pending 
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(tryAutoLogin());
  }, [dispatch]);

  if(pending) {
    return <span>Trying auto login...</span>
  }

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
