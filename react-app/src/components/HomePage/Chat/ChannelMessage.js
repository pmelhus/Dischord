import { editChannelMessage } from "../../../store/channelMessage";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../../../context/Modal";
// import EditMessageModal from "./DeleteConfirmModalMessage ";
import DeleteConfirmModalMessage from "./DeleteConfirmModalMessage";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import UserProfilePopover from "../UserProfilePopover/UserProfilePopover";
import { useLocation, Route } from "react-router-dom";
import LinkDisplay from "./LinkDisplay";
import SlateTextEditor from "./SlateTextEditor";
import { Slate } from "slate-react";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  messageDiv: {
    "&:hover": {
      backgroundColor: theme.messageBackground,
    },
    marginRight: "4px",
  },

  imageAndUsername: {
    display: "flex",
    width: "100%",
  },

  content: {
    margin: "0",
    marginLeft: "56px",
    // marginBottom: "14px",
    color: theme.offWhite,
  },
  usernameAndContentFirst: {},
  contentFirst: {
    margin: "0",
    color: theme.offWhite,
    marginLeft: "4px",
    // marginTop: "7px",
  },
  username: {
    marginLeft: "4px",
    color: theme.offWhite,
    fontSize: "15px",
  },
  date: {
    margin: "0",
    marginLeft: "14px",
    color: theme.darkGray,
    fontSize: "12px",
  },
  channelChatForm: {
    backgroundColor: "#4a51577c",
    display: "flex",
    alignItems: "center",
    borderRadius: "7px",
    height: "40px",
    width: "calc(100% - 48px)",
    marginLeft: "48px",
  },
  channelChatFormFirst: {
    backgroundColor: "#4a51577c",
    display: "flex",
    alignItems: "center",
    borderRadius: "7px",

    width: "calc(100% - 48px)",
  },
  loadingIconEdit: {
    width: "30px",
    height: "24px",
    color: "white",
    marginLeft: "60px",
    objectFit: "cover",
    color: theme.offWhite,
  },
  loadingIconEditFirst: {
    width: "30px",
    height: "24px",
    color: "white",
    objectFit: "cover",
    color: theme.offWhite,
  },
  messageContentDivFirst: {
    display: "flex",
    width: "100%",
    // height: "20px",
    alignItems: "center",
    marginTop: "6px",
  },
  messageContentDiv: {
    display: "flex",
    width: "100%",
    height: "20px",
    alignItems: "center",
    margin: "4px 0",
  },
  editedMessage: {
    color: theme.darkGray,
    marginLeft: "4px",
    fontSize: "11px",
  },
}));

const ChannelMessage = ({
  setMessageEditId,
  message,
  socket,
  ind,
  messageEditId,
  currentChannelMessages,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  const users = useSelector((state) => state.users);
  const messageUser = users[message.owner_id];
  const sessionUser = useSelector((state) => state.session.user);

  const [showEdit, setShowEdit] = useState(false);
  const [content, setContent] = useState(message.content);
  const [errors, setErrorsEdit] = useState({});
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState(false);
  const { pathname } = useLocation();
  // const [messageEditId, setMessageEditId] = useState(null);
  const servers = useSelector((state) => state.servers);

  const [value, setValue] = useState("");

  const textAreaRef = useRef(null);

  const updateHeight = () => {
    const element = textAreaRef.current;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  const handleEditModal = () => {
    setShowEdit(true);
    setContent(message.content);
    setMessageEditId(message.id);
  };

  const editInputSubmit = async (e) => {
    // channel_id, content, edited, owner_id, id
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

      // setShowEdit(false);
      setContent(message.content);

      if (content.length > 1000) {
        setContent(content);
      }
      if (content.length === 0) {
        setDeleteModal(true);
      }
      return;
    } else {
      await setShowEdit(false);
      await socket.emit("chat");
      await setErrorsEdit({});
    }
  };

  const handleCancel = () => {
    setShowEdit(false);
    setErrorsEdit({});
    // setMessageEditId(message.id);
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
              <div>


                <div className="message-edit-container">
                  {errors && errors.content && (
                    <div className="error-msg-message-message">
                      <p>*{errors.content}*</p>
                    </div>
                  )}

                  {/* <div className="message-edit-input-container">
                      <div
                      role='textbox'
                        ref={textAreaRef}
                        className="message-content-edit"
                        value={content}
                        onChange={(e) => {
                          setContent(e.target.value);

                        }}
                      >
                        {content}
                      </div>
                    </div> */}

                  <SlateTextEditor
                    {...{ setShowEdit }}
                    editMessage={true}
                    sendChat={editInputSubmit}
                    chatInput={content}
                    setChatInput={setContent}
                  />


                </div>
                <p id="message-edit-instructions">
                    Press
                    <button type="button" onClick={handleCancel}>
                      <i className="fa-solid fa-xmark fa-xl"></i>
                    </button>
                    to cancel. Press enter to submit.
                  </p>
              </div>
              </>
            ) : (
              <div className="message-content-edited">
                {/* Displays regular message unless theres a link present in the message */}

                {checkIfIncludes(message.content) !== -1 ? (
                  <>
                    <LinkDisplay {...{ message }} />
                    {message.edited && <p id="message-edited">(edited)</p>}
                  </>
                ) : (
                  <div style={{display: 'flex', alignItems: 'end'}}>
                    <p id="message-actual-content">{`${message?.content}`}</p>
                    {message.edited && <p id="message-edited">(edited)</p>}
                  </div>
                )}
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
