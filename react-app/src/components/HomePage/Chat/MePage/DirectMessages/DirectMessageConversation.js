import DirectMessagesList from "./DirectMessagesList";
import SlateTextEditor from "../../SlateTextEditor";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  slateEditor: {
    backgroundColor: "#4a51577c",
    margin: '4px 14px',
    borderRadius: '10px'
  },
  container: {
    backgroundColor: "#36393f",
    width: "100%",
    height: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    minHeight: 'calc(100% - 60px)'

  },
  messages: {
    width: '100%',
    height: 'calc(100% - 120px)'
  }

}));

const DirectMessageConversation = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);

  const { pathname } = useLocation();

  const [chatInput, setChatInput] = useState("");

  const sendChat = () => {};

  return (
    <div className={classes.container}>
      <div className={classes.messages}>

      <DirectMessagesList />
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
