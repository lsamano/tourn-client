import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import {entryPostFetch} from '../../redux/actions';
import {connect} from 'react-redux';

class TeamDropDown extends React.Component {
  state = {
    team_id: ""
  }

  formattedTeams = () => {
    if (this.props.teams) {
      return this.props.teams.map(team => {
        return {key:team.id, text:team.name, value:team.id}
      })
    }
  }

  handleChange  = (event, {value}) => {
    console.log(value);
    this.setState({
      team_id: value
    })
}

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.team_id && !this.props.enteredTeams.filter(team => team.id === this.state.team_id).length > 0) {
      const entryInfo = {...this.state, tournament_id: this.props.tournament.id}
      this.props.entryPostFetch(entryInfo);
    }
    // else render a warning message
  }

  render() {
    return (
      <div>
      <Dropdown
      placeholder='Select a Team'
      fluid
      selection
      options={this.formattedTeams()}
      name="team"
      onChange={(event, data) => this.handleChange(event, data)}
      />
      <button className="ui button primary" onClick={this.handleSubmit}>Join This Tournament</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  entryPostFetch: (entryInfo) => dispatch(entryPostFetch(entryInfo))
})

export default connect(null, mapDispatchToProps)(TeamDropDown);
