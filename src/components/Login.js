import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {

  const [wrongEmail, setWrongEmail] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loggedIn, setLoggedIn] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`/api/login`, user)
      .then((response) => {
        if (response.status === 200) {
          setLoggedIn(true);
          localStorage.setItem("token", response.data.token)
          window.location.href = 'http://localhost:3000/homepage';
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          console.log('wrong password');
        } else if (err.response.status === 409) {
          setWrongEmail(true);
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
              backgroundColor: '#e8f2f6',
              padding: '20px',
              marginTop: '75px',
              borderRadius: '10px',
            }}
        >
        <form onSubmit={handleSubmit}>
          <div>{wrongEmail && <div style={{"textAlign" : "center", "backgroundColor" : "#f8a6a6", "marginTop" : "50px", "border" : "solid 1px #124686", "color" : "#660101"}}><i>Wrong email</i></div>}</div>
          <h1
              style={{
                marginTop: '15px',
                fontFamily: "'Source Serif Pro', serif",
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
    </div>
  );
}

export default Login;
