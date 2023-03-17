import { createUseStyles, useTheme } from "react-jss";
import { useState, useEffect } from "react";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import EllipsesDropdown from "./EllipsesDropdown";
import Tooltip from "react-bootstrap/Tooltip";

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
  editButtonSelected: {
    position: "relative",
    padding: "2px",
    backgroundColor: theme.channelListGray,
    width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    cursor: "pointer",
  },
  buttonNameContainer: {
    backgroundColor: theme.darkMenuBackground,
    color: theme.offWhite,
  },
  tooltipText: {
    fontSize: '11px'
  }

}));

const EllipsesEditButton = ({ setDeleteConfirm, setEditButtons, message }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [ellipsesModal, setEllipsesModal] = useState(false);

  const [showTooltip, setShowTooltip] = useState(false);

  const popover = (
    <Popover placement="left-start" id="popover-basic">
      <EllipsesDropdown {...{ setDeleteConfirm }} />
    </Popover>
  );

  const tooltip = (
    <Tooltip placement="top" id="tooltip-top">
      <div className={classes.buttonNameContainer}>
        <div className={classes.tooltipText}>More</div>
      </div>
    </Tooltip>
  );

  const handleClick = () => {
    setShowTooltip(false);
    setEllipsesModal(!ellipsesModal);
  };

  const handleTooltip = () => {
    if (!ellipsesModal) {
      setShowTooltip(!showTooltip);
    } else {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    if (ellipsesModal) {
      setShowTooltip(false);
    }
  }, [ellipsesModal]);


  const popperConfig = {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 6], // set margin-top to 10px
        },
      },
    ],
  }
  
  return (
    <>
      <OverlayTrigger
        trigger={["focus", "hover"]}
        placement="top"
        overlay={tooltip}
        onToggle={handleTooltip}
        onHide={() => setEditButtons(false)}
        show={showTooltip}
        onMouseEnter={() => setShowTooltip(false)}
        popperConfig={popperConfig}
      >
        <div>
          <OverlayTrigger
            rootClose={ellipsesModal}
            trigger={"click"}
            placement="left-start"
            overlay={popover}
            onToggle={handleClick}
            onHide={() => setShowTooltip(false)}
            show={ellipsesModal}
          >
            <div
              className={
                ellipsesModal ? classes.editButtonSelected : classes.editButton
              }
            >
              <i
                style={{ color: `${theme.offWhite}` }}
                className="fa-sm fa-regular fa-ellipsis"
              ></i>
            </div>
          </OverlayTrigger>
        </div>
      </OverlayTrigger>
    </>
  );
};

export default EllipsesEditButton;
