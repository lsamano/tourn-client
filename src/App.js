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
import TeamContainer from './Containers/TeamContainer';
import NoRouteMatch from './Components/NoRouteMatch';
import { Grid } from 'semantic-ui-react';

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
            <Grid>
              <Grid.Row>
                <Grid.Column width={10}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/tournaments" component={TournContainer} />
              <Route path="/users" component={UserContainer} />
              <Route path="/teams" component={TeamContainer} />
              <Route exact path="/" component={Home} />
              <Route path="/" component={NoRouteMatch} />
            </Switch>
              </Grid.Column>
              <Grid.Column width={3}></Grid.Column>
            </Grid.Row>
          </Grid>
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
