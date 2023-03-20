import { createUseStyles, useTheme } from "react-jss";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFriendRequest } from "./../../../../../store/friend";

const useStyles = createUseStyles((theme) => ({
  addFriendHeader: {
    color: theme.offWhite,
    padding: "20px 30px",
  },
  inputButDiv: {
    display: "flex",
    // justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "16px",
    // width: "1000px",
    backgroundColor: theme.darkInputBackground,
    padding: "0 12px",
    borderRadius: "8px",
    border: `1px solid ${theme.darkInputBackground}`,
  },
  inputButDivWithBorder: {
    display: "flex",
    // justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "16px",
    // width: "1000px",
    backgroundColor: theme.darkInputBackground,
    padding: "0 12px",
    borderRadius: "8px",
    border: "1px solid rgb(100, 56, 73)",
  },
  inputField: {
    height: "40px",
    backgroundColor: "unset",
    border: "none",
    outline: "0",
    fontSize: "16px",
    fontWeight: "500",
    width: "100%",
    borderRadius: "3px",
    // padding: '0 4px'
    color: theme.textGray,
  },
  inputWrapper: {
    backgroundColor: "transparent",
    border: "none",
    padding: "4px 0",
    width: "100%",
    flex: "1 1 auto",
  },
  buttonField: {
    backgroundColor: theme.buttonPink,
    minWidth: "auto",
    minHeight: "32px",
    display: "flex",
    alignItems: "center",
  },
  buttonDiv: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: "14px",
    color: theme.textGray,
    padding: "0 6px",
  },
  errors: {
    color: "red",
    marginTop: "6px",
    fontSize: "15px",
    paddingLeft: "1px",
  },
  success: {
    color: theme.friendGreen,
    paddingLeft: "1px",
    fontSize: "15px",
    marginTop: "6px",
  },
}));

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, setFocus, focus) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setFocus(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const AddFriendInput = () => {
  // theme and classes for styling
  const [focus, setFocus] = useState(false);
  const theme = useTheme();
  const classes = useStyles({ theme, focus });
  // state for whether input is focused or not

  // wrapper for outside click alert
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setFocus, focus);

  // update username input field to state

  const [username, setUsername] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  // dispatch username input and current user id to store

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  // set errors state for error handling
  const [errors, setErrors] = useState({});

  // set success state for success message
  const [success, setSuccess] = useState(false);

  // set input field to empty string
  const emptyInput = () => {
    wrapperRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    const payload = { self_id: sessionUser.id, friend_username: username };
    e.preventDefault();
    const sentRequest = await dispatch(createFriendRequest(payload));
    if (sentRequest && sentRequest.errors) {
      await setErrors(sentRequest.errors);
      return;
    }
    await setSuccess(true);
    await setErrors({});
    await emptyInput();
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={classes.addFriendHeader}>
          <h4 style={{ marginBottom: "8px" }}>ADD FRIEND</h4>
          <p style={{ color: theme.textGray, fontSize: "12px" }}>
            You can add a friend with their Dishord Tag. It's cAsE sEnSitivE!
          </p>
          <div
            className={
              focus ? classes.inputButDivWithBorder : classes.inputButDiv
            }
          >
            <div className={classes.inputWrapper}>
              <input
                ref={wrapperRef}
                onChange={handleUsername}
                onFocus={() => setFocus(true)}
                className={classes.inputField}
                placeholder="Enter a Username"
              />
            </div>
            <button type="submit" className={classes.buttonField}>
              <div className={classes.buttonDiv}>Send Friend Request</div>
            </button>
          </div>
          {errors && (
            <div className={classes.errors}>
              <p>{errors.friend_username}</p>
            </div>
          )}
          {success && (
            <div className={classes.success}>
              <p style={{display: 'inline'}}>
                {`Success! Your friend request to`} <p style={{fontWeight: 'bold', display: 'inline'}}>{username}</p>
                {` was sent.`}
              </p>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default AddFriendInput;
