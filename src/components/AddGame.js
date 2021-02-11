import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

function AddGame(props) {
  const value = useContext(UserContext);
  const userId = value.userId;
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
    setSelectedGame({});
    document.getElementById('search-hints').hidden = false;
  };

  const addGame = (e) => {
    e.preventDefault();
    document.getElementById('alert').style.display = 'flex';
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
      .then(() =>
        setTimeout(() => {
          setSelectedGame({});
          document.getElementById('alert').style.display = 'none';
        }, 1000)
      );
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <h1
          style={{
            marginTop: '15px',
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

      <div
        className="success-message-container"
        id="alert"
        style={{ display: 'none' }}
      >
        <p className="gamed-added-message">Game offer added succesfuly!</p>
      </div>

      <div className="d-flex justify-content-center">
        <ul id="search-hints" className="search-container">
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
                        document.getElementById('search-hints').hidden = true;
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
              <div style={{ display: 'flex' }}>
                <p className="card-text">Genres:</p>
                <ul className="card-text">
                  {selectedGame.genres.map((genre) => (
                    <li>{genre.name}</li>
                  ))}
                </ul>
              </div>

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
