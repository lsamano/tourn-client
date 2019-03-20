import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Link} from 'react-router-dom';
import moment from 'moment';
import TournCard from './TournCard';
import UserEdit from './UserEdit';
import {Button, Icon} from 'semantic-ui-react';

class UserShow extends React.Component {
  state = {
    formVisible: false
  }

  componentDidMount = () => {
    // this.props.getTeamFetch(this.props.match.params.id);
  }

  clickHandler = () => {
    this.setState({
      formVisible: !this.state.formVisible
    })
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
    const {userShown, user} = this.props
    console.log("User Being Shown:", userShown);
    return (
      <div>
        {this.state.formVisible ? <UserEdit user={user} clickHandler={this.clickHandler}/> : null}
        <h1 className="ui top attached inverted header">
          <img className="ui avatar image" alt="" src={userShown.avatar}/>{userShown.username}
            <div className="sub header">----------</div>
          </h1>
          <div className="ui attached segment orange">
            {userShown.id === user.id
              ? <Button icon onClick={this.clickHandler}>
                  <Icon name='edit'/>
                </Button>
              : null }
            <p className="description">{userShown.bio}</p>
            <h3>Teams:</h3>
            {this.formatTeams(userShown.teams)}
            <h3>Hosted Tournaments:</h3>
            {this.formatHostedTournaments(userShown.hosted_tourns)}
          </div>
        </div>
      )
  }
}

const mapStateToProps = state => ({
  user: state.reducer.user
})

export default connect(mapStateToProps)(UserShow);
