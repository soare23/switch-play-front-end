import React, { useContext } from 'react';
import Logout from './Logout';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

function Navbar(props) {
  const userDetails = useContext(UserContext);

  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <div className="nav justify-content-start">
        <Link to="/homepage">
          <div className="logo"></div>
        </Link>
    
        <div style={{ flex: 1 }}></div>
        {userDetails !== undefined ? (
        
          <div className="welcome-tab-navbar">
            <p>Welcome {userDetails.firstName}</p>
          </div>
           
        ) : null}
       
        <div>
          {userDetails !== undefined ? (
            <>
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
            
           </>
          ) : null}
        </div>
        <div>
          {userDetails !== undefined ? (
            <Link to="/inbox">
             Inbox
            </Link>
          ) : null}
        </div>
        {userDetails === undefined ? (
          <Link className="nav-Link" to="/register">
            Register
          </Link>
        ) : null}
        {userDetails === undefined ? (
          <Link className="nav-link" to={'/login'}>
            Login
          </Link>
        ) : (
          <a className="nav-link" href={'/homepage'} onClick={Logout}>
            Logout
          </a>
        )}
      </div>
    </div>
  );
}

export default Navbar;
