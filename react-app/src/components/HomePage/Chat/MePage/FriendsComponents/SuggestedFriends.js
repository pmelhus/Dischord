import { createUseStyles, useTheme } from "react-jss";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { loadAllFriends } from "../../../../../store/friend";

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
    cursor: "pointer",
    "&:hover": { backgroundColor: "darkgreen", borderRadius: "100%" },
  },
}));

const SuggestedFriends = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const dispatch = useDispatch();

  const mutualUsers = useSelector((state) => state.friends.recommended);


  return (
    <>
      <div className={classes.container}>
        <div className={classes.heading}>
          <p>{`SUGGESTIONS - ${mutualUsers?.length}`}</p>
        </div>
        <div className={classes.pendingOutgoingList}>
          {mutualUsers?.map((user) => {

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
                        <p style={{ fontSize: "11px", color: theme.textGray }}>
                          Friends with
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div style={{ display: "flex" }}>
                    <div onClick={() => handleAccept(request)}className={classes.acceptRequest}>
                      <i className="fa-solid fa-2xl fa-circle-check"></i>
                    </div>
                    <div
                      className={classes.cancelRequest}
                      onClick={() => handleDelete(request.id)}
                    >
                      <i className="fa-solid fa-2xl fa-circle-xmark"></i>
                    </div>
                  </div> */}
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
