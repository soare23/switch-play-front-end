import React from 'react';
import Logout from "./Logout";

function Navbar(props) {

  let isAuthenticated = localStorage.getItem("token");

  return (
    <div style={{ backgroundColor: '#e8f2f6' }}>
      <div className="nav justify-content-start">
        <a className="nav-link" href={'/homepage'}>
          Home
        </a>
        <a className="nav-link" href={'/register'}>
          Register
        </a>
        {isAuthenticated === null ?
            <a className="nav-link" href={'/login'}>
              Login
            </a>
        :
            <a className="nav-link" href={'/logout'} onClick={Logout}>
              Logout
            </a>
        }

        <div style={{ flex: 1 }}></div>
        <div>
          <a className="nav-link" href={'/profile'}>
            Profile
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
