import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Switch, Route} from 'react-router-dom';

import TeamShow from '../Components/TeamShow';
import NewTeamForm from '../Components/NewTeamForm';

class TeamContainer extends Component {
  // componentDidMount = () => {
  //   const id = this.props.location.pathname.substring(7)
  //   this.props.getTeamFetch(id);
  // }
  //

  render() {
    console.log("Team container rendered", this.props);
    if (!localStorage.token) {
      return <Redirect to="/login" />
    }
  //   <Route path="/teams/:id" render={routerProps => {
  //     console.log("These are your TeamCont props", this.props);
  //     return (this.props.teamShown ? <TeamShow team={this.props.teamShown} /> : null)
  //   }
  // }/>
    return (
      <Switch>
        <Route path="/teams/new" component={NewTeamForm}/>
        <Route path="/teams/:id" component={TeamShow}/>
        <Route path="/teams" render={() =>(
          <div>
          Seeing all teams might be strange, no?
          </div>
        )}/>
      </Switch>
    )
  }
}

const mapStateToProps = state => ({
  user: state.reducer.user,
  teamShown: state.reducer.teamShown
})

// const mapDispatchToProps = dispatch => ({
//   getTeamFetch: (id) => dispatch(getTeamFetch(id)),
// })

export default connect(mapStateToProps)(TeamContainer);
