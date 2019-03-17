import React, {Component} from 'react';
import {connect} from 'react-redux';
import {tournamentPostFetch} from '../Redux/actions';
import { Button, Form } from 'semantic-ui-react';

class NewTournamentForm extends Component {
  state = {
    title: "",
    description: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("Now starting the Post fetch for a tournament...");
    const tournInfo = {...this.state, host_id: this.props.user.id}
    console.log("This", tournInfo);
    this.props.tournamentPostFetch(tournInfo);
  }

  render() {
    return (
      <Form onSubmit={ event => this.handleSubmit(event) }>
        <h1>New Tournament Form</h1>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder='Title'
            name="title"
            value={this.state.title}
            onChange={(event) => this.handleChange(event)}
            />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <textarea
            name="description"
            placeholder='Description'
            value={this.state.description}
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
    tournamentPostFetch: (tournInfo) => dispatch(tournamentPostFetch(tournInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTournamentForm);
