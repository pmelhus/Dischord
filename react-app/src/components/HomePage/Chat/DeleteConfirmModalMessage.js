import { useDispatch } from "react-redux";
import { deleteChannelMessage } from "../../../store/channelMessage";
import { useState } from "react";

const DeleteConfirmModalMessage = ({
  setDeleteEvent,
  socket,
  message,
  messageUser,
  setDeleteModal,
  setShowEdit,
  setErrorsEdit
}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleDelete = async (e) => {
    e.preventDefault();
    const deletedMessage = await dispatch(deleteChannelMessage(message));
    await setDeleteEvent(true);
    if (deletedMessage && deletedMessage.errors) {
      // console.log(newEstate.errors)
      setErrors(deletedMessage.errors);
      return;
    }
    await socket.emit("chat");
    setShowEdit(false)
    setDeleteModal(false);
    setErrorsEdit({})
  };
  return (
    <div className="delete-form-container">
      <form className="delete-message-form">
        <h3>Are you sure you want to delete this message?</h3>
        <div className="button-delete-form">
          <div className="delete-modal-content">
            <div className="delete-message-card">
              <img
                alt="profile"
                className="channel-chat-profile-image"
                src={messageUser.image_url}
              ></img>
              <h4>{messageUser.username}</h4>
            </div>
            <p>Your message:</p>
            <br></br>
            <div className="message-content-div">
              <p>{message.content}</p>
            </div>
          </div>
          <div className="button-div-user">
            <button onClick={handleDelete}>Yes</button>
            <button className="btn" onClick={() => setDeleteModal(false)}>
              No
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeleteConfirmModalMessage;
