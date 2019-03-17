import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserShow from '../Components/UserShow';
import {Redirect} from 'react-router-dom';

import {Switch, Route} from 'react-router-dom';

class UserContainer extends Component {
  componentDidMount = () => {
    // this.props.getUserShown();
  }

  render() {
    console.log("User container rendered", this.props);
    if (!localStorage.token) {
      return <Redirect to="/login" />
    }
    return (
      <Switch>
        <Route path="/" render={() =>(
          <div>
            Seeing all users might be strange, no?
          </div>
        )}/>
        <Route path="/users/:id" render={routerProps => {
            let id = routerProps.match.params.id;
            let user = this.props.users.find(user => user.id === id);
            console.log("This is the user being shown:", user);
            return (user ? <UserShow user={user} /> : null)
          }
        }/>
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  user: state.reducer.user,
  users: state.reducer.users
})

const mapDispatchToProps = dispatch => ({
  // getUserShown: () => dispatch(getUserShown()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
