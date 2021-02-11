import React from 'react';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from './UserContext';

function RecievedDeals(props) {
  const value = useContext(UserContext);
  const gameID = props.location.gameId;
  const gameTitle = props.location.gameTitle;
  const userID = value.userId;
  const [recievedDeals, setRecievedDeals] = useState([]);

  useEffect(() => {
    function fetchDealData() {
      axios
        .get(`/api/get-deal-by-user-and-game/${userID}/${gameID}`)
        .then((res) => {
          console.log(res.data);
          setRecievedDeals(res.data);
        });
    }
    fetchDealData();
  }, [gameID, userID]);

  return (
    <div>
      <div className="recieved-deals-header">
        <h3>Offers recieved for your {gameTitle}</h3>
      </div>
      <div className="trade-offer-container">
        {recievedDeals.map((deal, index) => (
          <div
            className="d-flex justify-content-center"
            style={{
              margin: 'auto',
            }}
            key={index}
          >
            <div
              className="card h-100 game-result-card"
              style={{ width: '18rem', marginTop: '20px' }}
            >
              <img
                className="card-img-top"
                src={deal.gameSentImage}
                alt="game logo"
              />
              <div className="card-body">
                <h5 className="card-title">{deal.gameSentTitle}</h5>
                <p className="card-text">User : {deal.offlineUserName}</p>
                <p className="card-text">Platform : {deal.gameSentPlatform}</p>
                <p className="card-text">Status : {deal.status}</p>
                <p className="card-text">Date : {deal.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecievedDeals;
