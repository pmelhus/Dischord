import { useDispatch } from "react-redux";
import {deleteServer} from "../../../store/server"
import {useHistory} from "react-router-dom"

const DeleteConfirmModal = ({currServer, setShowDeleteModal, setShowEditModal, setName, setErrors, setImage}) => {

  const dispatch = useDispatch();
  const history = useHistory()

  const handleDelete = async (e) => {
    e.preventDefault();
    // console.log(currServer, 'CURRSERVER')
    console.log(currServer)
    const deletedServer = await dispatch(deleteServer(currServer));
    if (deletedServer && deletedServer.errors) {
      // console.log(newEstate.errors)
      setErrors(deletedServer.errors);
      return;
    } else {
      setName("");
      setImage(null);
      setShowEditModal(false);
      setShowDeleteModal(false)
      history.push("/channels/@me");
    }
  };

  return (
    <>

    <div className="delete-form-container">
      <form className="channel-edit-form">
        <h3>Are you sure you want to delete your server?</h3>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="button-div-user">
          <button className='signup-login-button' onClick={handleDelete}>
            Yes
          </button>
          <button className='signup-login-button' onClick={() => setShowDeleteModal(false)}>
            No
          </button>
        </div>
      </form>
    </div>
    </>
  )
}

export default DeleteConfirmModal
