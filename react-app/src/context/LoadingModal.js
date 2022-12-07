import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./LoadingModal.css";

const LoadingModalContext = React.createContext();

export function LoadingModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <LoadingModalContext.Provider value={value}>
        {children}
      </LoadingModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function LoadingModal({ onClose, children }) {
  const modalNode = useContext(LoadingModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div  id="loading-modal">
      <div onClick={onClose} />
      <div onMouseLeave={onClose} id="loading-modal-content">{children}</div>
    </div>,
    modalNode
  );
}
