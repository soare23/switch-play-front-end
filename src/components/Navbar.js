import React from 'react';

function Navbar(props) {
  return (
    <div style={{ backgroundColor: '#e8f2f6' }}>
      <div className="nav justify-content-start">
        <a className="nav-link" href="/">
          Home
        </a>
        <a className="nav-link" href={'/register'}>
          Register
        </a>
        <a className="nav-link" href={'/login'}>
          Login
        </a>
      </div>
    </div>
  );
}

export default Navbar;
