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
        {isAuthenticated === null ?
        <a className="nav-link" href={'/register'}>
          Register
        </a> : null }

        {isAuthenticated === null ?
            <a className="nav-link" href={'/login'}>
              Login
            </a>
        :
            <a className="nav-link" href={'/homepage'} onClick={Logout}>
              Logout
            </a>
        }

        <div style={{ flex: 1 }}></div>
        <div>
          {isAuthenticated !== null ?
          <a className="nav-link" href={'/profile'}>
            Profile
          </a> : null }
        </div>
      </div>
    </div>
  );
}

export default Navbar;
