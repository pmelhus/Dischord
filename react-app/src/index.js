import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
import { LoadingModalProvider } from "./context/LoadingModal";
import { UserModalProvider } from "./context/UserModal"

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <LoadingModalProvider>
          <UserModalProvider>
            <App />
          </UserModalProvider>
        </LoadingModalProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
