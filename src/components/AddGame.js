import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddGame(props) {
  //TODO user id will be from the token in the future
  const userId = 'b25cb075-b409-4f6d-a831-5ef78892590d';

  const [searchedGameList, setSearchedGameList] = useState([]);
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
  const [selectedGame, setSelectedGame] = useState({});
  const [consoleList, setConsoleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://api.rawg.io/api/platforms?key=d124f7e507b7487ba9faa3cc51bfaabf`
      )
      .then((response) => {
        setConsoleList(response.data.results);
        setIsLoading(false);
      });
  }, [isLoading]);

  const handleChange = (e) => {
    axios
      .get(
        `https://api.rawg.io/api/games?key=d124f7e507b7487ba9faa3cc51bfaabf&search=${e.target.value}`
      )
      .then((response) => {
        setSearchedGameList(response.data.results);
      });
  };

  const addGame = (e) => {
    e.preventDefault();
    const s = { ...offerToAdd };
    s.game.title = selectedGame.name;
    s.game.picture = selectedGame.background_image;
    s.game.category = selectedGame.genres[0].name;
    s.game.rating = selectedGame.rating;
    setOfferToAdd(s);
    axios
      .post(`/api/add-offer/${userId}`, offerToAdd)
      .then(() => alert('Game added successfully !'));
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <h1
          style={{
            marginTop: '15px',
            fontFamily: "'Source Serif Pro', serif",
            fontSize: '30px',
          }}
        >
          Add a game
        </h1>
      </div>

      <div className="d-flex justify-content-center">
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Enter game name..."
            aria-label="Search"
            onChange={handleChange}
          />
        </form>
      </div>

      <div className="d-flex justify-content-center">
        <ul id="gameCard">
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

      {Object.keys(selectedGame).length !== 0 && (
        <div className="d-flex justify-content-center">
          <div className="card" style={{ width: '18rem', marginTop: '20px' }}>
            <img
              className="card-img-top"
              src={selectedGame.background_image}
              alt="background-game"
            />
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
                    const s = { ...offerToAdd };
                    s.game.platform = e.target.value;
                    setOfferToAdd(s);
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
                <input
                  style={{ marginTop: '15px', width: '246px' }}
                  type="text"
                  placeholder="Description (Ex. : game is used)"
                  onChange={(e) => {
                    const s = { ...offerToAdd };
                    s.description = e.target.value;
                    setOfferToAdd(s);
                  }}
                />
              </div>
              <button
                href={'#'}
                className="btn btn-outline-primary"
                onClick={addGame}
              >
                Add Game
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddGame;
