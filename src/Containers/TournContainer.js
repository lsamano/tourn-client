import React, {Component} from 'react';
import {connect} from 'react-redux';
import TournCard from '../Components/TournCard';
import TournShow from '../Components/TournShow';
import NewTournamentForm from '../Components/NewTournamentForm';
import {Redirect, Switch, Route} from 'react-router-dom';
import {getTournaments} from '../Redux/actions';

class TournContainer extends Component {
  componentDidMount = () => {
    this.props.getTournaments();
  }

  formatTournaments = tournaments => {
    return tournaments.map(tourn => <TournCard key={tourn.id} tournament={tourn} />)
  }

  render() {
    console.log("Tourn container rendered", this.props);
    if (!localStorage.token) {
      return <Redirect to="/login" />
    }
    // <Route path="/tournaments/:id" render={routerProps => {
    //     let id = parseInt(routerProps.match.params.id);
    //     let tournament = this.props.tournaments.find(tournament => tournament.id === id);
    //     console.log(this.props.tournaments, tournament);
    //     return (tournament ? <TournShow tournament={tournament} /> : null)
    //   }
    // }/>
    return (
      <Switch>
        <Route path="/tournaments/new" component={NewTournamentForm} />
        <Route path="/tournaments/:id" component={TournShow}/>
        <Route exact path="/tournaments" render={() =>(
          <div>
            <h2 className="ui header">All Tournaments</h2>
              <div className="ui middle aligned divided list">
                {this.formatTournaments(this.props.tournaments)}
              </div>
          </div>
        )}/>
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  tournaments: state.reducer.tournaments,
  user: state.reducer.user
})

const mapDispatchToProps = dispatch => ({
  getTournaments: () => dispatch(getTournaments())
})

export default connect(mapStateToProps, mapDispatchToProps)(TournContainer);
