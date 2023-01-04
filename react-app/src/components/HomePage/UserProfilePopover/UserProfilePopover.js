import "./UserProfilePopover.css";
import { ReactComponent as DischordIcon } from "../../../images/dischord-svg.svg";
// Profile Popover component takes in the prop of user to display user information

const UserProfilePopover = ({ user }) => {
  const userDate = new Date(user.created_at)
  const options = {year: 'numeric', month: 'long', day: 'numeric' };
  console.log(userDate.getDate())
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
              <div className="divider"></div>
              <div className="pro-pop-info">
                <div className="pro-pop-membersince">
                  <h4>MEMBER SINCE</h4>
                  <div className="dischord-member-since">
                    <div className="dischord-member-svg">
                      <DischordIcon />
                    {userDate.toLocaleDateString(undefined, options)}
                    </div>
                  </div>
                  <div className="server-member-since"></div>
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
