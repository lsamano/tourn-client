import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tournamentPatchFetch } from '../../redux/actions';
import { Button, Form } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import DeletionModal from '../DeletionModal';

class TournamentEdit extends Component {
  state = {
    title: this.props.tournament.title,
    image: this.props.tournament.image,
    description: this.props.tournament.description,
    start_dt: this.props.tournament.start_dt
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
    console.log("Now starting the Patch fetch for a tournament...");
    const tournInfo = {...this.state, host_id: this.props.user.id, id: this.props.tournament.id}
    console.log("This", tournInfo);
    this.props.clickHandler();
    this.props.tournamentPatchFetch(tournInfo);
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={ event => this.handleSubmit(event) }>
          <h1>Edit Tournament</h1>
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
        <DeletionModal id={this.props.tournament.id} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.reducer.user
})

const mapDispatchToProps = (dispatch) => ({
    tournamentPatchFetch: (tournInfo) => dispatch(tournamentPatchFetch(tournInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(TournamentEdit);
