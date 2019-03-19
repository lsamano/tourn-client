import React, {Component} from 'react';
import {connect} from 'react-redux';
import {teamUpdateFetch} from '../Redux/actions';
import { Button, Form } from 'semantic-ui-react';

class TeamEdit extends Component {
  state = {
    name: this.props.teamShown.name,
    tagline: this.props.teamShown.tagline,
    logo: this.props.teamShown.logo
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("Now starting the Update fetch for a team...");
    const teamInfo = {...this.state, captain_id: this.props.user.id, id: this.props.teamShown.id}
    console.log("This will be sent to teamUpdateFetch:", teamInfo);
    this.props.teamUpdateFetch(teamInfo);
  }

  render() {
    return (
      <Form onSubmit={ event => this.handleSubmit(event) }>
        <h1>Edit My Team</h1>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder='Name'
            name="name"
            value={this.state.name}
            onChange={(event) => this.handleChange(event)}
            />
        </Form.Field>
        <Form.Field>
          <label>Tagline</label>
          <input
            name="tagline"
            placeholder='Tagline'
            value={this.state.tagline}
            onChange={(event) => this.handleChange(event)}
            />
        </Form.Field>
        <Form.Field>
          <label>Logo</label>
          <input
            name="logo"
            placeholder='Logo (URL)'
            value={this.state.logo}
            onChange={(event) => this.handleChange(event)}
            />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  user: state.reducer.user
})

const mapDispatchToProps = (dispatch) => ({
    teamUpdateFetch: (tournInfo) => dispatch(teamUpdateFetch(tournInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamEdit);
