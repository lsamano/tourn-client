import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Switch, Route} from 'react-router-dom';

import UserShow from '../components/user/UserShow';
import {getUserFetch} from '../redux/actions';

class UserContainer extends Component {
  componentDidMount = () => {
    const id = this.props.location.pathname.substring(7)
    this.props.getUserFetch(id);
  }

  render() {
    console.log("User container rendered", this.props);
    if (!localStorage.token) {
      return <Redirect to="/login" />
    }
    return (
      <Switch>
        <Route path="/users/:id" render={routerProps => {
            console.log("These are your UserCont props", this.props);
            return (this.props.userShown ? <UserShow userShown={this.props.userShown} /> : null)
          }
        }/>
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
