import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editChannel, deleteChannel } from "../../../store/channel";
import { useLocation } from "react-router-dom";

const EditChannelForm = ({ setShowEditForm }) => {
  const history = useHistory(); // so that we can redirect after the image upload is successful
  const channels = useSelector((state) => Object.values(state.channels));
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const currChannel = channels?.find(
    (channel) => channel.id === parseInt(pathname.split("/")[3])
    );
    const [descriptionError, setDescriptionError] = useState(true)
  const [nameError, setNameError] = useState(true)
  const [name, setName] = useState(currChannel?.name);
  const [description, setDescription] = useState(currChannel?.description);

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = currChannel.id;
    const server_id = currChannel.server_id;
    const payload = { id, name, description, server_id };

    const editedChannel = await dispatch(editChannel(payload));
    if (editedChannel.errors) {
      setErrors(editedChannel.errors);
      return;
    } else {
      setName("");
      setDescription("");
      setShowEditForm(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const deletedChannel = await dispatch(deleteChannel(currChannel));
    if (deletedChannel.errors) {
      setErrors(deletedChannel.errors);
      return;
    } else {
      setShowEditForm(false);
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
      <form className="server-create-form">
        <div className="server-create-form-msg">
          <h2>Edit Channel</h2>
        </div>
        <div>
          <label>Channel name</label>
          {nameError && errors && errors.name && (
            <div className='error-msg'>
              <p>*{errors.name}*</p>
            </div>
          )}
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
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
        <div>
          <button onClick={handleSubmit}>Save Changes</button>
          <button onClick={handleDelete}>Delete Channels</button>
        </div>
      </form>
    </>
  );
};

export default EditChannelForm;
