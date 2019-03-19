import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import moment from 'moment';
import TournSignup from './TournSignup';
import {connect} from 'react-redux';
import TournamentEdit from './TournamentEdit';
import TeamDropDown from './TeamDropDown';

class TournShow extends React.Component {
  state = {
    formVisible: false,
    chosenTeam: {}
  }

  clickHandler = () => {
    this.setState({
      formVisible: !this.state.formVisible
    })
  }


  formatTeams = (teams) => {
    return teams.map(team =><div><Link to={`/teams/${team.id}`}>{team.name}</Link></div>)
  }

  render() {
    const {tournament, user} = this.props
    return (
      <Switch>
        <Route path="/tournaments/:id/signup" component={TournSignup} />
        <Route render={() => {
            return <div>
              {this.state.formVisible ? <TournamentEdit tournament={tournament} clickHandler={this.clickHandler}/> : null}
              <Link to="/tournaments">See All Tournaments</Link>
              <h1 className="ui top attached inverted header">{tournament.title}
                <div className="sub header">{moment(tournament.start_dt).format('llll')}</div>
              </h1>
              <div className="ui attached segment">
                <p>Hosted by {tournament.host.username}</p>
                <p className="description">{tournament.description}</p>
                <TeamDropDown teams={user.teams} tournament={tournament} enteredTeams={tournament.teams}/>
                {tournament.host.id === user.id
                  ? <button className="ui button secondary" onClick={this.clickHandler}>Edit Tournament</button>
                  : null
                }
                <h3>Current Teams Entered:</h3>
                {this.formatTeams(tournament.teams)}
              </div>
            </div>
          }
        } />
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  user: state.reducer.user
})

export default connect(mapStateToProps)(TournShow);
