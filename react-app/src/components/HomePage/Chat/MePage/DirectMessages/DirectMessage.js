import { useSelector, useDispatch } from "react-redux";
import { createUseStyles, useTheme } from "react-jss";

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

  const users = useSelector((state) => state.users);
  const sessionUser = useSelector((state) => state.session.user);

  const messageUser = users[message.owner_id];

  const checkAdjacentMessages = (message, inboxDms, ind) => {
    if (!inboxDms[ind - 1]) return true;
    const previousMessage = inboxDms[ind - 1];
    if (
      previousMessage?.owner_id &&
      previousMessage?.owner_id !== message?.owner_id
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
    return `${new Date(message.created_at).toLocaleDateString(undefined, options)} at ${new Date(message.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
  };

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
                    <p className={classes.contentFirst}>{message.content}</p>
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
            <p className={classes.content}>{message.content}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DirectMessage;
