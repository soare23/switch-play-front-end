import React from 'react';
import { Link } from 'react-router-dom';
import RecievedDeals from './RecievedDeals';

function ActiveOffers({ offers }) {
  return (
    <div>
      <h3>Active offers</h3>
      <table>
        <tr>
          <th>Game Title</th>
          <th>Condition</th>
          <th>Platform</th>

          <th>Recieved Deals</th>
        </tr>
        {offers.map((offer, index) => (
          <tr key={index}>
            <td key={offer.title}>{offer.game.title}</td>
            <td>{offer.description}</td>
            <td>{offer.game.platform}</td>
            <Link
              to={{
                pathname: '/recieved-deals',
                gameId: offer.game.id,
                gameTitle: offer.game.title,
              }}
            >
              <button className="btn btn-special">Check</button>
            </Link>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ActiveOffers;
