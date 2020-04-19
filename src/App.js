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
import TermsPage from './components/TermsPage';
import { Grid } from 'semantic-ui-react';

class App extends Component {
  componentDidMount = () => {
    this.props.getProfileFetch();
  }

    render() {
      return (
        <div className="ui container">
            <Grid>
              <Grid.Row>
                <Grid.Column width={2}>
                  <div className="ui container">
                    <Route component={Nav}/>
                  </div>
                </Grid.Column>
                <Grid.Column width={13}>
                  <div className="ui raised container segment">
                    <Switch>
                      <Route path="/login" component={Login} />
                      <Route path="/signup" component={Signup} />
                      <Route path="/tournaments" component={TournContainer} />
                      <Route path="/users/:id" component={UserContainer} />
                      <Route path="/teams" component={TeamContainer} />
                      <Route path="/terms_and_conditions" component={TermsPage} />
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
