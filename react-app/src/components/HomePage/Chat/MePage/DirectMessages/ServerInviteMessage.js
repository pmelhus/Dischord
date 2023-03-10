import { createUseStyles, useTheme } from "react-jss";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createServerMember } from "../../../../../store/server";
import { useState } from "react";

const useStyles = createUseStyles((theme, needsPadding) => ({
  serverInviteContainer: {
    maxWidth: "432px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.channelListGray,
    margin: "10px 2px",
    width: "400px",
  },
  serverInviteContainerWithPadding: {
    maxWidth: "432px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.channelListGray,
    margin: "10px 2px",
    width: "400px",
    marginLeft: "54px",
  },
  heading: {
    color: theme.textGray,
    fontSize: "12px",
    fontWeight: "10000",
  },
  serverInfo: {
    display: "flex",
    paddingTop: "10px",
    alignItems: "center",
  },
  serverImage: {
    height: "50px",
    width: "50px",
    borderRadius: "35%",
    objectFit: "cover",
  },
  nameAndChannel: {
    paddingLeft: "10px",
  },
  channel: {
    color: theme.textGray,
    fontWeight: "400",
    paddingTop: "5px",
  },
  server: {
    color: theme.offWhite,
    fontSize: "15px",
  },
  nameChannelButton: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  joinButton: {
    color: theme.offWhite,
    padding: "10px",
    backgroundColor: theme.friendGreen,
    width: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20px",
    cursor: "pointer",
    "&:hover": { backgroundColor: theme.hoverFriendGreen },
  },
}));

const ServerInviteMessage = ({ needsPadding, socket, message }) => {
  const theme = useTheme();
  const classes = useStyles({ theme, needsPadding });

  const sessionUser = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.servers);

  const history = useHistory();

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const server = useSelector((state) => state.servers)[
    message.server_invite_id
  ];
  const newServer = useSelector((state) => state.servers.requestedServer);


  const determineServer = () => {
    let returnServer = null;
    sessionUser.memberships.forEach((server) => {
      if (message.server_invite_id === server.id) {
        returnServer = server;
      }
    });
    if (returnServer === null) {
      return newServer;
    } else {
      return returnServer;
    }
  };


  const allChannels = useSelector((state) => state.channels);

  // determine whether receiving user in inbox is part of server already

  // get the receiving user in inbox
  const inboxMembers = message.inbox.inbox_members;



  const determineIfServerMember = (receivingId) => {
    let isMember = false;
    sessionUser.memberships.forEach((server) => {
      if (server.id === receivingId) {
        isMember = true;
      }
    });
    return isMember;
  };

  const handleJoin = async () => {
    if (determineIfServerMember(message.server_invite_id)) {
      history.push(`/channels/${determineServer().id}/${determineServer().channel_ids[0]}`);
    } else {
      const payload = {
        user_id: sessionUser.id,
        server_id: message.server_invite_id,
      };

      const serverMember = await dispatch(createServerMember(payload));
      await socket.emit("chat");
      if (serverMember.errors) {
        await setErrors(serverMember.errors);
        return;
      }
      await history.push(`/channels/${determineServer().id}/${determineServer().channel_ids[0]}`)
    }
  };

  return (
    <div
      className={
        needsPadding
          ? classes.serverInviteContainerWithPadding
          : classes.serverInviteContainer
      }
    >
      <h3 className={classes.heading}>YOU'VE BEEN INVITED TO JOIN A SERVER</h3>
      <div className={classes.serverInfo}>
        <img
          src={determineServer()?.image_url}
          className={classes.serverImage}
        ></img>
        <div className={classes.nameChannelButton}>
          <div className={classes.nameAndChannel}>
            <h4 className={classes.server}>{determineServer()?.name}</h4>

          </div>
          <div onClick={handleJoin} className={classes.joinButton}>
            {determineIfServerMember(message.server_invite_id) ? (
              <>
                <h4>Joined</h4>
              </>
            ) : (
              <>
                <h4>Join</h4>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerInviteMessage;
