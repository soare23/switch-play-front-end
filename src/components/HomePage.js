import React from 'react';
import { Link } from 'react-router-dom';
import '../HomePage.css';

function HomePage() {
  return (
    <div>
      <div className="card-container">
        <Link to="/add-game">
          <div className="card card-add"></div>
        </Link>

        <Link to="/search-game">
          <div className="card card-search"></div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
