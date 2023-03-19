import { createUseStyles, useTheme } from "react-jss";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import {
  loadAllFriends,
  createFriendRequest,
  loadAllRequests,
} from "../../../../../store/friend";

const useStyles = createUseStyles((theme) => ({
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
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.textGray,
    cursor: "pointer",
    borderRadius: "100%",
    backgroundColor: theme.darkInputBackground,
    "&:hover": { backgroundColor: "darkgreen", borderRadius: "100%" },
  },
}));

const SuggestedFriends = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // grabs state of the most frequent mutual friends of friends of session user
  const mutualUsers = useSelector((state) => state.friends.recommended);

  // grabs from redux the mutual friends of the friends of session user
  const mutualFriendships = useSelector((state) =>
    Object.values(state.friends.mutualFriends)
  );
  const allUsers = useSelector((state) => state.users);

  const sessionUser = useSelector((state) => state.session.user);


  // finds associated friendships with the displayed user and session user
  const findAssociatedFriendships = (id) => {
    return mutualFriendships?.filter((friendship) => {
      return friendship.self_id == id || friendship.friend_id == id;
    });
  };

  const requests = useSelector((state) =>
    Object.values(state.friends.requests)
  );

  //  checks if there are existing requests between displayed user and session user

  const checkRequests = (user) => {
  const existingRequests =  requests.filter((request) => {
      return( request.friend_id === user.id && request.self_id === sessionUser.id ) || (request.self_id === user.id && request.friend_id === sessionUser.id);
    });
    return existingRequests
  };


  // submits friend request
  const handleSubmit = async (e, user) => {
    const payload = { self_id: sessionUser.id, friend_username: user.username };
    e.preventDefault();
    const sentRequest = await dispatch(createFriendRequest(payload));

    if (sentRequest && sentRequest.errors) {
      await setErrors(sentRequest.errors);
      return;
    }
    await dispatch(loadAllRequests(sessionUser.id));
    await setSuccess(user.id);
    await setErrors({});
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.heading}>
          <p>{`SUGGESTIONS - ${mutualUsers?.length}`}</p>
        </div>
        <div className={classes.pendingOutgoingList}>
          {mutualUsers?.map((user) => {
            const associatedFriends = findAssociatedFriendships(user.id);

            return (
              <>
                <div key={user.id} className={classes.divider}></div>
                <div className={classes.outgoingCard}>
                  <div className={classes.imageAndText}>
                    <div>
                      <img
                        className={classes.avatar}
                        src={user.image_url}
                      ></img>
                    </div>
                    <div style={{ paddingLeft: "10px" }}>
                      <div>
                        <h3 style={{ color: theme.offWhite }}>
                          {user.username}
                        </h3>
                        <div>
                          <p
                            style={{
                              fontSize: "11px",
                              color: theme.textGray,
                              display: "inline",
                            }}
                          >
                            Friends with{" "}
                          </p>
                          {associatedFriends.map((friendship, ind) => {
                            const mutualFriend = (friendship) => {
                              if (friendship.friend_id === user.id) {
                                return friendship.self_id;
                              }
                              if (friendship.self_id === user.id) {
                                return friendship.friend_id;
                              }
                            };
                            return (
                              <p
                                style={{
                                  fontSize: "11px",
                                  color: theme.offWhite,
                                  display: "inline",
                                }}
                                key={ind}
                              >
                                {allUsers[mutualFriend(friendship)].username}
                                {ind !== associatedFriends.length - 1 && ", "}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    {success === user.id && (
                      <p style={{ color: theme.friendGreen, margin: '0' }}>
                        Friend request sent!
                      </p>
                    )}

                    {checkRequests(user).length ? (
                      <></>
                    ) : (
                      <div
                        onClick={(e) => handleSubmit(e, user)}
                        className={classes.acceptRequest}
                      >
                        <i className="fa-sharp fa-regular fa-user-plus"></i>
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SuggestedFriends;
