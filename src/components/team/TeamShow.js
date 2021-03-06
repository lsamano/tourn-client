import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import moment from 'moment';
import MemberCard from './MemberCard';
import TournCard from '../tournament/TournCard';
import TeamDashboard from './TeamDashboard';
import {
  getTeamFetch,
  membershipPostFetch,
  membershipDeleteFetch,
  sendJoinRequestFetch
} from '../../redux/actions';
import TeamEdit from './TeamEdit';
import { Button, Icon, Card } from 'semantic-ui-react';

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

  quitClickHandler = () => {
    this.props.membershipDeleteFetch(this.props.teamShown.id)
  }

  requestClickHandler = () => {
    // send fetch request to make a team request
    this.props.sendJoinRequestFetch(this.props.teamShown.id)
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

  renderJoinButton = () => {
    const { teamShown, user } = this.props
    if (user.join_requests && user.join_requests.some(req => req.team_id === teamShown.id)) {
      return <button className="ui button gray" disabled> You Have Requested to Join This Team</button>
    } else if (user.teams && user.teams.some(team => team.id === teamShown.id)) {
      return <button className="ui button gray" disabled> You Are On This Team</button>
    } else {
      return <button className="ui button green" onClick={this.requestClickHandler}>Request to Join</button>
    }
  }

  render() {
    const { teamShown, user } = this.props
    const currentTeamToShow = parseInt(this.props.match.params.id)

    // This comparison ensures the page doesn't load the last team shown
    // (while the fetch is in progress) if the user is trying to view a
    // different team
    if (teamShown.id === currentTeamToShow) {
      return (
        <Switch>
          <Route path="/teams/:id/dashboard" component={TeamDashboard} />
          <Route render={() => {
              return (<div>
                {this.state.formVisible ? <TeamEdit teamShown={teamShown} clickHandler={this.clickHandler}/> : null}
                <h1 className="ui top attached inverted header">
                  <img className="ui avatar image" alt="" src={teamShown.logo}/>
                  {teamShown.name}
                  <div className="sub header"> {teamShown.tagline}</div>
                </h1>
                <div className="ui attached segment">
                  <p className="description">Founded {moment(teamShown.created_at).format('ll')} by <Link to={`/users/${teamShown.captain.id}`}>{teamShown.captain.username}</Link></p>
                  {teamShown.members.filter(member => member.id === user.id).length > 0
                    ? <button className="ui button red" onClick={this.quitClickHandler}>Leave This Team</button>
                    : <Fragment>
                    <button className="ui button primary" onClick={this.joinClickHandler}>Join This Team</button>
                  </Fragment>
                }
                { this.renderJoinButton() }
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
          </div>)
        }} />
      </Switch>
      )
    } else {
      this.props.getTeamFetch(currentTeamToShow)
      return null;
    }
  }
}

const mapStateToProps = state => ({
  user: state.reducer.user,
  teamShown: state.reducer.teamShown
})

const mapDispatchToProps = dispatch => ({
  getTeamFetch: id => dispatch(getTeamFetch(id)),
  membershipPostFetch: membershipObj => dispatch(membershipPostFetch(membershipObj)),
  membershipDeleteFetch: team_id => dispatch(membershipDeleteFetch(team_id)),
  sendJoinRequestFetch: team_id => dispatch(sendJoinRequestFetch(team_id))

})

export default connect(mapStateToProps, mapDispatchToProps)(TeamShow);
