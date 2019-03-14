import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
// import {doTheSignupThing} from '../Redux/actions';
import {signupFetch} from '../Redux/actions';
import { Button, Checkbox, Form } from 'semantic-ui-react';

class Signup extends Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("Now starting the fetch...");
    this.props.signupFetch({
      username: this.state.username,
      password: this.state.password
    });
  }

  render() {
    // must fix below to set up routes
    if (localStorage.token) {
      return <Redirect to="/home" />
    }
    return (
      <Form onSubmit={ event => this.handleSubmit(event) }>
        <h1>Sign Up</h1>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder='Username'
            name="username"
            value={this.state.username}
            onChange={(event) => this.handleChange(event)}
            />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder='Password'
            value={this.state.password}
            onChange={(event) => this.handleChange(event)}
            />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => ({
    signupFetch: (userObj) => dispatch(signupFetch(userObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
