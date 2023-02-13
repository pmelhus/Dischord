import { createUseStyles, useTheme } from "react-jss";
import { useState, useRef, useEffect} from "react"

const useStyles = createUseStyles((theme, focus) => ({

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
    padding: '0 12px',
    borderRadius: '8px',
    border: `1px solid ${theme.darkInputBackground}`,

  },
  inputButDivWithBorder: {
    display: "flex",
    // justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "16px",
    // width: "1000px",
    backgroundColor: theme.darkInputBackground,
    padding: '0 12px',
    borderRadius: '8px',
    border: '1px solid rgb(100, 56, 73)'
  },
  inputField: {
    height: "40px",
    backgroundColor: 'unset',
    border: 'none',
    outline: '0',
    fontSize: "16px",
    fontWeight: "500",
    width: '100%',
    borderRadius: '3px',
    // padding: '0 4px'
    color: theme.textGray
  },
  inputWrapper: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '4px 0',
    width: '100%',
    flex: "1 1 auto",
  },
  buttonField: {
    backgroundColor: theme.buttonPink,
    minWidth: 'auto',
    minHeight: '32px',
    display: 'flex',
    alignItems: 'center'

  },
  buttonDiv: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontSize: '14px',
    color: theme.textGray,
    padding: '0 6px'
  }
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
        setFocus(false)
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
const [focus, setFocus] = useState(false)
  const theme = useTheme();
  const classes = useStyles({ theme, focus });
// state for whether input is focused or not


// wrapper for outside click alert
const wrapperRef = useRef(null)
useOutsideAlerter(wrapperRef, setFocus, focus)

console.log(focus)
  return (
    <>
      <form>
        <div className={classes.addFriendHeader}>
          <h4 style={{ marginBottom: "8px" }}>ADD FRIEND</h4>
          <p style={{ color: theme.textGray, fontSize: "12px" }}>
            You can add a friend with their Dishord Tag. It's cAsE sEnSitivE!
          </p>
          <div className={focus ? classes.inputButDivWithBorder : classes.inputButDiv}>
            <div className={classes.inputWrapper}>

            <input ref={wrapperRef} onFocus={() => setFocus(true)} className={classes.inputField} placeholder="Enter a Username" />
            </div>
            <button type="submit" className={classes.buttonField}>
              <div className={classes.buttonDiv}>
              Send Friend Request
              </div>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddFriendInput;
