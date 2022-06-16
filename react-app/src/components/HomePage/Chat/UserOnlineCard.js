const UserOnlineCard = ({ currentServerMemberIds, user }) => {
  return (
    <div className="online-card-container">
      <p>Online - {currentServerMemberIds.length}</p>
      <div>
        
      </div>
      <p>{user.username}</p>
    </div>
  );
};

export default UserOnlineCard
