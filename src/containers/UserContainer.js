import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';

import UserShow from '../components/user/UserShow';
import Settings from '../components/user/Settings';
import NoRouteMatch from '../components/NoRouteMatch';
import { getUserFetch } from '../redux/actions';

class UserContainer extends Component {
  componentDidMount = () => {
    this.runFetch();
  }

  renderUserShow = routerProps => {
    return (this.props.userShown && !this.props.userShown.status ? <UserShow userShown={this.props.userShown} {...routerProps} /> : <NoRouteMatch/> )
  }

  runFetch = () => {
    const id = this.props.match.params.id
    this.props.getUserFetch(id);
  }

  render() {
    if (!localStorage.token) {
      return <Redirect to="/login" />
    }

    // This comparison ensures the page doesn't load the wrong user
    // while the fetch is in progress and starts the fetch if needed
    const currentUserToShow = parseInt(this.props.match.params.id)
    if (this.props.userShown.id !== currentUserToShow) {
      this.runFetch();
      return "Loading..."
    }

    return (
      <Switch>
        <Route path="/users/:id/edit" component={Settings} />
        <Route path="/users/:id" render={this.renderUserShow} />
        <Route path="/users" render={() =>(
          <div>
            Seeing all users might be strange, no?
          </div>
        )}/>
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  user: state.reducer.user,
  userShown: state.reducer.userShown
})

const mapDispatchToProps = dispatch => ({
  getUserFetch: (id) => dispatch(getUserFetch(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
