import { createUseStyles, useTheme } from "react-jss";
import { Editable } from "slate-react";

const useStyles = createUseStyles((theme) => ({
  editable: {
    overflow: "auto",
    whiteSpace: "pre-wrap",
    textOverflow: "ellipse",
    // maxWidth: '100%',
    width: '100%',
    padding: '10px 30px'
  },
}));

const CustomEditable = ({ attributes, children, ...props }) => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  return (
    <Editable className={classes.editable} {...attributes} {...props}>
      {children}
    </Editable>
  );
};

export default CustomEditable;
