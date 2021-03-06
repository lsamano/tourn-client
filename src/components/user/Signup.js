import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupFetch } from '../../redux/actions';
import { Button, Checkbox, Form, Grid } from 'semantic-ui-react';

class Signup extends Component {
  state = {
    username: "",
    password: "",
    bio: "",
    avatar: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.avatar === "") {
      this.props.signupFetch({...this.state, avatar: "https://robohash.org/default.png?size=300x300&set=set4"});
    } else {
      this.props.signupFetch(this.state);
    }
  }

  render() {
    if (this.props.user.id) {
      return <Redirect to="/" />
    }
    return (
      <Grid columns={4}>
        <Grid.Row>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <Form onSubmit={ this.handleSubmit }>
              <h1>Sign Up</h1>
              <Form.Field>
                <label>Username</label>
                <input
                  placeholder='Username'
                  name="username"
                  value={this.state.username}
                  onChange={ this.handleChange }
                  />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder='Password'
                  value={this.state.password}
                  onChange={ this.handleChange }
                  />
              </Form.Field>
              <Form.Field>
                <label>Avatar</label>
                <input
                  name="avatar"
                  placeholder='Avatar (URL)'
                  value={this.state.avatar}
                  onChange={ this.handleChange }
                  />
              </Form.Field>
              <Form.Field>
                <label>Bio</label>
                <textarea
                  name="bio"
                  placeholder='Bio'
                  value={this.state.bio}
                  onChange={ this.handleChange }
                  />
              </Form.Field>
              <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.reducer.user
  }
}

const mapDispatchToProps = (dispatch) => ({
    signupFetch: (userObj) => dispatch(signupFetch(userObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
