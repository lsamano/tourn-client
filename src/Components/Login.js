import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginFetch} from '../Redux/actions';
import { Button, Checkbox, Form } from 'semantic-ui-react';

class Login extends Component {
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
    this.props.loginFetch(this.state);
  }

  render() {
    if (localStorage.token) {
      return <Redirect to="/home" />
    }
    return (
      <Form onSubmit={ event => this.handleSubmit(event) }>
        <h1>Login</h1>
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
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
    loginFetch: (userObj) => dispatch(loginFetch(userObj))
})

export default connect(null, mapDispatchToProps)(Login);
