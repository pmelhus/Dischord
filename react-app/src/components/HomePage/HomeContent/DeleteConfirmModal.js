import { useDispatch } from "react-redux";
import {deleteServer} from "../../../store/server"
import {useHistory} from "react-router-dom"

const DeleteConfirmModal = ({currServer, setShowDeleteModal, setShowEditModal, setName, setErrors, setImage}) => {

  const dispatch = useDispatch();
  const history = useHistory()
  
  const handleDelete = async (e) => {
    e.preventDefault();
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
    <div className="delete-form-container">
      <form>
        <h3>Are you sure you want to delete your server?</h3>
        <div className="button-delete-form">
          <button className="btn" onClick={handleDelete}>
            Yes
          </button>
          <button className="btn" onClick={() => setShowDeleteModal(false)}>
            No
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteConfirmModal
