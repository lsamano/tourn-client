import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfileFetch} from './redux/actions';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import Home from './components/Home';
import Nav from './components/Nav';
import TournContainer from './containers/TournContainer';
import UserContainer from './containers/UserContainer';
import TeamContainer from './containers/TeamContainer';
import NoRouteMatch from './components/NoRouteMatch';
import { Grid } from 'semantic-ui-react';

class App extends Component {
  componentDidMount = () => {
    this.props.getProfileFetch();
  }

    render() {
      console.log("The props of App:", this.props);
      return (
        <div className="ui container">
            <Grid>
              <Grid.Row>
                <Grid.Column width={3}>
                  <div className="ui container">
                    <Route component={Nav}/>
                  </div>
                </Grid.Column>
                <Grid.Column width={15}>
                  <div className="ui raised container segment">
                    <Switch>
                      <Route path="/login" component={Login} />
                      <Route path="/signup" component={Signup} />
                      <Route path="/tournaments" component={TournContainer} />
                      <Route path="/users" component={UserContainer} />
                      <Route path="/teams" component={TeamContainer} />
                      <Route exact path="/" component={Home} />
                      <Route path="/" component={NoRouteMatch} />
                    </Switch>
                  </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
