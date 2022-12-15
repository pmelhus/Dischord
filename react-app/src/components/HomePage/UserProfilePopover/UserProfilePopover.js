import "./UserProfilePopover.css";

// Profile Popover component takes in the prop of user to display user information

const UserProfilePopover = ({ user }) => {

  console.log(user)
  const bannerStyle = { backgroundColor: "rgb(42, 39, 33)" };
  return (
    <>
      <div className="pro-pop-background">
        <div className="pro-pop-container">
          <svg className="pro-pop-banner" style={bannerStyle}></svg>
          <div className="pro-pop-content-background">
            <div className="pro-pop-icon-container">
              <div className="pro-pop-icon-background">
                <img className="pro-pop-icon" src={user.image_url}></img>
              </div>
            </div>
            <div className="pro-pop-content">
              <div className="pro-pop-username">
                <h3>{user.username}</h3>
              </div>
              <div className='divider'>

              </div>
              <div className="pro-pop-info">

                <div className="pro-pop-membersince">
                  <h4>MEMBER SINCE</h4>

                  {user.created_at}
                  </div>
                {user?.bio && (
                  <div className="pro-pop-aboutme">{user?.bio}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePopover;
