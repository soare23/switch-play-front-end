import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register(props) {
  const [categoryList, setCategoryList] = useState([]);
  const [consoleList, setConsoleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [exists, setExists] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState();
  const [alert, setAlert] = useState(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    town: '',
    country: '',
    console: '',
    registrationDate: Date.now(),
    favouriteCategories: [
      {
        name: '',
      },
    ],
    inbox: {},
  });

  useEffect(() => {
    axios
      .get(
        `https://api.rawg.io/api/genres?key=d124f7e507b7487ba9faa3cc51bfaabf`
      )
      .then((response) => {
        setCategoryList(response.data.results);
        setIsLoading(false);
      });
    axios
      .get(
        `https://api.rawg.io/api/platforms?key=d124f7e507b7487ba9faa3cc51bfaabf`
      )
      .then((response) => {
        setConsoleList(response.data.results);
        setIsLoading(false);
      });
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password === verifyPassword) {
      axios
        .post(`/api/add-user/`, user)
        .then(() => {
          window.location.href = 'http://localhost:3000/login';
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setExists(true);
          }
        });
    } else {
      setExists(true);
      setAlert(true);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center register-container">
        <div>
          <div
            style={{
              padding: '20px',
              marginTop: '75px',
              borderRadius: '10px',
              width: '350px',
              backgroundColor: 'transparent',
              textAlign: 'center',
            }}
          >
            <form action="" onSubmit={handleSubmit}>
              <h1
                style={{
                  marginTop: '15px',
                  fontSize: '30px',
                }}
              >
                User Registration
              </h1>
              {exists ? (
                <div
                  style={{
                    textAlign: 'center',
                    display: 'flex',
                    alignContent: 'center',
                    backgroundColor: '#f8a6a6',
                    marginTop: '50px',
                    border: 'solid 1px #124686',
                    borderRadius: '5px',
                    color: '#660101',
                  }}
                >
                  {alert ? (
                    <p style={{ margin: 'auto' }}>Passwords do not match</p>
                  ) : (
                    <p style={{ margin: 'auto' }}>Email already used</p>
                  )}
                </div>
              ) : (
                ''
              )}
              {/*USER FAVOURITE CATEGORY*/}
              <div className="dropdown-container">
                <div className="input-group mb-3" style={{ marginTop: '15px' }}>
                  <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    required
                    onChange={(e) => {
                      const s = { ...user };
                      s.favouriteCategories[0].name = e.target.value;
                      setUser(s);
                    }}
                  >
                    <option defaultValue="">Select favourite genre...</option>
                    {categoryList.map((genre, index) => {
                      return (
                        <option key={index} value={genre.name}>
                          {genre.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {/*USER FAVOURITE CONSOLE*/}
                <div className="input-group mb-3" style={{ marginTop: '15px' }}>
                  <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    required
                    onChange={(e) => {
                      const s = { ...user };
                      s.console = e.target.value;
                      setUser(s);
                    }}
                  >
                    <option defaultValue="">Select favourite console...</option>
                    {consoleList.map((console, index) => {
                      return (
                        <option key={index} value={console.name}>
                          {console.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              {/*USER FIRST NAME*/}
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  required
                  style={{ marginTop: '3px', width: '226px' }}
                  placeholder="First Name"
                  onChange={(e) => {
                    const s = { ...user };
                    s.firstName = e.target.value;
                    setUser(s);
                  }}
                />
              </div>
              {/*USER LAST NAME*/}
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  required
                  style={{ marginTop: '15px', width: '226px' }}
                  placeholder="Last Name"
                  onChange={(e) => {
                    const s = { ...user };
                    s.lastName = e.target.value;
                    setUser(s);
                  }}
                />
              </div>
              {/*USER PHONE*/}
              <div>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  required
                  style={{ marginTop: '15px', width: '226px' }}
                  placeholder="Phone"
                  onChange={(e) => {
                    const s = { ...user };
                    s.phone = e.target.value;
                    setUser(s);
                  }}
                />
              </div>
              {/*USER TOWN*/}
              <div>
                <input
                  type="text"
                  name="town"
                  value={user.town}
                  required
                  style={{ marginTop: '15px', width: '226px' }}
                  placeholder="Town"
                  onChange={(e) => {
                    const s = { ...user };
                    s.town = e.target.value;
                    setUser(s);
                  }}
                />
              </div>
              {/*USER COUNTRY*/}
              <div>
                <input
                  type="text"
                  name="country"
                  value={user.country}
                  required
                  style={{ marginTop: '15px', width: '226px' }}
                  placeholder="Country"
                  onChange={(e) => {
                    const s = { ...user };
                    s.country = e.target.value;
                    setUser(s);
                  }}
                />
              </div>

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
              {/*USER PASSWORD 2*/}
              <div>
                <input
                  type="password"
                  name="password2"
                  value={verifyPassword}
                  required
                  style={{ marginTop: '15px', width: '226px' }}
                  placeholder="Verifiy password"
                  onChange={(e) => {
                    setVerifyPassword(e.target.value);
                  }}
                />
              </div>
              <div className="registration-button-container">
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
                      marginLeft: '5px',
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
    </div>
  );
}

export default Register;
