import { createUseStyles, useTheme } from "react-jss";
import {useState} from "react"
import { useSelector, useDispatch } from "react-redux";

import {deleteDirectMessage} from "../../../../../store/directMessage"

const useStyles = createUseStyles((theme) => ({}));

const DeleteDmConfirm = ({ socket, message, setDeleteConfirm }) => {
  const messageUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const theme = useTheme();
  const classes = useStyles({ theme });

  const handleDelete = async (e) => {
    e.preventDefault();
    const deletedMessage = await dispatch(deleteDirectMessage(message));

    if (deletedMessage && deletedMessage.errors) {
      setErrors(deletedMessage.errors);
      return;
    }
    await socket.emit("chat");

    setDeleteConfirm(false);
    setErrors({});
  };

  const createdAtDate = new Date(message.created_at);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const messageDate = createdAtDate.toLocaleDateString("en-US", options);

  return (
    <div className="delete-form-container">
      <form className="delete-message-form">
        <h3 className="delete-message-heading">Delete Message</h3>
        <p className="delete-message-question">
          Are you sure you want to delete this message?
        </p>
        <div className="button-delete-form">
          <div className="delete-modal-content">
            <div className="delete-message-card">
              <img
                alt="profile"
                className="delete-message-image"
                src={messageUser.image_url}
              ></img>
              <h4>
                <span>{messageUser.username}</span>
                <span className="delete-message-date">{messageDate}</span>
              </h4>

              <div className="delete-message-content">
                <p>{message.content}</p>
              </div>
            </div>
          </div>
          <div className="button-div-user">
            <button
              className="delete-button-cancel"
              onClick={() => setDeleteConfirm(false)}
            >
              Cancel
            </button>
            <button className="delete-button-delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeleteDmConfirm;
