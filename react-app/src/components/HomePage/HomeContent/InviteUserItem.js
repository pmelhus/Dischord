import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {createServerMember} from "../../../store/server"


const InviteUserItem = ({ socket, currentServer, user, setInviteModal }) => {
const dispatch = useDispatch()
const [errors, setErrors] = useState({})

const handleInvite = async(e) => {
e.preventDefault()

const payload = {user_id: user.id, server_id: currentServer.id}

const serverMember = await dispatch(createServerMember(payload))
await socket.emit('chat')
if (serverMember.errors) {
  console.log(serverMember.errors);
  setErrors(serverMember.errors);
  return
} else {
  setInviteModal(false)
}

}

  return (
    <>
      <div className="invite-image-username">
        {user.image_url ? (
          <img className="server-image-icon" src={user.image_url}></img>
        ) : (
          <>
            <div className="usertab-default-profile-image-invite">
              <i className="fa-solid fa-user-music"></i>
            </div>
          </>
        )}

        <li className="invite-user-item">{user.username}</li>
      </div>
      <button onClick={handleInvite} className="invite-user-item-button">Invite</button>
    </>
  );
};

export default InviteUserItem;
