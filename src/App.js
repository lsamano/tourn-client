import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfileFetch} from './Redux/actions';
import Login from './Components/User/Login';
import Signup from './Components/User/Signup';
import Home from './Components/Home';
import NavTwo from './Components/NavTwo';
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
        <div className="ui container">
            <Grid>
              <Grid.Row>
                <Grid.Column width={3}>
                  <div className="ui container">
                    <Route component={NavTwo}/>
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
