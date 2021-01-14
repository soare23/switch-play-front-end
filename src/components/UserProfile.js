import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import '../UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState({});

  //   // ID will be found in session when session will be implemented
  let id = 'a8867f95-e59c-440e-be8d-84b9d4784104';

  useEffect(() => {
    fetchUserData(id);
  }, [id]);

  function fetchUserData(id) {
    axios.get(`/api/get-user-by-id/${id}`).then((response) => {
      console.log(response);
      setUser(response.data);
    });
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-8  col-xs-12">
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
                      <span className="label label-success">admin</span>
                    </div>
                    <div className="user-information">Short Description</div>
                    <div className="profile-stats-info">
                      <a href="#" title="Views">
                        <i className="glyphicon glyphicon-eye-open"> </i>
                        <strong>2000</strong>
                      </a>
                      <a href="#" title="Comments">
                        <i className="glyphicon glyphicon-comment"> </i>
                        <strong>120</strong>
                      </a>
                      <a href="#" title="Likes">
                        <i className="glyphicon glyphicon-thumbs-up"> </i>
                        <strong>60</strong>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel-footer white-content">
                <div className="user-contact">
                  <ul className="profile-info">
                    <li>
                      <i class="fas fa-phone"></i> {user.phone}
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-map-marker"></i>{' '}
                      {user.town},{user.country}
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-envelope"></i>{' '}
                      {user.email}
                    </li>
                    <li>
                      <i className="glyphicon glyphicon-edit"></i> Gamer
                    </li>
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
