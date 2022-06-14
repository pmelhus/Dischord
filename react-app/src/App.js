import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import HomePage from "./components/HomePage/HomePage";
import { authenticate } from "./store/session";
import LoadingScreen from "./components/LoadingScreen";
// import { genServers } from "./store/server";
import { LoadingModal } from "./context/LoadingModal";
import {genUsers} from "./store/session"
// import LoadingScreen from "./components/LoadingScreen";

function App() {
  // const [loadingScreen, setLoadingScreen] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Route exact path="/">
        <NavBar />
      </Route>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/register" exact={true}>
          <SignUpForm />
        </Route>
      </Switch>
      {loaded && (
        <>
          <Switch>
            <ProtectedRoute path="/users" exact={true}>
              <UsersList />
            </ProtectedRoute>
            <ProtectedRoute path="/users/:userId" exact={true}>
              <User />
            </ProtectedRoute>
            <ProtectedRoute path="/channels">
              <HomePage {...{setLoading}} />
            </ProtectedRoute>
          </Switch>
        </>
      )}
      {loading && (
        <LoadingModal>
          <LoadingScreen />
        </LoadingModal>
      )}

    </BrowserRouter>
  );

}

export default App;
