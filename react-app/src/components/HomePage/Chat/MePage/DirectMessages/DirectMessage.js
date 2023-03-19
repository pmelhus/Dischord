import { useSelector, useDispatch } from "react-redux";
import { createUseStyles, useTheme } from "react-jss";
import { useEffect, useState } from "react";
import ServerInviteMessage from "./ServerInviteMessage.js";
import { genOneServer } from "../../../../../store/server";
import DirectMessageEditButtons from "./DirectMessageEditButtons";
import SlateTextEditor from "../../SlateTextEditor";
import { editInboxMessage } from "../../../../../store/directMessage";
import loadingIcon from "../../../../../images/loadingIcon.gif";
import { Modal } from "../../../../../context/Modal";
import DeleteDmConfirm from "./DeleteDmConfirm";

const useStyles = createUseStyles((theme) => ({
  messageDiv: {
    "&:hover": {
      backgroundColor: theme.messageBackground,
    },
    marginRight: "4px",
  },
  userAvatar: {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "42px",
    height: "42px",
    objectFit: "cover",
    borderRadius: "100%",
    backgroundColor: "#950652",
    transition: "border-radius .5s",
    margin: "5px",
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
    height: "40px",
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
    height: "20px",
    alignItems: "center",
    marginTop: "9px",
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

const DirectMessage = ({
  setMessageId,
  messageId,
  currInbox,
  message,
  socket,
  ind,
  inboxDms,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  // grabs all users
  const users = useSelector((state) => state.users);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [editButtons, setEditButtons] = useState(false);
  const [inEllipses, setInEllipses] = useState(false);
  const [change, setChange] = useState(ind);

  const messageUser = users[message.owner_id];

  // state for editing messages (rendering message and slate text editor)
  const [showEditor, setShowEditor] = useState(false);

  // state for slateeditor chat input
  const [chatInput, setChatInput] = useState(message.content);

  // state for loading edited message

  const [editLoading, setEditLoading] = useState(false);

  // function sending edited message

  const [errors, setErrors] = useState({});

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const sendChat = async (e) => {
    await setEditLoading(true);
    const payload = {
      inbox_id: message.inbox_id,
      content: chatInput,
      edited: true,
      owner_id: message.owner_id,
      id: message.id,
    };
    const editedMessage = await dispatch(editInboxMessage(payload));
    await setChatInput(editedMessage.content);
    if (editedMessage.errors) {
      setErrors(editedMessage.errors);

      // setShowEdit(false);
      setChatInput(message.content);

      if (chatInput.length > 1000) {
        setChatInput(chatInput);
      }

      return;
    } else {
      await setShowEditor(false);
      await socket.emit(
        "dmChat",
        editedMessage.owner_id,
        editedMessage.inbox_id
      );
      await setEditLoading(false);
      await setErrors({});
    }
  };

  const checkAdjacentMessages = (message, inboxDms, ind) => {
    const createdAtDate = new Date(message.created_at);

    if (!inboxDms[ind - 1]) return true;
    const previousMessage = inboxDms[ind - 1];
    const previousCreatedAt = new Date(previousMessage.created_at);

    if (
      previousMessage?.owner_id &&
      previousMessage?.owner_id !== message?.owner_id
    ) {
      return true;
    } else if ((createdAtDate - previousCreatedAt) / 1000 > 3600) {
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
    return `${new Date(message.created_at).toLocaleDateString(
      undefined,
      options
    )}`;
  };

  const determineIfServerMember = (id) => {
    let isMember = false;
    sessionUser.memberships?.forEach((server) => {
      if (server.id === id) {
        isMember = true;
      }
    });
    return isMember;
  };

  useEffect(() => {
    if (
      message.server_invite === true &&
      !determineIfServerMember(message.server_invite_id)
    ) {
      dispatch(genOneServer(message.server_invite_id));
    }
  }, [message]);

  useEffect(() => {
    if (inEllipses) {
      setEditButtons(true);
    } else {
      setEditButtons(false);
    }
  }, [inEllipses]);

  const handleMouseOver = () => {
    setEditButtons(true);
  };

  const handleMouseOut = () => {
    setEditButtons(false);
  };

  const escFunction = (e) => {
    if (e.key === "Escape") {
      setShowEditor(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  useEffect(() => {
    if (messageId !== message.id) {
      setShowEditor(false);
    }
  }, [messageId]);

  return (
    <>
      <div
        onMouseEnter={() => handleMouseOver()}
        onMouseLeave={() => handleMouseOut()}
        // onHover={(ind) => setChange(ind)}
        className={classes.messageDiv}
      >
        <div className={classes.imageAndUsername}>
          {messageUser?.image_url ? (
            <>
              {checkAdjacentMessages(message, inboxDms, ind) && (
                <div
                  style={{
                    marginTop: "14px",
                    display: "flex",
                  }}
                >
                  <img
                    src={messageUser.image_url}
                    className={classes.userAvatar}
                  ></img>

                  <div className={classes.usernameAndContentFirst}>
                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                      <h4 className={classes.username}>
                        {messageUser?.username}
                      </h4>
                      <p className={classes.date}>
                        {displayMessageDate(message)}
                      </p>
                    </div>
                    {!message.server_invite ? (
                      <>
                        {showEditor ? (
                          <>
                            <>
                              <form className={classes.channelChatFormFirst}>
                                <SlateTextEditor
                                  {...{ setShowEditor }}
                                  editMessage={true}
                                  {...{ sendChat }}
                                  {...{ chatInput }}
                                  {...{ setChatInput }}
                                />
                              </form>
                            </>
                          </>
                        ) : (
                          <div className={classes.messageContentDivFirst}>
                            <p className={classes.contentFirst}>
                              {message.content}
                            </p>
                            {message.edited && (
                              <p className={classes.editedMessage}>(edited)</p>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <ServerInviteMessage {...{ socket }} {...{ message }} />
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {checkAdjacentMessages(message, inboxDms, ind) && (
                <div>
                  <img className={classes.userAvatar}></img>
                  <h4>{messageUser?.username}</h4>
                </div>
              )}
            </>
          )}

          {!checkAdjacentMessages(message, inboxDms, ind) && (
            <>
              {!message.server_invite ? (
                <>
                  {showEditor ? (
                    <>
                      <>
                        <form className={classes.channelChatForm}>
                          <SlateTextEditor
                            {...{ setShowEditor }}
                            {...{ sendChat }}
                            editMessage={true}
                            {...{ chatInput }}
                            {...{ setChatInput }}
                          />
                        </form>
                      </>
                    </>
                  ) : (
                    <div className={classes.messageContentDiv}>
                      <p className={classes.content}>{message.content}</p>
                      {message.edited && (
                        <p className={classes.editedMessage}>(edited)</p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <ServerInviteMessage
                    needsPadding={true}
                    {...{ socket }}
                    {...{ message }}
                  />
                </>
              )}
            </>
          )}
        </div>
        {editButtons && (
          <DirectMessageEditButtons
            {...{ setMessageId }}
            {...{ messageId }}
            {...{ setDeleteConfirm }}
            {...{ setEditButtons }}
            {...{ socket }}
            {...{ message }}
            {...{ setShowEditor }}
          />
        )}
      </div>
      {deleteConfirm && (
        <Modal>
          <DeleteDmConfirm {...{socket}} {...{ message }} {...{ setDeleteConfirm }} />
        </Modal>
      )}
    </>
  );
};

export default DirectMessage;
