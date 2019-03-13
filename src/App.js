import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
// import MoviesContainer from './containers/MoviesContainer';
import Login from './Components/Login';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/login" component={Login} />

        </Switch>
      </div>
    );
  }
}

export default App;
