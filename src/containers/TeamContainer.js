import React, {Component} from 'react';
import {Redirect, Switch, Route} from 'react-router-dom';

import TeamShow from '../components/team/TeamShow';
import NewTeamForm from '../components/team/NewTeamForm';

class TeamContainer extends Component {
  render() {
    console.log("Team container rendered", this.props);
    if (!localStorage.token) {
      return <Redirect to="/login" />
    }

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

export default TeamContainer;
