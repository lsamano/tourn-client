import React from 'react';
import {Link} from 'react-router-dom';

const TournCard = ({tournament}) => {
  return (
    <div className="item">
      <div className="content">
        <h3>{tournament.title}</h3>
        <div className="description">
          {tournament.description}
          <p><Link to={`/tournaments/${tournament.id}`}>See Tournament Info</Link></p>
        </div>
      </div>
    </div>
  )
}

export default TournCard;
