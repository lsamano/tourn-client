import React, {Component} from 'react';
import {connect} from 'react-redux';
import {teamPostFetch} from '../Redux/actions';
import { Button, Form } from 'semantic-ui-react';

class NewTeamForm extends Component {
  state = {
    name: "",
    tagline: "",
    logo: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("Now starting the Post fetch for a team...");
    const teamInfo = {...this.state, captain_id: this.props.user.id}
    console.log("This will be sent to teamPostFetch:", teamInfo);
    if (this.state.logo === "") {
      this.props.teamPostFetch({...teamInfo, logo: "https://robohash.org/default.png?size=300x300&set=set1"});

    } else {
      this.props.teamPostFetch(teamInfo);

    }
  }

  render() {
    return (
      <Form onSubmit={ event => this.handleSubmit(event) }>
        <h1>New Team Form</h1>
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
    teamPostFetch: (tournInfo) => dispatch(teamPostFetch(tournInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTeamForm);
