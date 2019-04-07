import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import moment from 'moment';
import TournBracket from './TournBracket';
import TournDashboard from './TournDashboard';
import {connect} from 'react-redux';
import TournamentEdit from './TournamentEdit';
import TeamDropDown from './TeamDropDown';
import {Button, Icon, Image, Header} from 'semantic-ui-react';
import {makeBracket, getTournFetch} from '../../redux/actions';
import MyPlaceholder from '../MyPlaceholder';

class TournShow extends React.Component {
  state = {
    formVisible: false,
    chosenTeam: {}
  }

  componentDidMount = () => {
    this.props.getTournFetch(this.props.match.params.id);
  }

  clickHandler = () => {
    this.setState({
      formVisible: !this.state.formVisible
    })
  }


  formatTeams = (teams) => {
    return teams.map(team =><div><Link to={`/teams/${team.id}`}>{team.name}</Link></div>)
  }

  makeBracket = () => {
    const {tournament} = this.props
    // check if appropriate # of entrants and then
    if (tournament.teams.length === 8) {
      // run the fetch from props
      this.props.makeBracket(tournament)
    }
  }

  render() {
    const {tournament, user} = this.props
    return (
      <Switch>
        <Route path="/tournaments/:id/bracket" component={TournBracket} />
        <Route path="/tournaments/:id/dashboard" component={TournDashboard} />
        <Route render={() => {
            if (!tournament.id) {
              return <MyPlaceholder/>
            } else {
              return <div>
                {this.state.formVisible ? <TournamentEdit tournament={tournament} clickHandler={this.clickHandler}/> : null}
                <Link to="/tournaments">See All Tournaments</Link>
                <h1 className="ui top attached inverted header">
                  <Image avatar src={tournament.image}/>
                  {tournament.title}
                  <div className="sub header">{moment(tournament.start_dt).format('llll')}</div>
                </h1>
                <div className="ui attached segment">
                  <p>{tournament.host.id === user.id
                    ? <Button icon onClick={this.clickHandler}>
                        <Icon name='edit'/>
                      </Button>
                    : null
                  } Hosted by <Link to={`/users/${tournament.host.id}`}>{tournament.host.username}</Link></p>
                <Header>Description</Header>
                  <p className="description">{tournament.description}</p>
                  {tournament.bracket
                  ? <Link to={`/tournaments/${tournament.id}/bracket`}><Button>See Bracket</Button></Link>
                  : <React.Fragment><TeamDropDown teams={user.teams} tournament={tournament} enteredTeams={tournament.teams}/>
                    <Button onClick={this.makeBracket}>Make Bracket</Button></React.Fragment>}
                  <h3>Current Teams Entered</h3>
                  {tournament.teams.length > 0 ? this.formatTeams(tournament.teams) : "No Teams Entered. Be the first!"}
                </div>
              </div>
            }
          }
        } />
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  user: state.reducer.user,
  tournament: state.reducer.tournShown
})

const mapDispatchToProps = dispatch => ({
  getTournFetch: (id) => dispatch(getTournFetch(id)),
  makeBracket: (tournament) => dispatch(makeBracket(tournament))
})

export default connect(mapStateToProps, mapDispatchToProps)(TournShow);
