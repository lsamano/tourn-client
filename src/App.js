import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
// import MoviesContainer from './containers/MoviesContainer';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
