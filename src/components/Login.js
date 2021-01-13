import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  //   const [loggedIn, setLoggedIn] = useState(false);

  function handleSubmit() {
    axios
      .post(`/api/check-if-user`, user)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          //   setLoggedIn(true);
          window.location.href('http://localhost:3000/');
          //   const token = response.session.user;
          //   console.log(token);
          console.log('success');
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          console.log('wrong password');
          window.location.href('http://localhost:3000/');
        } else if (err.response.status === 409) {
          console.log('wrong email');
          window.location.href('http://localhost:3000/');
        } else {
          console.log(err);
        }
      });
  }

  return (
    <div>
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          {/*USER EMAIL*/}
          <div>
            <input
              type="text"
              name="email"
              value={user.email}
              required
              style={{ marginTop: '15px', width: '226px' }}
              placeholder="Email"
              onChange={(e) => {
                const s = { ...user };
                s.email = e.target.value;
                setUser(s);
              }}
            />
          </div>
          {/*USER PASSWORD*/}
          <div>
            <input
              type="text"
              name="password"
              value={user.password}
              required
              style={{ marginTop: '15px', width: '226px' }}
              placeholder="Password"
              onChange={(e) => {
                const s = { ...user };
                s.password = e.target.value;
                setUser(s);
              }}
            />
          </div>
          <Link to="/">
            <button
              style={{ marginTop: '15px', float: 'right' }}
              type="submit"
              className="btn btn-outline-primary"
            >
              Back
            </button>
          </Link>
          <button
            style={{ marginTop: '15px' }}
            type="submit"
            className="btn btn-outline-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
