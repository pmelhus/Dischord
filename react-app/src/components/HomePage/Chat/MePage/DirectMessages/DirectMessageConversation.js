import DirectMessage from "./DirectMessage";
import SlateTextEditor from "../../SlateTextEditor";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import { createDirectMessage } from "../../../../../store/directMessage";
import FadeIn from "react-fade-in";
import {
  removeFriendship,
  createFriendRequest,
  loadAllRequests,
} from "../../../../../store/friend";

const useStyles = createUseStyles((theme) => ({
  slateEditor: {
    backgroundColor: "#4a51577c",
    margin: "8px 14px",
    borderRadius: "10px",
  },
  container: {
    backgroundColor: "#36393f",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",

    height: "calc(100% - 15px)",
    maxHeight: "calc(100% - 55px)",
  },
  messages: {
    width: "100%",
    height: "100%",
    display: "flex",
    overflowY: "scroll",
    overflowX: "hidden",
    flexDirection: "column",
    scrollbarWidth: "none",
    marginTop: "14px",
  },
  originAvatar: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "100%",
  },
  originDiv: {
    margin: "16px",
  },
  originHeading: {
    margin: "8px 0",
    color: theme.offWhite,
  },
  originText: {
    color: theme.textGray,
    display: "inline",
  },
  usernameText: {
    fontWeight: "bold",
    color: theme.textGray,
    display: "inline",
  },
  buttonContainer: {
    marginTop: "16px",
  },
  directMessagesContainer: {
    position: "relative",
    flexShrink: "0",
    minHeight: "20px",
    height: "fit-content",
    flexBasis: "auto",
    width: "100%",
  },
  removeButton: {
    padding: "2px 16px",
    backgroundColor: theme.buttonGray,
    height: "26px",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: theme.offWhite,
    border: "none",
    fontWeight: "500",
    background: "none",
    borderRadius: "3px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.darkGray,
    },
  },
  requestSentButton: {
    padding: "2px 16px",
    backgroundColor: theme.redThemeGrayed,
    height: "26px",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: theme.textGray,
    border: "none",
    fontWeight: "500",
    background: "none",
    borderRadius: "3px",
    cursor: "not-allowed",
  },
  addButton: {
    padding: "2px 16px",
    backgroundColor: theme.redTheme,
    height: "26px",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: theme.offWhite,
    border: "none",
    fontWeight: "500",
    background: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
}));

const DirectMessageConversation = ({
  setRequestLoaded,
  requestLoaded,
  setUpdateRequests,
  socket,
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);

  const { pathname } = useLocation();

  const [chatInput, setChatInput] = useState("");

  const uuid = pathname.split("/")[3];

  const inboxes = useSelector((state) => Object.values(state.inboxes));

  const currInbox = inboxes.find((inbox) => inbox.uuid === uuid);

  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);

  const bottomRef = useRef(null);

  const sendChat = async () => {
    const sentMessage = await dispatch(
      createDirectMessage({
        user_id: sessionUser.id,
        msg: chatInput,
        inbox_id: currInbox?.id,
      })
    );
    if (sentMessage && sentMessage.errors) {
      await setErrors(sentMessage.errors);
      return;
    }
    // console.log(sentMessage, "SENT MESSAGE");
    await socket?.emit("dmChat", sentMessage.owner_id, currInbox?.id);
    await setIsSent(true);
    // await socket?.emit("timeout_user");
    // await setErrors({})
    // clear the input field after the message is sent
    await setErrors({});
    await setChatInput("");
  };

  const directMessages = useSelector((state) =>
    Object.values(state.directMessages)
  );
  const inboxDms = directMessages.filter(
    (message) => message.inbox_id === currInbox?.id
  );

  // function to determine who is who in inbox

  const determineId = () => {
    let friendId = null;
    currInbox?.inbox_members.forEach((id) => {
      if (id !== sessionUser.id) {
        friendId = id;
      }
    });
    return friendId;
  };
  const otherUser = users[determineId()];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [pathname, inboxDms]);

  const myFriendships = useSelector((state) =>
    Object?.values(state.friends.friendships)
  );
  const currFriendship = myFriendships.find(
    (friendship) =>
      friendship.self_id === otherUser.id ||
      friendship.friend_id === otherUser.id
  );

  const handleDeleteFriendship = async () => {
    const deletedFriendship = await dispatch(
      removeFriendship(currFriendship.id)
    );
    if (deletedFriendship && deletedFriendship.errors) {
      await setErrors(deletedFriendship.errors);
      return;
    }
    await setErrors({});
  };

  const requests = useSelector((state) =>
    Object.values(state?.friends?.requests)
  );

  const handleFriendAdd = async (e) => {
    const payload = {
      self_id: sessionUser.id,
      friend_username: otherUser.username,
    };
    e.preventDefault();
    const sentRequest = await dispatch(createFriendRequest(payload));
    console.log(sentRequest);
    if (sentRequest && sentRequest.errors) {
      await setErrors(sentRequest.errors);
      return;
    }
    await setErrors({});
    await dispatch(loadAllRequests(sessionUser.id))
    // await setUpdateRequests(true)
  };

  const matchingRequest = requests.find(
    (request) =>
      (request.friend_id === sessionUser.id ||
        request.self_id === sessionUser.id) &&
      (request.friend_id === otherUser.id || request.self_id === otherUser.id)
  );

  return (
    <div className={classes.container}>
      <div className={classes.messages}>
        <div className={classes.originDiv}>
          <img
            className={classes.originAvatar}
            src={otherUser?.image_url}
          ></img>
          <h1 className={classes.originHeading}>{otherUser?.username}</h1>
          <div>
            <p className={classes.originText}>
              This is the beginning of your direct message history with{" "}
            </p>
            <p className={classes.usernameText}>@{otherUser?.username}</p>
            <div className={classes.buttonContainer}>
              {currFriendship && (
                <button
                  onClick={handleDeleteFriendship}
                  className={classes.removeButton}
                >
                  <div>Remove Friend</div>
                </button>
              )}
            {!currFriendship && !matchingRequest && (
                    <button
                    onClick={handleFriendAdd}
                    className={classes.addButton}
                  >
                    <div>Add Friend</div>
                  </button>
                )}

              {matchingRequest && (
                <button
                  onClick={handleDeleteFriendship}
                  className={classes.requestSentButton}
                >
                  <div>Friend Request Sent</div>
                </button>
              )}
            </div>
          </div>
        </div>
        {inboxDms.map((message, ind) => (
          <FadeIn>
            <div key={ind} className={classes.directMessagesContainer}>
              <DirectMessage
                {...{ socket }}
                {...{ message }}
                {...{ ind }}
                {...{ chatInput }}
                {...{ currInbox }}
                {...{ inboxDms }}
              />
            </div>
          </FadeIn>
        ))}
        <div style={{ height: "1px" }} ref={bottomRef}></div>
      </div>
      <div className={classes.slateEditor}>
        <SlateTextEditor
          {...{ sendChat }}
          placeholder={`Message `}
          {...{ chatInput }}
          {...{ setChatInput }}
        />
      </div>
    </div>
  );
};
export default DirectMessageConversation;
