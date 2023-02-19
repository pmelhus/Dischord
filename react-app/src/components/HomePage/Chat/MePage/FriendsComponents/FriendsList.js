import { useDispatch, useSelector } from "react-redux";
import { createUseStyles, useTheme } from "react-jss";
import { loadAllFriends } from "../../../../../store/friend";
import {
  createInbox,
  addInboxMembers,
  getOneInbox,
} from "../../../../../store/inbox";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const useStyles = createUseStyles((theme) => ({
  avatar: {
    width: "40px",
    height: "40px",
    objectFit: "cover",
    borderRadius: "100%",
  },
  heading: {
    color: theme.textGray,
    fontSize: "12px",
    fontWeight: "550",
    margin: "16px 20px 8px 30px",
  },
  container: {},
  pendingOutgoingList: {},
  avatar: {
    width: "32px",
    height: "32px",
    objectFit: "cover",
    borderRadius: "100%",
  },
  divider: {
    width: "96%",
    height: "1px",
    // margin: "0 8px",
    backgroundColor: theme.textGrayTrans,
    marginLeft: "30px",
    marginRight: "20px",
  },
  outgoingCard: {
    marginLeft: "30px",
    marginRight: "20px",
    display: "flex",
    alignItems: "center",
    padding: "10px 0",
    paddingRight: "25px",
    justifyContent: "space-between",
  },
  imageAndText: {
    display: "flex",
    alignItems: "center",
  },
  cancelRequest: {
    cursor: "pointer",
    marginLeft: "5px",
    "&:hover": { backgroundColor: "darkred", borderRadius: "100%" },
  },
  acceptRequest: {
    cursor: "pointer",
    "&:hover": { backgroundColor: "darkgreen", borderRadius: "100%" },
  },
  messageFriend: {
    color: theme.textGray,
    backgroundColor: theme.darkInputBackground,
    cursor: "pointer",
    borderRadius: "100%",
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const FriendsList = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const dispatch = useDispatch();
  const friendsList = useSelector((state) =>
    Object.values(state.friends.friendships)
  );
  const users = useSelector((state) => state.users);
  const sessionUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState({});

  // function to determine whether user is friend_id or self_id

  const determineId = (friend) => {
    if (sessionUser.id === friend.friend_id) {
      return friend.self_id;
    }
    if (sessionUser.id === friend.self_id) {
      return friend.friend_id;
    }
  };

  const history = useHistory();
  // function that pushes new url to direct messages of friend if there is an existing inbox
  // if there isnt an existing inbox, then a new inbox is created and then user gets pushed to the new inbox url

  const handleDmChat = async (friend) => {
    const { self_id, friend_id } = friend;

    const payload = { self_id, friend_id };

    const existingInbox = await dispatch(getOneInbox(payload));
    console.log(existingInbox)
    if (existingInbox.errors) {
      const createdInbox = await dispatch(createInbox(payload));

      if (createdInbox && createdInbox.errors) {
        await setErrors(createdInbox.errors);
      }
      // console.log(createdInbox.inbox.id)
      const inbox_id = createdInbox.inbox.id;
      const memberPayload = { self_id, friend_id, inbox_id };
      const addedInboxMembers = await dispatch(addInboxMembers(memberPayload));
      history.push(`/channels/@me/${createdInbox.uuid}`);
    }
    history.push(`/channels/@me/${existingInbox.uuid}`);
  };

  return (
    <>
      <div className={classes.heading}>
        <h4
          style={{ fontSize: "12px" }}
        >{`ALL FRIENDS - ${friendsList.length}`}</h4>
      </div>
      {friendsList.length &&
        friendsList.map((friend) => {
          const currFriend = users[determineId(friend)];
          return (
            <>
              <div key={friend.id} className={classes.divider}></div>
              <div className={classes.outgoingCard}>
                <div className={classes.imageAndText}>
                  <div>
                    <img
                      className={classes.avatar}
                      src={currFriend?.image_url}
                    ></img>
                  </div>
                  <div style={{ paddingLeft: "10px" }}>
                    <div>
                      <h3 style={{ color: theme.offWhite }}>
                        {currFriend?.username}
                      </h3>
                      {/* <p style={{ fontSize: "11px", color: theme.textGray }}>
                        Incoming Friend Request
                      </p> */}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div
                    onClick={() => handleDmChat(friend)}
                    className={classes.messageFriend}
                  >
                    <i className="fa-solid fa-message"></i>
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
};

export default FriendsList;
