import { useSelector, useDispatch } from "react-redux";
import InviteUserItem from './InviteUserItem.js'

const InviteUser = ({sessionUser, socket, currentServer, setInviteModal}) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => Object.values(state.users));
  const serverMembers = useSelector(state => state.servers)[currentServer.id].members_ids

const serverMemberIds = []

// serverMembers?.forEach(member => {
//   serverMemberIds.push(member.id)
// })

const serverMembersIds = serverMembers.map(obj => {
  return obj.user_id
})
console.log(serverMembersIds)
  return (
    <div className='invite-user-container'>
      {/* <div className='user-search'>
        <input></input>
      </div> */}
      <div className="invite-user-heading">
        <h3>Invite people to your server!</h3>
      </div>
      <div className="invite-user-list">
        <ul>
          {users?.map((user) => {
            if (user.id === sessionUser.id || serverMembersIds.includes(user.id)) return
            return (
              <div style={{padding:'8px 0'}} className="invite-user-item-div">
                <InviteUserItem {...{socket}} {...{setInviteModal}} {...{currentServer}} {...{user}}/>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default InviteUser;
