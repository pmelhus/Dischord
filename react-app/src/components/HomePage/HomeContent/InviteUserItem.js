import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {createServerMember} from "../../../store/server"
import {createDirectMessage} from "../../../store/directMessage"
import {createInbox} from "../../../store/inbox"




const InviteUserItem = ({ socket, currentServer, user, setInviteModal }) => {
const dispatch = useDispatch()
const [errors, setErrors] = useState({})

const sessionUser = useSelector(state => (state.session.user))

const inboxes = useSelector(state => (Object.values(state.inboxes)))

const relevantInbox = inboxes.find(inbox => (inbox.inbox_members.includes(sessionUser.id) && inbox.inbox_members.includes(user.id)))

const handleInvite = async(e) => {
  e.preventDefault()
if (relevantInbox) {
  const serverInviteMessage = await dispatch(createDirectMessage({
    user_id: sessionUser.id,
    msg: "Server Invite",
    inbox_id: relevantInbox?.id,
    serverInvite: true,
    serverInviteId: currentServer.id
  }))
  if (serverInviteMessage && serverInviteMessage.errors) {
    await setErrors(serverInviteMessage.errors);
    return;
  }
  await socket?.emit("dmChat", serverInviteMessage.owner_id, relevantInbox?.id);

}


// const payload = {user_id: user.id, server_id: currentServer.id}

// const serverMember = await dispatch(createServerMember(payload))
// await socket.emit('chat')
// if (serverMember.errors) {
//   console.log(serverMember.errors);

//   await setErrors(serverMember.errors);
//   return
// } else {
//  setInviteModal(false)
// }

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
