import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import TeamShow from '../components/team/TeamShow';
import TeamIndex from '../components/team/TeamIndex';
import NewTeamForm from '../components/team/NewTeamForm';
import { getTeams } from '../redux/actions';

class TeamContainer extends Component {
  componentDidMount = () => {
    this.props.getTeams()
  }

  render() {
    if (!localStorage.token) {
      return <Redirect to="/login" />
    }

    return (
      <Switch>
        <Route exact path="/teams" component={TeamIndex}/>
        <Route path="/teams/new" component={NewTeamForm}/>
        <Route path="/teams/:id" component={TeamShow}/>
      </Switch>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getTeams: () => dispatch(getTeams())
})

export default connect(null, mapDispatchToProps)(TeamContainer);
