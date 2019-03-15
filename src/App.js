import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getTournaments, getProfileFetch} from './Redux/actions';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import NewTournamentForm from './Components/NewTournamentForm';
import Nav from './Components/Nav'

class App extends Component {
  componentDidMount = () => {
    this.props.getTournaments();
    this.props.getProfileFetch();
  }

    render() {
      console.log("Should see +1 or something...", this.props);
      return (
        <div className="app">
          <Route component={Nav}/>
          <div className="pusher">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/home" component={Home} />
              <Route path="/new-tournament" component={NewTournamentForm} />
            </Switch>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  tournaments: state.reducer.tournaments,
  user: state.reducer.user
})

const mapDispatchToProps = dispatch => ({
  getTournaments: () => dispatch(getTournaments()),
  getProfileFetch: () => dispatch(getProfileFetch())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
