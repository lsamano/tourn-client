import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import MyPlaceholder from './MyPlaceholder';

import TournCard from './TournCard';

class Home extends Component {

  formatTournaments = tournaments => {
    return tournaments.map(tourn => <TournCard key={tourn.id} tournament={tourn} />)
  }

  // filterHostedTournments = () => {
  //   const filteredTournaments = this.props.tournaments.filter(tourn => tourn.host.id === this.props.user.id)
  //   return this.formatTournaments(filteredTournaments)
  // }

  render() {
    if (!localStorage.token) {
      return <Redirect to="/login" />
    }
    console.log("Home Props:", this.props);
    const {user, hosted_tourns, tournaments} = this.props
    return (
      <div>
        <h1><img className="ui avatar image" alt="" src={user.avatar}/>Welcome, {<Link to={`users/${user.id}`}>{user.username}</Link>}!</h1>
        <h2 className="ui header">Your Teams:</h2>
        <h2 className="ui header">Your Hosted Tournaments:</h2>
          <div className="ui middle aligned divided list">
            {hosted_tourns ? this.formatTournaments(hosted_tourns) : <MyPlaceholder /> }
          </div>
        <h2>Your Entered Tournaments:</h2>
          <div className="ui middle aligned divided list">
            {tournaments.length > 0 ? this.formatTournaments(tournaments) : <MyPlaceholder /> }
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.reducer.user,
    hosted_tourns: state.reducer.user.hosted_tourns,
    teams: state.reducer.user.teams,
    tournaments: state.reducer.user.teams.flatMap(team => team.tournaments)
  }
}
//
// const mapDispatchToProps = dispatch => ({
//     getTournaments: () => dispatch(getTournaments()),
//     getProfileFetch: () => dispatch(getProfileFetch())
// })

export default connect(mapStateToProps)(Home);
