import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import moment from 'moment';
import TournSignup from './TournSignup';
import {connect} from 'react-redux';

const TournShow = ({tournament, user}) => {
  const formatTeams = () => {
    return tournament.teams.map(team =><div><Link to={`/teams/${team.id}`}>{team.name}</Link></div>)
  }

  console.log("Tournament Show:", tournament);
  return (
    <Switch>
      <Route path="/tournaments/:id/signup" component={TournSignup} />
      <Route render={() => {
        return <div>
          <Link to="/tournaments">See All Tournaments</Link>
          <h1 className="ui top attached inverted header">{tournament.title}
            <div className="sub header">{moment(tournament.start_dt).format('llll')}</div>
          </h1>
          <div className="ui attached segment">
            <p>Hosted by {tournament.host.username}</p>
            <p className="description">{tournament.description}</p>
            <Link to={`/tournaments/${tournament.id}/signup`}>
              <button className="ui button primary">Join This Tournament</button>
            </Link>
            {tournament.host.id === user.id
              ? <Link to={`/tournaments/${tournament.id}/signup`}>
                  <button className="ui button secondary">Edit Tournament</button>
                </Link>
              : null }
            <h3>Current Teams Entered:</h3>
              {formatTeams()}
          </div>
        </div>
        }
      } />
    </Switch>

  )
}

const mapStateToProps = state => ({
  user: state.reducer.user
})

export default connect(mapStateToProps)(TournShow);
