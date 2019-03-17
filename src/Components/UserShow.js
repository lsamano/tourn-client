import React from 'react';
import {Link} from 'react-router-dom';

const UserShow = ({user}) => {
  console.log("Userament Show:", user);
  return (
    <div>
      <Link to="/users">See All Users</Link>
      <h1 className="ui top attached inverted header">{user.username}
        <div className="sub header">May 5th, 2019, 05:00 ET</div>
      </h1>
      <div className="ui attached segment">
        <p className="description">{user.bio}</p>
        <h3>Current Teams Entered:</h3>
      </div>
    </div>
  )
}

export default UserShow;
