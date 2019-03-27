import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import MyPlaceholder from './MyPlaceholder';
import DeletionModal from './DeletionModal';
import TeamCard from './TeamCard';
import { Card, List } from 'semantic-ui-react'

import TournCard from './TournCard';

class Home extends Component {
  formatTournaments = tournaments => {
    if (tournaments.length === 0) {
      return "No Tournaments."
    } else {
      return (

        tournaments.map(tourn => <TournCard key={tourn.id} tournament={tourn} />)
      )
    }

  }

  formatTeams = teams => {
    if (teams.length === 0) {
      return "No Teams Yet. Join One!"
    } else {
      return (
        <Card.Group>
          {teams.map(team => <TeamCard key={team.id} team={team}/>)}
        </Card.Group>
      )
    }
  }

  render() {
    if (!localStorage.token) {
      return <Redirect to="/login" />
    }
    console.log("Home Props:", this.props);
    const {user, hosted_tourns, tournaments, teams} = this.props
    return (
      <div>
        <div className="ui container raised segment">
          <h1><img className="ui avatar image" alt="" src={user.avatar}/>Welcome, {<Link to={`users/${user.id}`}>{user.username}</Link>}!</h1>
        </div>
        <div className="ui container raised segment">
          <h2 className="ui header">Your Teams</h2>
          <div className="ui middle aligned divided list team-overflow">
            {teams ? this.formatTeams(teams) : <MyPlaceholder /> }
          </div>
          <h2 className="ui header">Your Hosted Tournaments</h2>
          <div className="ui middle aligned divided list">
            {hosted_tourns ? this.formatTournaments(hosted_tourns) : <MyPlaceholder /> }
          </div>
          <h2>Your Entered Tournaments</h2>
          <div className="ui middle aligned divided list">
            {tournaments ? this.formatTournaments(tournaments) : <MyPlaceholder /> }
          </div>
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
    // tournaments: state.reducer.user.teams.flatMap(team => team.tournaments)
  }
}
// /
// const mapDispatchToProps = dispatch => ({
//     getTournaments: () => dispatch(getTournaments()),
//     getProfileFetch: () => dispatch(getProfileFetch())
// })

export default connect(mapStateToProps)(Home);
