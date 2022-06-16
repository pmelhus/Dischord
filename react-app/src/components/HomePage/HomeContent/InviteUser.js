import { useSelector, useDispatch } from "react-redux";
import InviteUserItem from './InviteUserItem.js'

const InviteUser = ({currentServer, setInviteModal}) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => Object.values(state.users));
  const serverMembers = useSelector(state => state.servers)[currentServer.id].members
const serverMemberIds = []
serverMembers?.forEach(member => {
  serverMemberIds.push(member.id)
})
console.log(serverMemberIds)
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
            if (serverMemberIds.includes(user.id)) {
              return
            }
            return (
              <div className="invite-user-item-div">
                <InviteUserItem {...{setInviteModal}} {...{currentServer}} {...{user}}/>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default InviteUser;
