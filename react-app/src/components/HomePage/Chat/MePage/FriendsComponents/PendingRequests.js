import { createUseStyles, useTheme } from "react-jss";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { removeRequest, loadAllRequests, createFriendship } from "../../../../../store/friend";

// styling
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
    "&:hover": {backgroundColor: 'darkred', borderRadius:'100%'}
  },
  acceptRequest: {
    cursor: 'pointer',
    "&:hover": {backgroundColor: 'darkgreen', borderRadius:'100%'}
  }
}));

const PendingRequests = ({ loaded }) => {
  // styling variables for jss
  const theme = useTheme();
  const classes = useStyles({ theme });

  // selecting current store values

  const users = useSelector((state) => state.users);
  const sessionUser = useSelector((state) => state.session.user);

  const requests = useSelector((state) =>
    Object.values(state.friends.requests)
  );
  // filter requests based on user_id

  const outgoingRequests = requests?.filter(
    (request) => request?.self_id === sessionUser.id
  );

  const incomingRequests = requests?.filter(
    (request) => request?.friend_id === sessionUser.id
  );

  // errors
  const [errors, setErrors] = useState({});

  // deletes request
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const deletedRequest = await dispatch(removeRequest(id));
    if (deletedRequest && deletedRequest.errors) {
      await setErrors(deletedRequest.errors);
      return;
    }
    await dispatch(loadAllRequests(sessionUser.id));
  };

  // accepts a request

  const handleAccept = async(request) => {
    const friendship = await dispatch(createFriendship(request))
    if (friendship && friendship.errors) {
      await setErrors(friendship.errors);
      return;
    }
    await dispatch(removeRequest(request.id))
    await dispatch(loadAllRequests(sessionUser.id));
  }



  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <p>{`PENDING - ${
          outgoingRequests?.length + incomingRequests?.length
        }`}</p>
      </div>
      <div className={classes.pendingOutgoingList}>
        {incomingRequests?.map((request) => {
          const currUser = users[request.self_id];

          return (
            <>
              <div key={request.id} className={classes.divider}></div>
              <div className={classes.outgoingCard}>
                <div className={classes.imageAndText}>
                  <div>
                    <img
                      className={classes.avatar}
                      src={currUser.image_url}
                    ></img>
                  </div>
                  <div style={{ paddingLeft: "10px" }}>
                    <div>
                      <h3 style={{ color: theme.offWhite }}>
                        {currUser.username}
                      </h3>
                      <p style={{ fontSize: "11px", color: theme.textGray }}>
                        Incoming Friend Request
                      </p>
                    </div>
                  </div>

                </div>
                <div style={{ display: "flex" }}>
                    <div onClick={() => handleAccept(request)}className={classes.acceptRequest}>
                      <i className="fa-solid fa-2xl fa-circle-check"></i>
                    </div>
                    <div
                      className={classes.cancelRequest}
                      onClick={() => handleDelete(request.id)}
                    >
                      <i className="fa-solid fa-2xl fa-circle-xmark"></i>
                    </div>
                  </div>
              </div>
            </>
          );
        })}
      </div>
      <div className={classes.pendingOutgoingList}>
        {outgoingRequests?.map((request, index) => {
          // current user in outgoing request card
          const currUser = users[request.friend_id];

          return (
            <>
              <div key={index} className={classes.divider}></div>
              <div className={classes.outgoingCard}>
                <div className={classes.imageAndText}>
                  <div>
                    <img
                      className={classes.avatar}
                      src={currUser.image_url}
                    ></img>
                  </div>
                  <div style={{ paddingLeft: "10px" }}>
                    <div>
                      <h3 style={{ color: theme.offWhite }}>
                        {currUser.username}
                      </h3>
                      <p style={{ fontSize: "11px", color: theme.textGray }}>
                        Outgoing Friend Request
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={classes.cancelRequest}
                  onClick={() => handleDelete(request.id)}
                >
                  <i className="fa-solid fa-2xl fa-circle-xmark"></i>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default PendingRequests;
