import React, { useState, useContext } from 'react';
import '../../Inbox.css';
import { UserContext } from '../UserContext';
import axios from 'axios';

export default function MessageSection({ SetMessageModal, userToSendMessage }) {
  const user = useContext(UserContext);
  const [successAlert, setSuccessAlert] = useState(false);
  const [message, setMessage] = useState({
    senderUserName: user.firstName,
    receiverUserName: userToSendMessage.firstName,
    senderId: user.userId,
    receiverId: userToSendMessage.id,
    message: '',
  });

  function sendMessage() {
    setSuccessAlert(true);
    axios
      .post(`/api/send-message/`, message)
      .then(() =>
        setTimeout(() => {
          SetMessageModal(false);
          setSuccessAlert(false);
        }, 1500)
      )
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="message-container">
      <div className="modal-main">
        {successAlert ? (
          ''
        ) : (
          <h4>Send a message to {userToSendMessage.firstName}</h4>
        )}
        <div>
          {successAlert ? (
            <div className="success-message-container" id="alert">
              <p className="gamed-added-message">Message sent!</p>
            </div>
          ) : (
            <div className="message-btn-container">
              <textarea
                onChange={(e) => {
                  const s = { ...message };
                  s.message = e.target.value;
                  setMessage(s);
                }}
                size="50"
                rows="4"
                style={{ margin: '10px' }}
              ></textarea>
              <div className="send-message-button-container">
                <button
                  type="submit"
                  className="btn btn-special"
                  onClick={(e) => {
                    sendMessage(e);
                  }}
                >
                  Send
                </button>
                <button
                  type="submit"
                  className="btn btn-special"
                  onClick={(e) => {
                    SetMessageModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
