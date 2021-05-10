import * as React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import  AuthenticatedApp  from "./AuthenticatedApp";
import  UnauthenticatedApp  from "./UnauthenticatedApp";
import { useDispatch, useSelector } from "react-redux";
import { NotifyError } from "./components/NotifyError";
import { useLoadingIndicator } from "./utils/hooks";
import { tryAutoLogin } from "./features/user/auth-actions";

function App() {
  const { user } = useSelector((state) => state.auth);
  const isLoading = useLoadingIndicator('TRY_AUTO_LOGIN')
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(tryAutoLogin());
  }, [dispatch]);

  if(isLoading) {
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
