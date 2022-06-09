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
    <>
    <button onClick={handleClick}>
        <h1>AS</h1>
    </button>
    {showServerModal && (
      <Modal onClose={() => setShowServerModal(false)}>
        <ServerCreateForm />
      </Modal>
    )}
    </>
  )
}

export default AddServerButton
