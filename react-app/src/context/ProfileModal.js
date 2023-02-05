import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ProfileModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function ProfileModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="profile-modal">
      <div id="profile-modal-background" onClick={onClose} />
      <div id="profile-modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}
