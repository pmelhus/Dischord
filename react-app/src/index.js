import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
import { LoadingModalProvider } from "./context/LoadingModal";
import { UserModalProvider } from "./context/UserModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ThemeProvider from "react-bootstrap/ThemeProvider";

// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";

// Bootstrap Bundle JS
// import "bootstrap/dist/js/bootstrap.bundle.min";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider
        breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
        minBreakpoint="xxs"
      >
        <ModalProvider>
          <LoadingModalProvider>
            <UserModalProvider>
              <App />
            </UserModalProvider>
          </LoadingModalProvider>
        </ModalProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
