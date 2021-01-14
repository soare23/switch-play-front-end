import React from 'react';

function Navbar(props) {
  return (
    <div style={{ backgroundColor: '#e8f2f6' }}>
      <div className="nav justify-content-start">
        <a className="nav-link" href={'/homepage'}>
          Home
        </a>
        <a className="nav-link" href={'/register'}>
          Register
        </a>
        <a className="nav-link" href={'/login'}>
          Login
        </a>
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
