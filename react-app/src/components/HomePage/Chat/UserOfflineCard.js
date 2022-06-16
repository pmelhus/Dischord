const UserOfflineCard = ({ offline, user, currentServer }) => {
  return (
    <div className="offline-card-container">
      <div className="invite-image-username">
        {user.image_url ? (
          <>
            <img className="server-image-icon" src={user.image_url} />
          </>
        ) : (
          <>
            <div className="user-offline-image-nourl">
              <i className="fa-solid fa-user-music"></i>
            </div>
          </>
        )}
        <p id="offline-user">{user.username}</p>
        {currentServer.owner_id === user.id && (
          <i id="crown" className="fa-solid fa-crown"></i>
        )}
      </div>
    </div>
  );
};

export default UserOfflineCard;
