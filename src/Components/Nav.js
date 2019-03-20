import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOutUser} from '../Redux/actions';

const Nav = (props) => {
  const handleClick = () => {
    localStorage.removeItem("token")
    props.signOutUser()
  }

  return (
    <div className="ui left fixed vertical menu visible sidebar thin orange inverted">
    <div className="header item">
      <h1>Tourn</h1>
    </div>
    <Link to="/"><a className="item">Home</a></Link>
    <Link to={`/users/${props.user.id}`}><a className="item">My Profile</a></Link>
    <a className="item">Notifications</a>
    <div class="header item"></div>
    <Link to="/tournaments/new"><a className="item">Host Tournament</a></Link>
    <Link to="/teams/new"><a className="item">New Team</a></Link>
    <div class="header item"></div>
    <Link to="/tournaments"><a className="item">All Tournaments</a></Link>
    <a className="item">Search</a>
    <div class="header item"></div>
    <Link to="/login"><a className="item">Login</a></Link>
    <Link to="/signup"><a className="item">Sign Up</a></Link>
    <a className="item" onClick={handleClick}>Log Out</a>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.reducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => dispatch(signOutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
