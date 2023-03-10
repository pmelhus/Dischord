import { useSelector, useDispatch } from "react-redux";
import { createUseStyles, useTheme } from "react-jss";
import {useEffect} from "react"
import ServerInviteMessage from "./ServerInviteMessage.js";
import {genOneServer} from "../../../../../store/server"

const useStyles = createUseStyles((theme) => ({
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
  },

  content: {
    margin: "0",
    marginLeft: "56px",
    marginBottom: "14px",
    color: theme.offWhite,
  },
  usernameAndContentFirst: {},
  contentFirst: {
    margin: "0",
    color: theme.offWhite,
    marginLeft: "4px",
    marginTop: "7px",
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
}));
const DirectMessage = ({ currInbox, message, socket, ind, inboxDms }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  // grabs all users
  const users = useSelector((state) => state.users);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch()

  const messageUser = users[message.owner_id];

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
    )} at ${new Date(message.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

const determineIfServerMember = (id) => {
  let isMember = false
  sessionUser.memberships?.forEach((server) => {
    if (server.id === id) {
      isMember = true
    }
  });
  return isMember
}

  useEffect(()=> {
    if (message.server_invite === true && !determineIfServerMember(message.server_invite_id)) {

      dispatch(genOneServer(message.server_invite_id))
    }
  }, [message])

  return (
    <>
      <div className={classes.messageDiv}>
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
                        <p className={classes.contentFirst}>
                          {message.content}
                        </p>
                      </>
                    ) : (
                      <>
                        <ServerInviteMessage {...{socket}} {...{ message }} />
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
                  <p className={classes.content}>{message.content}</p>
                </>
              ) : (
                <>
                  <ServerInviteMessage needsPadding = {true} {...{socket}} {...{ message }} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DirectMessage;
