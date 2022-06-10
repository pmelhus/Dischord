import { Modal } from "../../../../context/Modal"
import { useEffect, useState } from "react";
import ServerCreateForm from "./ServerCreateForm"

const AddServerButton = () => {

  const [showServerModal, setShowServerModal] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setShowServerModal(true)
  }

  return (
    <div className="home-button-div">
    <button className="server-image-icon" onClick={handleClick}>
        <h1>AS</h1>
    </button>
    {showServerModal && (
      <Modal onClose={() => setShowServerModal(false)}>
        <ServerCreateForm setShowServerModal={setShowServerModal} />
      </Modal>
    )}
    </div>
  )
}

export default AddServerButton
