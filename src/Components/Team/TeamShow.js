import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Link} from 'react-router-dom';
import moment from 'moment';
// import TeamSignup from './TeamSignup';
import MemberCard from './MemberCard';
import TournCard from '../Tournament/TournCard';
import {getTeamFetch, membershipPostFetch} from '../../Redux/actions';
import TeamEdit from './TeamEdit';
import {Button, Icon, Card} from 'semantic-ui-react';

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

  joinClickHandler = () => {
    this.props.membershipPostFetch({team_id: this.props.teamShown.id, user_id:this.props.user.id})
  }

  formatMembers = () => {
    return (
      <Card.Group>
        {this.props.teamShown.members.map(member => <MemberCard member={member} key={member.id} team={this.props.teamShown}/>)}
      </Card.Group>
    )
  }

  formatTournaments = tournaments => {
      return tournaments.map(tourn => <TournCard key={tourn.id} tournament={tourn} />)
    }

  render() {
    console.log("Team Show:", this.props);
    const {teamShown, user} = this.props
    if (teamShown.id) {
      return (
        <div>
          {this.state.formVisible ? <TeamEdit teamShown={teamShown} clickHandler={this.clickHandler}/> : null}
                <h1 className="ui top attached inverted header">
                  <img className="ui avatar image" alt="" src={teamShown.logo}/>
                  {teamShown.name}
                  <div className="sub header"> {teamShown.tagline}</div>
                </h1>
                <div className="ui attached segment">
                  <p className="description">Founded {moment(teamShown.created_at).format('ll')} by <Link to={`/users/${teamShown.captain.id}`}>{teamShown.captain.username}</Link></p>
                  {teamShown.members.filter(member => member.id === user.id).length > 0
                    ? null
                    : <button className="ui button primary" onClick={this.joinClickHandler}>Join This Team</button>
                  }
                  {teamShown.captain.id === user.id
                    ? <Button icon onClick={this.clickHandler}>
                        <Icon name='edit'/>
                      </Button>
                    : null
                  }
                  <h3>Members ({teamShown.members.length})</h3>
                    {this.formatMembers()}
                  <h3>Entered Tournaments</h3>
                  <div className="ui middle aligned divided list">
                    {this.formatTournaments(teamShown.tournaments)}
                  </div>
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
  membershipPostFetch: (membershipObj) => dispatch(membershipPostFetch(membershipObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamShow);
