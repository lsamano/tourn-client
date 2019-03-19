import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Link} from 'react-router-dom';
import moment from 'moment';
import TournCard from './TournCard';


class UserShow extends React.Component {
  componentDidMount = () => {
    // this.props.getTeamFetch(this.props.match.params.id);
  }

  formatTeams = teams => {
    return teams.map(team => <h4><Link to={`/teams/${team.id}`}>{team.name}</Link></h4>)
  }

  formatTournaments = tournaments => {
      return tournaments.map(tourn => <TournCard key={tourn.id} tournament={tourn} />)
    }

  formatHostedTournaments = tournaments => {
      return tournaments.map(tourn => <TournCard key={tourn.id} tournament={tourn} />)
    }

  render() {
    const {user} = this.props
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
            {this.formatTeams(user.teams)}
            <h3>Hosted Tournaments:</h3>
            {this.formatHostedTournaments(user.hosted_tourns)}
          </div>
        </div>
      )
  }
}

export default UserShow;
