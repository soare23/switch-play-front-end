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
} from '@fortawesome/free-solid-svg-icons';
import ActiveOffers from './ActiveOffers';
import Modal from 'react-modal';

function UserProfile() {
  const [user, setUser] = useState({
    activeOffers: [],
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  library.add(faPhone, faMapMarkerAlt, faEnvelope);

  //   // ID will be found in session when session will be implemented
  let id = '27a7e0aa-4105-4215-ad67-e1682b669ac8';

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

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
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="user-information">Short Description</div>
                    <div className="profile-stats-info">
                      <div>
                        <a
                          onClick={setModalIsOpenToTrue}
                          style={{ cursor: 'pointer' }}
                        >
                          Active Offers:{' '}
                          <strong>{user.activeOffers.length}</strong>
                        </a>
                        <Modal isOpen={modalIsOpen} style={modalCustomStyle}>
                          <button onClick={setModalIsOpenToFalse}>x</button>
                          <ActiveOffers
                            offers={user.activeOffers}
                          ></ActiveOffers>
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
                        <div className="li-info">{user.phone}</div>
                      </li>
                    </div>
                    <div className="li-container">
                      <li>
                        <FontAwesomeIcon icon="map-marker-alt"></FontAwesomeIcon>
                        <div className="li-info">
                          {user.town},{user.country}
                        </div>
                      </li>
                    </div>
                    <div className="li-container">
                      <li>
                        <FontAwesomeIcon icon="envelope"></FontAwesomeIcon>
                        <div className="li-info">{user.email}</div>
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
