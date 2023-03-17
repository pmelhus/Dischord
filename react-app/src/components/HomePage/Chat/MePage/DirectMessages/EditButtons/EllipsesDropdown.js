 import { createUseStyles, useTheme } from "react-jss";

 const useStyles = createUseStyles((theme) => ({

  dropdownContainer: {
    backgroundColor: theme.darkMenuBackground,
    minWidth: '140px',
    maxWidth: '320px',
    zIndex: '100',
    padding: '6px 8px',
    borderRadius: '3px'
  },
  menuItem: {
    color: theme.redTheme,
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '20px',
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: theme.redTheme,
      color: theme.offWhite
    },
    padding: '6px 8px',
    borderRadius: '3px'

  }

   }))

 const EllipsesDropdown = ({setDeleteConfirm}) => {

   const theme = useTheme();
   const classes = useStyles({ theme });

  const handleDelete = () => {
setDeleteConfirm(true)
  }

   return (
     <div className={classes.dropdownContainer}>
      <div className={classes.menu}>
      <div onClick={handleDelete} className={classes.menuItem}>
          <div>Delete Message</div>
          <div><i className="fa-solid fa-trash-can"></i></div>
      </div>
      </div>
     </div>
   )
 }

 export default EllipsesDropdown
