import React from 'react';
// import {Link} from 'react-router-dom';

const UserShow = ({user}) => {
  console.log("User Being Shown:", user);
  return (
    <div>
      <h1 className="ui top attached inverted header red">
        <img className="ui avatar image" alt="" src={user.avatar}/>{user.username}
        <div className="sub header">----------</div>
      </h1>
      <div className="ui attached segment">
        <p className="description">{user.bio}</p>
        <h3>Teams:</h3>
        <h3>Hosted Tournaments:</h3>
      </div>
    </div>
  )
}

export default UserShow;
