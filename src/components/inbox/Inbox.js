import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import MessageSection from './MessageSection';

export default function Inbox() {
  const value = useContext(UserContext);
  const userId = value.userId;
  const [Inbox, setInbox] = useState({});
  const [messages, setMessages] = useState([]);
  const [AnswerBtn, setAnswerBtn] = useState(true);
  const [messageModal, setMessageModal] = useState(false);
  const [userToSendMessage, setUserToSendMessage] = useState({
    id: '',
    firstName: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/get-inbox/${userId}`, {}).then((response) => {
      console.log(response.data);
      setInbox(response.data);
      setMessages(response.data.receivedMessages);
    });
  }, [loading, userId]);

  function deleteMessage(id) {
    axios
      .post(`/api/delete-message/${id}/${userId}`)
      .then(() => {
        setLoading(!loading);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="inbox-messages-container">
      <div className="buttons-container">
        <button
          className="btn btn-special"
          onClick={() => {
            setAnswerBtn(true);
            setMessages(Inbox.sentMessages);
          }}
        >
          Received
        </button>
        <button
          className="btn btn-special"
          onClick={() => {
            setAnswerBtn(false);
            setMessages(Inbox.receivedMessages);
          }}
        >
          Sent
        </button>
      </div>
      <div className="messages-table">
        <table className="msg-table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Sender</th>
              <th scope="col">Receiver</th>
              <th scope="col">Message</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {messages.map((res) => {
              //date converting
              let date = Date.parse(res.date);

              return (
                <tr key={res.message_id}>
                  <td>
                    {new Intl.DateTimeFormat('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                    }).format(date)}
                  </td>
                  <td>{res.senderUserName}</td>
                  <td>{res.receiverUserName}</td>
                  <td>{res.message}</td>
                  <td>
                    {AnswerBtn && (
                      <button
                        onClick={() => {
                          const s = { ...userToSendMessage };
                          s.firstName = res.senderUserName;
                          s.id = res.senderId;
                          console.log(res);
                          setUserToSendMessage(s);
                          setMessageModal(true);
                        }}
                        className="btn btn-special"
                      >
                        Answer
                      </button>
                    )}{' '}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        deleteMessage(res.message_id);
                      }}
                      className="btn btn-special"
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {messageModal && (
        <MessageSection
          userToSendMessage={userToSendMessage}
          SetMessageModal={setMessageModal}
        ></MessageSection>
      )}
    </div>
  );
}
