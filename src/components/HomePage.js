import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../HomePage.css';
import { UserContext } from './UserContext';

function HomePage() {
  const userDetails = useContext(UserContext);

  return (
    <div>
      <div className="card-container">
        {userDetails !== undefined ? (
          <Link to="/add-game">
            <div className="card-home-page card-add"></div>
          </Link>
        ) : (
          <Link to="/login">
            <div className="card-home-page card-add"></div>
          </Link>
        )}

        <Link to="/search-game">
          <div className="card-home-page card-search"></div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
