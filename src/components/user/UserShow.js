import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import TournCard from '../tournament/TournCard';
import TeamCard from '../team/TeamCard';
import UserEdit from './UserEdit';
import { Button, Icon, Card, Image } from 'semantic-ui-react';
import MyPlaceholder from '../MyPlaceholder';

class UserShow extends React.Component {
  state = {
    formVisible: false
  }

  clickHandler = () => {
    this.setState({
      formVisible: !this.state.formVisible
    })
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

  formatTournaments = tournaments => {
    return tournaments.map(tourn => <TournCard key={tourn.id} tournament={tourn} />)
  }

  formatHostedTournaments = tournaments => {
    if (tournaments.length === 0) {
      return "No Tournaments."
    } else {
      return (
        tournaments.map(tourn => <TournCard key={tourn.id} tournament={tourn} />)
      )
    }
  }

  render() {
    const { userShown, user } = this.props
    const currentUserToShow = parseInt(this.props.match.params.id)

    // This comparison ensures the page doesn't load the last team shown
    // (while the fetch is in progress) if the user is trying to view a
    // different team
    if (userShown.id === currentUserToShow) {
    return (
      <div>
        { this.state.formVisible
          && <UserEdit user={user} clickHandler={this.clickHandler}/>
        }
        <h1 className="ui top attached inverted header">
          <Image src={userShown.avatar} avatar />{ userShown.username }
            <div className="sub header">
              Member Since {moment(userShown.created_at).format("LL")}
            </div>
          </h1>
          <div className="ui attached segment orange">
            { userShown.id === user.id
              ? <Button icon onClick={this.clickHandler}>
                  <Icon name='edit'/>
                </Button>
              : null
            }
            <p className="description">{ userShown.bio }</p>
            <h3>Teams:</h3>
            {userShown.teams ? this.formatTeams(userShown.teams) : <MyPlaceholder /> }
            <h3>Hosted Tournaments:</h3>
            <div className="ui middle aligned divided list">
              { userShown.hosted_tourns
                ? this.formatTournaments(userShown.hosted_tourns)
                : <MyPlaceholder />
              }
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = state => ({
  user: state.reducer.user
})

export default connect(mapStateToProps)(UserShow);
