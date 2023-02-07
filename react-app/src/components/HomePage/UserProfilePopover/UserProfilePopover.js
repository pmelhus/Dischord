import "./UserProfilePopover.css";
import { ReactComponent as DischordIcon } from "../../../images/dischord-svg.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllServerMembers } from "../../../store/serverMember";
import { useEffect } from "react";
// Profile Popover component takes in the prop of user to display user information

const UserProfilePopover = ({ user, currentServer, memberIds }) => {
  const memberSinceDate = currentServer.members_ids.find(
    (member) => member.user_id === user.id
  ).member_since;

  const userDate = new Date(user.created_at);
  const memberDate = new Date(memberSinceDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  // console.log(userDate.getDate());
  const bannerStyle = { backgroundColor: "rgb(42, 39, 33)" };
  // const dispatch = useDispatch();
  // console.log(typeof userDate)

  // useEffect(() => {

  //   dispatch(getAllServerMembers(user.id, currentServer.id));
  // }, [dispatch]);

  // const currentServerMember = useSelector((state) => state.serverMembers.loadedServerMembers);
  // console.log(currentServerMember)

  return (
    <>
      <div className="pro-pop-background">
        <div className="pro-pop-container">
          <svg className="pro-pop-banner" style={bannerStyle}></svg>
          <div className="pro-pop-content-background">
            <div className="pro-pop-icon-container">
              <div className="pro-pop-icon-background">
                {user.image_url ? (
                  <div className="online-image-with-circle-popover">
                    {user.idle ? (
                      <div className="idle-circle-container-popover">
                        <img
                          className="pro-pop-icon"
                          src={user.image_url}
                        ></img>
                        {user.online && (
                          <>
                            <div className="idle-circle-background-popover">
                              <div className="idle-circle-popover">
                                <div className="idle-mini-circle-popover"></div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <>
                        <img
                          className="pro-pop-icon"
                          src={user.image_url}
                        ></img>
                        {user.online && (
                          <>
                            <div className="green-circle-popover-background">
                              <div className="green-circle-popover"> </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="pro-pop-icon-nourl">
                    <i className="fa-solid fa-user-music fa-2xl"></i>
                    {user.online && (
                          <>

                    <div className="green-circle-popover-background">
                      <div className="green-circle-popover"> </div>
                    </div>
                          </>
                        )}
                  </div>
                )}
              </div>
            </div>
            <div className="pro-pop-content">
              <div className="pro-pop-username">
                <h3>{user.username}</h3>
              </div>
              <div className="divider"></div>
              <div className="pro-pop-info">
                {user?.bio && (
                  <div className="pro-pop-aboutme">
                    <h4>ABOUT ME</h4>
                    <p>{user?.bio}</p>
                  </div>
                )}
                <div className="pro-pop-membersince">
                  <h4>MEMBER SINCE</h4>
                  <div className="dischord-member-since">
                    <div className="dischord-member-svg">
                      <DischordIcon />
                      <p>{userDate.toLocaleDateString(undefined, options)}</p>
                      <img
                        className="server-icon"
                        src={currentServer.image_url}
                      ></img>
                      <p>{memberDate.toLocaleDateString(undefined, options)}</p>
                    </div>
                  </div>
                  <div className="server-member-since"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePopover;
