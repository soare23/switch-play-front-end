import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import { UserContext } from './UserContext';
import MessageSection from './inbox/MessageSection';

export default function SearchGame() {
  const [display, setDisplay] = useState(true);
  const [containerDisplay, setContainerDisplay] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [options, setOptions] = useState([]);
  const [gamesList, setGamesList] = useState([]);
  const [offerId, setOfferId] = useState();
  const user = useContext(UserContext);
  const [messageModal, setMessageModal]=useState(false);
  const [userToSendMessage, setUserToSendMessage]=useState({id:'',
    firstName:''
  })

  function handleSearchInput(e) {
    const search_result = e.target.value;
    axios
      .get(
        `https://api.rawg.io/api/games?key=a0200251f0824f9291c541b963f86c46&page_size=5&search=${search_result}`,
        {
          params: {
            search_exact: false,
            search_precise: true,
          },
        }
      )
      .then((res) => {
        const data = res.data.results;
        setOptions(data);
        setDisplay(true);
        setContainerDisplay(false);
      });
  }

  function openMakeAnOfferComponent(gameID) {
    if (user) {
      setShowComponent(!showComponent);
      document.getElementById('makeAnOffer').hidden = true;
      setOfferId(gameID);
    } else {
      window.location.href = 'http://localhost:3000/login';
    }
  }

  function handleBrowseDBClick() {
    axios.get('/api/offers').then((data) => {
      console.log(data);
      setGamesList(data.data);
    });
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <h1 style={{ marginTop: '15px', fontSize: '30px' }}>
          Search for a game
        </h1>
      </div>

      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <button
            className="btn btn-special"
            style={{ width: '251px', height: '38px' }}
            onClick={handleBrowseDBClick}
          >
            See available offers
          </button>
        </div>
      </div>
      <h3
        style={{
          textAlign: 'center',
          margin: '20px',
        }}
      >
        OR
      </h3>

      <div className="d-flex justify-content-center">
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Enter game name..."
            aria-label="Search"
            onChange={handleSearchInput}
          />
        </form>
      </div>

      {display && (
        <div className="d-flex justify-content-center">
          <div style={{ width: '300px', 'padding-left': '50px' }}>
            {options.map((res) => {
              return (
                <h6
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.preventDefault();
                    const title_result = res.name;
                    setDisplay(false);
                    setContainerDisplay(true);
                    axios
                      .get(`/api/get-offer/${title_result}`)
                      .then((result) => {
                        let games = result.data;
                        setGamesList(games);
                      });
                  }}
                >
                  {res.name}
                </h6>
              );
            })}
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center">
        {gamesList.length > 0 || !containerDisplay ? (
          <GameCard
            gamesList={gamesList}
            openMakeAnOfferComponent={openMakeAnOfferComponent}
            showComponent={showComponent}
            offerId={offerId}
            setMessageModal={setMessageModal}
            UserToSendMessage={userToSendMessage}
            setUserToSendMessage={setUserToSendMessage}
          ></GameCard>
        ) : (
          <h1 className="no-games-message">
            Sorry, there are no offers available
          </h1>
        )}
      </div>
      {messageModal &&<MessageSection userToSendMessage={userToSendMessage} SetMessageModal={setMessageModal}></MessageSection>}
    </>
  );
}
