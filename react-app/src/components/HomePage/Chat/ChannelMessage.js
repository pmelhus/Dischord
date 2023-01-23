import { editChannelMessage } from "../../../store/channelMessage";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../../context/Modal";
// import EditMessageModal from "./DeleteConfirmModalMessage ";
import DeleteConfirmModalMessage from "./DeleteConfirmModalMessage";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import UserProfilePopover from "../UserProfilePopover/UserProfilePopover";
import { useLocation, Route } from "react-router-dom";
import LinkDisplay from "./LinkDisplay";

const ChannelMessage = ({
  setMessageEditId,
  message,
  socket,
  ind,
  messageEditId,
  currentChannelMessages,
}) => {
  const users = useSelector((state) => state.users);
  const messageUser = users[message.owner_id];
  const sessionUser = useSelector((state) => state.session.user);
  // console.log(sessionUser)
  const [showEdit, setShowEdit] = useState(false);
  const [content, setContent] = useState(message.content);
  const [errors, setErrorsEdit] = useState({});
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState(false);
  const { pathname } = useLocation();
  // const [messageEditId, setMessageEditId] = useState(null);
  const servers = useSelector((state) => state.servers);

  const handleEditModal = () => {
    console.log(messageEditId, "MESSAGE EDIT ID");
    console.log(message.id, "MESSAGE ID");

    setShowEdit(true);
    setContent(message.content);
    setMessageEditId(message.id);
    // console.log(messageEditId, "MESSAGE EDIT ID ");
  };

  const editInputSubmit = async (e) => {
    // channel_id, content, edited, owner_id, id
    await e.preventDefault();
    const payload = {
      channel_id: message.channel_id,
      content: content,
      edited: true,
      owner_id: message.owner_id,
      id: message.id,
    };
    const editedMessage = await dispatch(editChannelMessage(payload));
    await setContent(editedMessage.content);

    if (editedMessage.errors) {
      setErrorsEdit(editedMessage.errors);
      // console.log(editedMessage.errors);
      // setShowEdit(false);
      setContent(message.content);
      // console.log(content.length, "CONTENT");
      if (content.length > 1000) {
        setContent(content);
      }
      if (content.length === 0) {
        setDeleteModal(true);
      }
      return;
    } else {
      await setShowEdit(false);
      await console.log(showEdit, "HERRAA");
      await socket.emit("chat");
      await setErrorsEdit({});
    }
  };

  const handleCancel = () => {
    setShowEdit(false);
    setErrorsEdit({});
    // setMessageEditId(message.id);
    // console.log(messageEditId, "MESSAGE EDIT ID ");
  };

  const handleDeleteModal = () => {
    setDeleteModal(true);
  };

  useEffect(() => {
    if (deleteEvent) {
      setContent(message.content);
      setDeleteEvent(false);
    }
  }, [deleteEvent]);

  // useEffect(() => {
  //   setShowEdit(false);
  //   if (message.id === messageEditId) {
  //     setContent(message.content);
  //     setShowEdit(true);
  //   }
  // }, [message]);
  // check the preceding message

  const checkAdjacentMessages = (message, currentChannelMessages, ind) => {
    if (!currentChannelMessages[ind - 1]) return true;
    const previousMessage = currentChannelMessages[ind - 1];
    if (
      previousMessage.owner_id &&
      previousMessage.owner_id !== message.owner_id
    ) {
      return true;
    } else {
      return false;
    }
  };

  const displayMessageDate = (message) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(message.created_at).toLocaleDateString(undefined, options);
  };

  const serverId = parseInt(pathname.split("/")[2]);

  const currentServer = servers[serverId];
  const user = users[message.owner_id];

  // const user = users.filter(user => user.id === message.user_id)
  const [userModal, setUserModal] = useState(false);
  const popover = (
    <Popover placement="left-start" id="popover-basic">
      {/* <Popover.Header as="h3">{user.username}</Popover.Header> */}

      <UserProfilePopover currentServer={currentServer} user={user} />
    </Popover>
  );

// Checks for url in string
  const checkIfIncludes = (string) => {
    const urlRegex =
      // eslint-disable-next-line no-useless-escape
      /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
    return string.search(urlRegex);
  };

  return (
    <>
      <div className="message-chat-container-hover">
        {messageUser?.image_url ? (
          <>
            {checkAdjacentMessages(message, currentChannelMessages, ind) && (
              <>
                <div className="username-message-date-div">
                  <h4 className="username-channel-message">
                    {messageUser?.username}
                  </h4>
                  <p className="message-date">{displayMessageDate(message)}</p>
                </div>
                {/* <button > */}

                <OverlayTrigger
                  rootClose={true}
                  trigger={"click"}
                  placement="right-end"
                  overlay={popover}
                  onToggle={() => setUserModal(!userModal)}
                  // onHide={() => setUserModal(false)}
                  show={userModal}
                >
                  <img
                    style={{ cursor: "pointer" }}
                    className="channel-chat-profile-image"
                    alt="profile"
                    src={messageUser?.image_url}
                  />
                </OverlayTrigger>
                {/* </button> */}
              </>
            )}
          </>
        ) : (
          <>
            {checkAdjacentMessages(message, currentChannelMessages, ind) && (
              <>
                <div className="username-message-date-div">
                  <h4 className="username-channel-message">
                    {messageUser?.username}
                  </h4>
                  <p className="message-date">{displayMessageDate(message)}</p>
                </div>
                <div className="channel-chat-profile-image">
                  <i className="fa-solid fa-user-music"></i>
                </div>
              </>
            )}
          </>
        )}
        <div className="channel-chat-user-msg">
          <div className="message-content">
            {showEdit ? (
              <>
                <div className="message-edit-container">
                  {errors && errors.content && (
                    <div className="error-msg-message-message">
                      <p>*{errors.content}*</p>
                    </div>
                  )}
                  <form onSubmit={editInputSubmit}>
                    <div className="message-edit-input-container">
                      <input
                        className="message-content-edit"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      ></input>
                    </div>
                    <p id="message-edit-instructions">
                      Press
                      <button type="button" onClick={handleCancel}>
                        <i className="fa-solid fa-xmark fa-xl"></i>
                      </button>
                      to cancel. Press enter to submit.
                    </p>
                  </form>
                </div>
              </>
            ) : (
              <div className="message-content-edited">

                {/* Displays regular message unless theres a link present in the message */}

                {checkIfIncludes(message.content) !== -1 ? (
                  <>
                    <LinkDisplay {...{ message }} />
                  </>
                ) : (
                  <p id="message-actual-content">{`${message?.content}`}</p>
                )}
                {/* <div> */}
                {message.edited && <p id="message-edited">(edited)</p>}
                {/* </div> */}
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
                <button
                  className="message-edit-button"
                  onClick={handleDeleteModal}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {deleteModal && (
        <Modal onClose={() => setDeleteModal(false)}>
          <DeleteConfirmModalMessage
            {...{ socket }}
            {...{ setDeleteEvent }}
            {...{ message }}
            {...{ messageUser }}
            {...{ setDeleteModal }}
            {...{ setShowEdit }}
            {...{ setErrorsEdit }}
          />
        </Modal>
      )}
    </>
  );
};

export default ChannelMessage;
