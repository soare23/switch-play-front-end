import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchGameToOffer from './SearchGameToOffer';

export default function SearchGame() {
  const [display, setDisplay] = useState(true);
  const [containerDisplay, setContainerDisplay] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [options, setOptions] = useState([]);
  const [gamesList, setGames] = useState([]);
  const [offerId, setOfferId] = useState();

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

  console.log(offerId);
  return (
    <>
      <div className="d-flex justify-content-center">
        <h1 style={{ marginTop: '15px', fontSize: '30px' }}>
          Search for a game
        </h1>
      </div>
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
                        setGames(games);
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
          <div className="trade-offer-container">
            {gamesList.map((selectedGame) => (
              <div className="d-flex justify-content-center">
                <div
                  className="card h-100 game-result-card"
                  style={{ width: '18rem', marginTop: '20px' }}
                >
                  <img
                    className="card-img-top"
                    src={selectedGame.game.picture}
                    alt="game logo"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{selectedGame.game.title}</h5>
                    <p className="card-text">
                      Category : {selectedGame.game.category}
                    </p>
                    <p className="card-text">
                      User : {selectedGame.user.firstName}
                    </p>
                    <p className="card-text">
                      Rating : {selectedGame.game.rating}
                    </p>

                    <button
                      id="makeAnOffer"
                      onClick={() => {
                        setShowComponent(!showComponent);
                        document.getElementById('makeAnOffer').hidden = true;
                        setOfferId(selectedGame.id);
                      }}
                      className="btn btn-special"
                    >
                      Make an offer
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {showComponent ? <SearchGameToOffer offerId={offerId} /> : null}
          </div>
        ) : (
          <h1 className="no-games-message">
            Sorry, there are no offers available
          </h1>
        )}
      </div>
    </>
  );
}

// {showComponent ?
//     <SearchGameToOffer offerId={selectedGame.id}/> : null //
