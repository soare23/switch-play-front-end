import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`/api/login`, user, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setLoggedIn(true);
          localStorage.setItem('token', response.data.token);
          window.location.href = 'http://localhost:3000/homepage';
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403) {
          setWrongCredentials(true);
          console.log('wrong password');
        } else if (err.response.status === 409) {
          setWrongCredentials(true);
          console.log('wrong email');
        } else {
          console.log(err);
        }
      });
  }

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div
          style={{
            padding: '20px',
            marginTop: '350px',
            borderRadius: '10px',
            width: '350px',
            backgroundColor: 'transparent',
            textAlign: 'center',
          }}
        >
          <form onSubmit={handleSubmit}>
            <div>
              {wrongCredentials && (
                <div
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#f8a6a6',
                    marginTop: '50px',
                    border: 'solid 1px #124686',
                    color: '#660101',
                    borderRadius: '5px',
                  }}
                >
                  <p style={{ margin: 'auto' }}>Incorrect email or password</p>
                </div>
              )}
            </div>
            <h1
              style={{
                marginTop: '15px',
                fontSize: '30px',
              }}
            >
              User Login
            </h1>
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
                type="password"
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
            <div className="login-button-container">
              <button
                style={{ marginTop: '15px', marginRight: '5px' }}
                type="submit"
                className="btn btn-outline-primary"
              >
                Submit
              </button>
              <Link to="/homepage">
                <button
                  style={{
                    marginTop: '15px',
                    float: 'right',
                    maringLeft: '5px',
                  }}
                  type="submit"
                  className="btn btn-outline-primary"
                >
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
