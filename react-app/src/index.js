import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
import { LoadingModalProvider } from "./context/LoadingModal";
import { UserModalProvider } from "./context/UserModal";
import { ProfileModalProvider} from "./context/ProfileModal"

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import {ThemeProvider} from "react-jss";

// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";

// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";

const store = configureStore();

const theme = {
  textGray: 'rgba(185, 187, 190)',
  selectedBackground: 'rgba(229, 230, 232, 0.129)',
  hoverBackground: "rgba(250, 230, 255, 0.06)",
  offWhite: "rgba(255, 255, 255, 0.996)",
  textGrayTrans: 'rgba(173, 171, 171, 0.161)',
  darkInputBackground: "rgba(32, 34, 37, 1)",
  pinkTheme: '#950652',
  buttonPink: 'rgb(116, 56, 73)',
  friendGreen: "rgb(45, 125, 70)",
  hoverFriendGreen: "rgb(3, 125, 70)",
  darkGray: 'rgb(142, 146, 151)',
  channelListGray: 'rgb(43, 45, 49)',
  serverListGray: '#202225',
  chatBackground: 'rgb(49, 51, 56)',
  messageBackground: 'rgba(0, 0, 0, 0.089)',
  messageHighlight: 'rgb(0, 168, 252)',
  buttonGray: 'rgb(85, 87, 95)',
  redTheme: 'rgb(200 56 73)',
  redThemeGrayed: 'rgba(200, 56, 73, .5)',
  boxShadowButton: 'rgba(2, 2, 2, 0.15)',
  darkMenuBackground: 'rgb(17, 18, 20)'
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider
    theme = {theme}
      >
        <ModalProvider>
          <ProfileModalProvider>
            <LoadingModalProvider>
              <UserModalProvider>
                <App />
              </UserModalProvider>
            </LoadingModalProvider>
          </ProfileModalProvider>
        </ModalProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
