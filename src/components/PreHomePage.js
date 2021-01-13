import React from 'react';
import { Link } from 'react-router-dom';

function PreHomePage() {
  return (
    <div>
      <div className="card-container">
        <div className="card">
          <Link to="/add-game">
            <button>Switch a game</button>
          </Link>
        </div>

        <div className="card">
          <Link to="/search">
            <button>Search for a game</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PreHomePage;
