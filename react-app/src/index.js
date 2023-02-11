import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
import { LoadingModalProvider } from "./context/LoadingModal";
import { UserModalProvider } from "./context/UserModal";
import { ProfileModalProvider} from "./context/ProfileModal"
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {ThemeProvider} from "react-jss";

// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";

// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";

const store = configureStore();

const theme = {
  textGray: 'rgba(173, 171, 171, 0.861)',
  selectedBackground: 'rgba(229, 230, 232, 0.129);',
  offWhite: "rgba(255, 255, 255, 0.836)",
  textGrayTrans: 'rgba(173, 171, 171, 0.161)',
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
