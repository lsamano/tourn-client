import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfileFetch} from './Redux/actions';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Nav from './Components/Nav';
import TournContainer from './Containers/TournContainer';
import UserContainer from './Containers/UserContainer';
import NoRouteMatch from './Components/NoRouteMatch';

class App extends Component {
  componentDidMount = () => {
    this.props.getProfileFetch();
  }

    render() {
      console.log("The props of App:", this.props);
      return (
        <div className="app">
          <Route component={Nav}/>
          <div className="pusher">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/tournaments" component={TournContainer} />
              <Route path="/users" component={UserContainer} />
              <Route exact path="/" component={Home} />
              <Route path="/" component={NoRouteMatch} />
            </Switch>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
  user: state.reducer.user
})

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
