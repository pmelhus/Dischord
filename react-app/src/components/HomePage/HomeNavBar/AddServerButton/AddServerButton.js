import { Modal } from "../../../../context/Modal";
import {  useState } from "react";
import ServerCreateForm from "./ServerCreateForm";

const AddServerButton = () => {
  const [showServerModal, setShowServerModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowServerModal(true);
  };

  return (
    <div className="home-button-div">
      <button className="server-image-icon" onClick={handleClick}>
        <i className="fa-solid fa-plus fa-xl"></i>
      </button>
      {showServerModal && (
        <Modal onClose={() => setShowServerModal(false)}>
          <ServerCreateForm setShowServerModal={setShowServerModal} />
        </Modal>
      )}
    </div>
  );
};

export default AddServerButton;
