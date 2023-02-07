const LogoutConfirm = ({ setLogoutConfirm, onLogout }) => {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', padding: "50px"}}>
      <div style={{paddingBottom: '40px'}}>
        <h3 style={{color: '#b9b9b9'}}>Are you sure you want to log out?</h3>
      </div>

      <div style={{display:'flex', justifyContent:'space-between', width:'300px'}}>
        <button className='signup-login-button' onClick={onLogout}>Log Out</button>
        <button className='signup-login-button' onClick={() => setLogoutConfirm(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default LogoutConfirm;
