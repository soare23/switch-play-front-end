import React from 'react';

function ActiveOffers({ offers }) {
  console.log(offers);
  return (
    <div>
      <h3>Active offers</h3>
      <table>
        <tr>
          <th>Game Title</th>
          <th>Condition</th>
          <th>Platform</th>
        </tr>
        {offers.map((offer) => (
          <tr>
            <td key={offer.title}>{offer.game.title}</td>
            <td>{offer.description}</td>
            <td>{offer.game.platform}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ActiveOffers;
