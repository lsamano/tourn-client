import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Link} from 'react-router-dom';
import moment from 'moment';
// import TeamSignup from './TeamSignup';
import TournCard from './TournCard';
import {getTeamFetch} from '../Redux/actions';
import TeamEdit from './TeamEdit';

// <Route path="/teams/:id/signup" component={TeamSignup} />
class TeamShow extends React.Component {
  state = {
    formVisible: false
  }

  componentDidMount = () => {
    this.props.getTeamFetch(this.props.match.params.id);
  }

  clickHandler = () => {
    this.setState({
      formVisible: !this.state.formVisible
    })
  }

  formatMembers = () => {
    return this.props.teamShown.members.map(member => <h4><Link to={`/users/${member.id}`}><img className="ui avatar image" alt="" src={member.avatar}/>{member.username}</Link></h4>)
  }

  formatTournaments = tournaments => {
      return tournaments.map(tourn => <TournCard key={tourn.id} tournament={tourn} />)
    }

  render() {
    console.log("Team Show:", this.props);
    const {teamShown, user} = this.props
    if (teamShown) {
      return (
        <div>
          {this.state.formVisible ? <TeamEdit teamShown={teamShown}/> : null}
                <h1 className="ui top attached inverted header">{teamShown.name}
                  <div className="sub header"> {teamShown.tagline}</div>
                </h1>
                <div className="ui attached segment">
                  <p className="description">{moment(teamShown.created_at).format('llll')}</p>
                  <p>Captain: {teamShown.captain.username}</p>
                  <Link to={`/teams/${teamShown.id}/signup`}>
                    <button className="ui button primary">Join This Team</button>
                  </Link>
                  {teamShown.captain.id === user.id
                    ? <button className="ui button secondary" onClick={this.clickHandler}>Edit Team</button>
                    : null }
                  <h3>Members ({teamShown.members.length})</h3>
                  {this.formatMembers()}

                  <h3>Entered Tournaments</h3>
                  {this.formatTournaments(teamShown.tournaments)}

                </div>
              </div>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  user: state.reducer.user,
  teamShown: state.reducer.teamShown
})

const mapDispatchToProps = dispatch => ({
  getTeamFetch: (id) => dispatch(getTeamFetch(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamShow);
