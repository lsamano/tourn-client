import React, { Component } from 'react';
import { connect } from 'react-redux';
import { teamPostFetch } from '../../redux/actions';
import { Button, Form, Container } from 'semantic-ui-react';

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
    const teamInfo = {...this.state, captain_id: this.props.user.id}
    if (this.state.logo === "") {
      this.props.teamPostFetch({
        ...teamInfo,
        logo: "https://robohash.org/default.png?size=300x300&set=set1"
      })
    } else {
      this.props.teamPostFetch(teamInfo)
    }
  }

  render() {
    return (
      <Container text>
        <Form onSubmit={ event => this.handleSubmit(event) }>
          <h1>Register a New Team</h1>
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
      </Container>
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
