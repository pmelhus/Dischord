import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import HomePage from "./components/HomePage/HomePage";
import { authenticate } from "./store/session";
import LoadingScreen from "./components/LoadingScreen";
import { genChannelMessages } from "./store/channelMessage";
// import { genServers } from "./store/server";
import { LoadingModal } from "./context/LoadingModal";
import { genUsers } from "./store/user";
// import LoadingScreen from "./components/LoadingScreen";
import Splash from "./components/Splash";
import { io } from "socket.io-client";


let socket;
function App() {
  // const [loadingScreen, setLoadingScreen] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.session.user);
  // const [onlineMembers, setOnlineMembers] = useState();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    // create websocket/connect
    socket = io();

    // listen for chat events

    socket.on("chat", (chat) => {
      // when we receive a chat, add it into our messages array in state
      // socket.emit('timeout_check')

      dispatch(genChannelMessages());
    });

    // socket.on("", (chat) => {
    //   // when we recieve a chat, add it into our messages array in state
    //   // setMessages((messages) => [...messages, chat]);
    //   dispatch(genChannelMessages());
    // });

    socket.on("login", (data) => {
      socket.emit('timeout_check')
      dispatch(genUsers());
    });

    socket.on("logout", (data) => {
      socket.emit('timeout_check')
      dispatch(genUsers());
    });

    socket.on('sign-up', () => {
      socket.emit('timeout_check')
      dispatch(genUsers());
    });

    // socket.on("logout", (logout) => {
    //   setOnlineMembers((onlineMembers) =>
    //     [...onlineMembers].filter((member) => member.id !== logout.id)
    //   );
    // });

    // socket.on('deletedMessage', (deletedMessage) => {
    //   dispatch(genChannelMessages(channelId));
    // })

    // socket.on('editedMessage', (editedMessage) => {
    //   dispatch(genChannelMessages(channelId));
    // })
    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Route exact path="/">
        <NavBar />
        <Splash />
      </Route>
      <Switch>
        <>
          <Route path="/login" exact={true}>
            <LoginForm {...{ socket }} />
          </Route>
          <Route path="/register" exact={true}>
            <SignUpForm {...{ socket }} />
          </Route>
        </>
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
              <HomePage
              {...{loading}}
              {...{setLoading}}
                {...{ socket }}
                {...{ setLoading }}
              />
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
