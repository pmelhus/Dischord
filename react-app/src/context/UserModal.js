import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const UserModalContext = React.createContext();

export function UserModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <UserModalContext.Provider value={value}>
        {children}
      </UserModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function UserModal({ onClose, children }) {
  const modalNode = useContext(UserModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">{children}</div>
    </div>,
    modalNode
  );
}
