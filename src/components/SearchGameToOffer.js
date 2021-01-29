import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

function SearchGameToOffer({ offerId }) {
  const value = useContext(UserContext);
  const userId = value.userId;
  const [searchedGameList, setSearchedGameList] = useState([]);
  const [activeUser, setActiveUser] = useState({});

  const [deal, setDeal] = useState({
    userWhoSent: {},
    gameSent: {},
    userWhoReceived: {},
    gameWhoReceived: {},
    date: Date.now(),
  });

  //the game that user will like to offer (to send)
  const [selectedGame, setSelectedGame] = useState({});

  //the game that user wishes to purchase
  const [desiredGame, setDesiredGame] = useState({});
  const [nonActiveUser, setNonActiveUser] = useState({});
  const [consoleList, setConsoleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gameToAddToDeal, setGameToAddToDeal] = useState({});
  const [offerToAdd, setOfferToAdd] = useState({
    game: {
      title: '',
      platform: '',
      picture: '',
      category: '',
      rating: '',
    },
    description: '',
  });

  useEffect(() => {
    axios
      .get(
        `https://api.rawg.io/api/platforms?key=d124f7e507b7487ba9faa3cc51bfaabf`
      )
      .then((response) => {
        setConsoleList(response.data.results);
      });
    axios
      .get(`/api/get-user-by-id/${userId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setActiveUser(response.data);
      });
    axios
      .get(`/api/offer-by-id/${offerId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setDesiredGame(response.data.game);
        setNonActiveUser(response.data.user);
        setIsLoading(false);
      });
  }, [isLoading]);

  const handleChange = (e) => {
    axios
      .get(
        `https://api.rawg.io/api/games?key=d124f7e507b7487ba9faa3cc51bfaabf&search=${e.target.value}`,
        {
          params: {
            page_size: 5,
            search_exact: false,
            search_precise: true,
          },
        }
      )
      .then((response) => {
        setSearchedGameList(response.data.results);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const s = { ...offerToAdd };
    s.game.title = selectedGame.name;
    s.game.picture = selectedGame.background_image;
    s.game.category = selectedGame.genres[0].name;
    s.game.rating = selectedGame.rating;
    setOfferToAdd(s);

    axios
      .post(`/api/add-offer/${userId}`, offerToAdd, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.status === 201) {
          axios
            .get(`/api/get-offer/${response.data.title}`, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            })
            .then(() => {
              setGameToAddToDeal(response.data.game);
              const c = { ...deal };
              console.log(gameToAddToDeal);
              c.gameSent = gameToAddToDeal;
              setDeal(c);
              axios
                .post(`/api/add-deal`, deal, {
                  headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                  },
                })
                .then((response) => {
                  console.log(response.status);
                });
            });
        }
      });
  };

  return (
    <>
      <div className="trade-page-container">
        <div className="d-flex justify-content-center offer-card">
          <div
            className="card h-100"
            style={{ width: '18rem', marginTop: '20px' }}
          >
            <h4 style={{ marginTop: '15px' }}>
              <i>Your offer: </i>
            </h4>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                id="searchBar"
                type="search"
                placeholder="Enter game name..."
                aria-label="Search"
                onChange={handleChange}
              />
            </form>
            <div className="d-flex justify-content-center">
              <ul id="gameCard" className="search-container">
                {searchedGameList.map((game, index) => {
                  return (
                    <p key={index}>
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                          axios
                            .get(`https://api.rawg.io/api/games/${game.id}`)
                            .then((response) => {
                              setSelectedGame(response.data);
                              document.getElementById('gameCard').hidden = true;
                              document.getElementById(
                                'searchBar'
                              ).hidden = true;
                            });
                        }}
                      >
                        {game.name}
                      </div>
                    </p>
                  );
                })}
              </ul>
            </div>
            {selectedGame.background_image ? (
              <img
                className="card-img-top"
                src={selectedGame.background_image}
                alt="background-game"
              />
            ) : null}

            <div className="card-body">
              <h5 className="card-title">{selectedGame.name}</h5>
              <p className="card-text">
                Release year : {selectedGame.released}
              </p>
              <div className="input-group mb-3" style={{ marginTop: '15px' }}>
                <select
                  className="custom-select"
                  id="inputGroupSelect01"
                  required
                  onChange={(e) => {
                    const s = { ...deal };
                    s.userWhoSent = activeUser;
                    s.userWhoReceived = nonActiveUser;
                    s.gameWhoReceived = desiredGame;
                    setDeal(s);
                  }}
                >
                  <option defaultValue="">Select platform...</option>
                  {consoleList.map((console, index) => {
                    return (
                      <option key={index} value={console.name}>
                        {console.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button
                className="btn btn-outline-primary"
                onClick={handleSubmit}
              >
                Submit Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchGameToOffer;
