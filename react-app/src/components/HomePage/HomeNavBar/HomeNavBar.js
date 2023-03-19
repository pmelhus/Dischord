import HomeButton from "./HomeButton";
import ServerList from "./ServerList";
import AddServerButton from "./AddServerButton/AddServerButton";
import ExploreServersButton from "./ExploreServersButton";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  editButton: {
    position: "relative",
    padding: "2px",

    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": { backgroundColor: theme.channelListGray },
    cursor: "pointer",
  },
  buttonNameContainer: {
    // backgroundColor: theme.darkMenuBackground,
    color: theme.offWhite,
  },
  tooltipText: {
    fontSize: "13px",
    padding: "1px",
  },
  homeButton: {
    padding: "4px 0",
    paddingBottom: "10px",
    marginBottom: "6px",
    marginTop: "32px",
    borderBottom: ".2px solid rgba(128, 128, 128, 0.38)",
    width: "48px",
  },
}));

const HomeNavBar = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const popperConfig = {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 12], // set margin-top to 10px
        },
      },
    ],
  };

  const homeTooltip = (
    <Tooltip placement="right" id="tooltip-top">
      <div className={classes.buttonNameContainer}>
        <div className={classes.tooltipText}>Direct Messages</div>
      </div>
    </Tooltip>
  );

  const addServerTooltip = (
    <Tooltip placement="right" id="tooltip-top">
      <div className={classes.buttonNameContainer}>
        <div className={classes.tooltipText}>Add a Server</div>
      </div>
    </Tooltip>
  );

  return (
    <>
      <nav className="home-nav-bar">
        <ul>
          <OverlayTrigger
            trigger={["focus", "hover"]}
            placement="right"
            overlay={homeTooltip}
            popperConfig={popperConfig}
            // onHide={() => setEditButtons(false)}
          >
            <div className={classes.homeButton}>
              <HomeButton />
            </div>
          </OverlayTrigger>
          <div className="home-nav-bar-item">
            <ServerList />
          </div>
          <OverlayTrigger
            trigger={["focus", "hover"]}
            placement="right"
            overlay={addServerTooltip}
            popperConfig={popperConfig}
            // onHide={() => setEditButtons(false)}
          >
          <div className="home-nav-bar-item">
            <AddServerButton />
          </div>
          </OverlayTrigger>
          <div className="home-nav-bar-item">
            <ExploreServersButton />
          </div>
        </ul>
      </nav>
    </>
  );
};

export default HomeNavBar;
