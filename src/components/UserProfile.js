import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../UserProfile.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPhone,
  faMapMarkerAlt,
  faEnvelope,
  faDesktop,
  faGamepad,
} from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import ActiveOffers from './ActiveOffers';
import Modal from 'react-modal';
import EditableFields from './EditableFields';
import { UserContext } from './UserContext';

function UserProfile() {
  const value = useContext(UserContext);

  library.add(faPhone, faMapMarkerAlt, faEnvelope, faDesktop, fab, faGamepad);
  const [user, setUser] = useState({
    activeOffers: [],
    console: '',
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputIsEditable, setInputIsEditable] = useState(false);
  const [consoleList, setConsoleList] = useState([]);
  const [activeOffers, setActiveOffers] = useState([]);
  const [updatedUserInformation, setUpdatedUserInformation] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    town: '',
    country: '',
    console: '',
  });
  const [userAvatar, setUserAvatar] = useState();

  //   // ID will be found in session when session will be implemented
  let id = value.userId;

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  useEffect(() => {
    axios
      .get(
        `https://api.rawg.io/api/platforms?key=d124f7e507b7487ba9faa3cc51bfaabf`
      )
      .then((response) => {
        setConsoleList(response.data.results);
      });
  }, [inputIsEditable]);

  useEffect(() => {
    axios
      .get(`/api/get-active-offers-by-user-id/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setActiveOffers(response.data);
      });
  }, []);

  function fetchUserData(id) {
    axios
      .get(`/api/get-user-by-id/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setUser(response.data);
        generateUserAvatar(response.data.firstName, response.data.lastName);
      });
  }

  function generateUserAvatar(firstName, lastName) {
    console.log(firstName, lastName);
    axios
      .get(`https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}`)
      .then((response) => {
        setUserAvatar(response.config.url);
        console.log(response);
      });
  }

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const modalCustomStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const setEditProfileToTrue = () => {
    setUpdatedUserInformation(user);
    setInputIsEditable(true);
  };

  const setEditProfileToFalse = () => {
    setInputIsEditable(false);
    axios
      .put(`api/update-user/${id}`, updatedUserInformation, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.status === 201) {
          console.log('User updated succesfully');
          setUser({ ...updatedUserInformation });
          generateUserAvatar(
            updatedUserInformation.firstName,
            updatedUserInformation.lastName
          );
        }
      });
  };

  const updateUserProfile = (value, key) => {
    setUpdatedUserInformation({
      ...updatedUserInformation,
      [key]: value,
    });
  };

  return (
    <div>
      <div className="container main-container">
        <div className="row">
          <div className="col">
            <div className="panel panel-default plain profile-panel">
              <div className="panel-body">
                <div className="container">
                  <div className="profile-avatar">
                    <img
                      className="img-responsive"
                      src={userAvatar}
                      alt="profile"
                    ></img>
                  </div>
                  <div className="container user-profile-container">
                    <div className="user-name">
                      <div className="user-name-container">
                        <EditableFields
                          inputName="firstName"
                          userInfo={user.firstName}
                          editable={inputIsEditable}
                          updateField={updateUserProfile}
                        ></EditableFields>
                        <EditableFields
                          inputName="lastName"
                          userInfo={user.lastName}
                          editable={inputIsEditable}
                          updateField={updateUserProfile}
                        ></EditableFields>
                        <div>
                          {inputIsEditable === false ? (
                            <button
                              onClick={setEditProfileToTrue}
                              className="btn btn-info"
                            >
                              Edit Profile
                            </button>
                          ) : (
                            <button
                              onClick={setEditProfileToFalse}
                              className="btn btn-special"
                            >
                              Save Profile
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="user-information">Short Description</div>
                    <div className="profile-stats-info">
                      <div>
                        <a
                          onClick={setModalIsOpenToTrue}
                          style={{ cursor: 'pointer' }}
                        >
                          Active Offers: <strong>{activeOffers.length}</strong>
                        </a>
                        <Modal isOpen={modalIsOpen} style={modalCustomStyle}>
                          <button onClick={setModalIsOpenToFalse}>x</button>
                          <ActiveOffers offers={activeOffers}></ActiveOffers>
                        </Modal>
                      </div>
                      <div>
                        <Link to={`/user-rating/${id}`}>See my reviews</Link>
                      </div>
                      <div>
                        <a href="#" title="Likes">
                          Completed Deals:
                          <strong>4</strong>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-footer white-content">
                <div className="user-contact">
                  <ul className="profile-info">
                    <div className="li-container">
                      <li>
                        <FontAwesomeIcon icon="phone"></FontAwesomeIcon>
                        <EditableFields
                          inputName="phone"
                          userInfo={user.phone}
                          editable={inputIsEditable}
                          updateField={updateUserProfile}
                        ></EditableFields>
                      </li>
                    </div>
                    <div className="li-container">
                      <li>
                        <FontAwesomeIcon icon="map-marker-alt"></FontAwesomeIcon>
                        <EditableFields
                          inputName="town"
                          userInfo={user.town}
                          editable={inputIsEditable}
                          updateField={updateUserProfile}
                        ></EditableFields>
                        ,
                        <EditableFields
                          inputName="country"
                          userInfo={user.country}
                          editable={inputIsEditable}
                          updateField={updateUserProfile}
                        ></EditableFields>
                      </li>
                    </div>
                    <div className="li-container">
                      <li>
                        <FontAwesomeIcon icon="envelope"></FontAwesomeIcon>
                        <EditableFields
                          inputName="email"
                          userInfo={user.email}
                          editable={inputIsEditable}
                          updateField={updateUserProfile}
                        ></EditableFields>
                      </li>
                    </div>
                    <div className="li-container">
                      <li>
                        <FontAwesomeIcon icon="gamepad"></FontAwesomeIcon>
                        {inputIsEditable ? (
                          <select
                            className="dropdown-select"
                            required
                            onChange={(e) => {
                              updateUserProfile(e.target.value, 'console');
                            }}
                          >
                            <option>{user.console}</option>
                            {consoleList.map((console, index) => {
                              return (
                                <option key={index} value={console.name}>
                                  {console.name}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          <div style={{ marginLeft: '10px' }}>
                            {user.console}
                          </div>
                        )}
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
