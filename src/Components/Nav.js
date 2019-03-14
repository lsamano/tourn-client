import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
  // These links don't work currently; issue with rerendering
  return (
    <div className="ui left fixed inverted vertical menu visible sidebar thin">
    <div className="item">
      <h1>Tourn</h1>
    </div>
    <Link to="/home"><a className="item">Home</a></Link>
    <a className="item">Search</a>
    <Link to="/new-tournament"><a className="item">Host Tournament</a></Link>
    <Link to="/login"><a className="item">Sign-in</a></Link>
    </div>
  )
}

export default Nav;
