import { createUseStyles, useTheme } from "react-jss";
import { useState } from "react";

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";


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
    backgroundColor: theme.darkMenuBackground,
    color: theme.offWhite
  },
  tooltipText: {
    fontSize: '11px',
    padding: '1px'
  }

}));

const EditMessageButton = ({setEditButtons}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const tooltip = (
    <Tooltip  style={{ marginBottom: '5px'}}  placement="top" id="tooltip-top">
        <div className={classes.buttonNameContainer}>
          <div className={classes.tooltipText}>Edit</div>
        </div>
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        // rootClose={ellipsesModal}
        trigger={['focus', 'hover']}
        placement="top"
        overlay={tooltip}
        // onToggle={() => setEllipsesModal(!ellipsesModal)}
        onHide={() => setEditButtons(false)}
        // show={ellipsesModal}
      >


    <div className={classes.editButton}>
      <i
        style={{ color: `${theme.offWhite}` }}
        className="fa-sm fa-solid fa-pencil"
      ></i>
    </div>
      </OverlayTrigger>
    </>
  );
};

export default EditMessageButton;
