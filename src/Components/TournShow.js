import React from 'react';

const TournShow = ({tournament}) => {
  console.log("Tournament Show:", tournament);
  return (
    <div>
      <h1 className="ui top attached inverted header">{tournament.title}
        <div className="sub header">May 5th, 2019, 05:00 ET</div>
      </h1>
      <div className="ui attached segment">
        <p>Hosted by {tournament.host.username}</p>
        <p className="description">{tournament.description}</p>
        <h3>Current Teams Entered:</h3>
      </div>
    </div>
  )
}

export default TournShow;
