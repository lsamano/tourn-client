import React from 'react';

const TournCard = ({tournament}) => {
  return (
    <div className="item">
      <div className="content">
        <h3>{tournament.title}</h3>
        <div className="description">
          {tournament.description}
        </div>
      </div>
    </div>
  )
}

export default TournCard;
