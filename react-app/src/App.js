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
import { genServers } from "./store/server";
import { Modal, LoadingModal } from "./context/LoadingModal";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {

      await dispatch(authenticate());

      await setLoaded(true);
    })();
  }, []);

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
              <HomePage />
            </ProtectedRoute>
          </Switch>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
