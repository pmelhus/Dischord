import { createUseStyles, useTheme } from "react-jss";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = createUseStyles((theme) => ({
  heading: {
    color: theme.textGray,
    fontSize: '12px',
    fontWeight: '550',
    margin: '16px 20px 8px 30px'
  },
  container: {
  },
  pendingList: {

  }
}));

const PendingRequests = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <p>{`PENDING - `}</p>
      </div>
      <div className={classes.pendingList}></div>
    </div>
  );
};

export default PendingRequests;
