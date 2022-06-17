import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editChannel, deleteChannel} from "../../../store/channel";
import { useLocation } from "react-router-dom";

const EditChannelForm2 = ({ setShowEditForm2, channel }) => {
  const history = useHistory(); // so that we can redirect after the image upload is successful

  const dispatch = useDispatch();
  const [name, setName] = useState(channel.name);
  const [description, setDescription] = useState(channel.description);

  const [errors, setErrors] = useState({});
  const [descriptionError, setDescriptionError] = useState(true)
  const [nameError, setNameError] = useState(true)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = channel.id;
    const server_id = channel.server_id;
    const payload = { id, name, description, server_id };

    const editedChannel = await dispatch(editChannel(payload));
    if (editedChannel.errors) {
      // console.log(newEstate.errors)
      setErrors(editedChannel.errors);
      return;
    } else {
      setName("");
      setDescription("");
      setShowEditForm2(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const deletedChannel = await dispatch(deleteChannel(channel));
    if (deletedChannel?.errors) {
      setErrors(deletedChannel.errors);
      return;
    } else {
      setShowEditForm2(false);
    }
  };

  useEffect(()=> {
    if (description === null) {
      setDescription('')
    }
    setNameError(true)
    setDescriptionError(true)
    if (name?.length > 1 && name?.length < 33) {
      setNameError(false)
    }
    if (description?.length < 255) {
      setDescriptionError(false)
    }

  },[name, description, dispatch])

  return (
    <>
      <form className="channel-edit-form">
        <div className="server-create-form-msg">
          <h2>Edit Channel</h2>
        </div>
        <div className="channel-input">
          <label>Channel name</label>
          {nameError && errors && errors.name && (
            <div className='error-msg'>
              <p>*{errors.name}*</p>
            </div>
          )}
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div className="channel-input">
          <label>Description</label>
          {descriptionError && errors && errors.description && (
            <div className='error-msg'>
              <p>*{errors.description}*</p>
            </div>
          )}
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>

        <div className="button-div-user">
          <button id="channel-submit" onClick={handleSubmit}>Save Changes</button>
          <button id="channel-submit" onClick={handleDelete}>Delete Channel</button>
        </div>
      </form>
    </>
  );
};

export default EditChannelForm2;
