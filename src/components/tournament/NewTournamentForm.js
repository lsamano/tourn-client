import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tournamentPostFetch } from '../../redux/actions';
import { Button, Form, Container } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';

class NewTournamentForm extends Component {
  state = {
    title: "",
    image: "",
    description: "",
    start_dt: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleDateChange = (event, {name, value}) => {
  if (this.state.hasOwnProperty(name)) {
    this.setState({ [name]: value });
  }
}

  handleSubmit = event => {
    event.preventDefault();
    console.log("Now starting the Post fetch for a tournament...");
    const tournInfo = {...this.state, host_id: this.props.user.id}
    console.log("This", tournInfo);
    this.props.tournamentPostFetch(tournInfo);
  }

  render() {
    return (
      <Container text>
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
            <label>Image</label>
            <input
              name="image"
              placeholder='Image (URL)'
              value={this.state.image}
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
          <DateTimeInput
            name="start_dt"
            placeholder="Date & Start Time"
            value={this.state.start_dt}
            iconPosition="left"
            onChange={this.handleDateChange}
          />
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
    tournamentPostFetch: (tournInfo) => dispatch(tournamentPostFetch(tournInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTournamentForm);
