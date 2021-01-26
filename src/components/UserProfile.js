import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
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

function UserProfile() {
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

  //   // ID will be found in session when session will be implemented
  let id = 'b25cb075-b409-4f6d-a831-5ef78892590d';

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
    axios.get(`/api/get-active-offers-by-user-id/${id}`).then((response) => {
      console.log(response.data);
      setActiveOffers(response.data);
    });
  }, [])

  function fetchUserData(id) {
    axios.get(`/api/get-user-by-id/${id}`).then((response) => {
      console.log(response);
      setUser(response.data);
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
      .put(`api/update-user/${id}`, updatedUserInformation)
      .then((response) => {
        if (response.status === 201) {
          console.log('User updated succesfully');
          window.location.href = 'http://localhost:3000/profile';
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
              <div className="panel-heading white-content p-left p-right"></div>
              <div className="panel-body">
                <div className="container">
                  <div className="profile-avatar">
                    <img
                      className="img-responsive"
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
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
                              className="btn btn-success"
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
                        <a href="#" title="Comments">
                          Rating:
                          <strong>10</strong>
                        </a>
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
