import { editChannelMessage } from "../../../store/channelMessage";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../../context/Modal";
// import EditMessageModal from "./DeleteConfirmModalMessage ";
import DeleteConfirmModalMessage from "./DeleteConfirmModalMessage"

const ChannelMessage = ({ user, message, socket, channelId }) => {
  const users = useSelector((state) => state.users);
  const messageUser = users[message.owner_id];
  const sessionUser = useSelector((state) => state.session.user);
  // console.log(sessionUser)
  const [showEdit, setShowEdit] = useState(false);
  const [content, setContent] = useState(message.content);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false)

  const handleEditModal = () => {
    setShowEdit(true);
  };

  const editInputSubmit = async (e) => {
    // channel_id, content, edited, owner_id, id
    e.preventDefault();
    const payload = {
      channel_id: message.channel_id,
      content: content,
      edited: true,
      owner_id: message.owner_id,
      id: message.id,
    };

    const editedMessage = await dispatch(editChannelMessage(payload));

    if (editedMessage.errors) {
      setErrors(editedMessage.errors);
      console.log(editedMessage.errors);
      return;
    } else {
    await socket.emit("chat", {editedMessage});
      setShowEdit(false);
    }
  };

  const handleDeleteModal = () => {
    setDeleteModal(true)
  }

  // console.log(message);
  return (
    <>
      <div className="message-chat-container-hover">
        {messageUser?.image_url ? (
          <img
            className="channel-chat-profile-image"
            alt="profile"
            src={messageUser?.image_url}
          />
        ) : (
          <div className="channel-chat-profile-image">
            <i className="fa-solid fa-user-music"></i>
          </div>
        )}
        <div className="channel-chat-user-msg">
          <div>
            <h4>{messageUser?.username}</h4>
            <div className="message-content">
              {showEdit ? (
                <>
                  <div className="message-edit-container">
                    <form>
                      <div className="message-edit-input-container">
                        <input
                          className="message-content-edit"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        ></input>
                      </div>
                      <p id="message-edit-instructions">
                        Press
                        <button onClick={() => setShowEdit(false)}>
                          <i className="fa-solid fa-xmark fa-xl"></i>
                        </button>
                        to cancel. Press enter to{" "}
                        <button onClick={editInputSubmit}>submit.</button>
                      </p>
                    </form>
                  </div>
                </>
              ) : (
                <div className="message-content-edited">
                  <p>{`${message?.content}`}</p>
                  {message.edited && <p id="message-edited">(edited)</p>}
                </div>
              )}
              {sessionUser.id === messageUser.id && !showEdit ? (
                <div className="message-edit-delete">
                  <button
                    onClick={handleEditModal}
                    className="message-edit-button"
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button  className="message-edit-button" onClick={handleDeleteModal}>
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      {deleteModal && (
        <Modal onClose={() => setDeleteModal(false)}>
          <DeleteConfirmModalMessage {...{socket}} {...{message}} {...{messageUser}} {...{setDeleteModal}}/>
        </Modal>
      )}
    </>
  );
};

export default ChannelMessage;
