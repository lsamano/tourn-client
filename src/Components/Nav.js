import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOutUser} from '../Redux/actions';

const Nav = props => {
  const handleClick = () => {
    localStorage.removeItem("token")
    props.signOutUser()
  }

  return (
    <div className="ui left fixed vertical menu visible sidebar thin red inverted">
    <div className="item">
      <h1>Tourn</h1>
    </div>
    <Link to="/home"><a className="item">Home</a></Link>
    <a className="item">Search</a>
    <Link to="/tournaments/new"><a className="item">Host Tournament</a></Link>
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
