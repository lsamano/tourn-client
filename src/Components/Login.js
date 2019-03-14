import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginFetch} from '../Redux/actions';
import { Button, Form } from 'semantic-ui-react';
// import history from './history'

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
    browserHistory.push('/home')
  }

  render() {
    if (this.props.user.id) {
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

const mapStateToProps = (state) => ({
    user: state.reducer.user
})

const mapDispatchToProps = (dispatch) => ({
    loginFetch: (userObj) => dispatch(loginFetch(userObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
