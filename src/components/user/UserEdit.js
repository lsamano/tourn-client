import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userPatchFetch } from '../../redux/actions';
import { Button, Form } from 'semantic-ui-react';
import { push } from 'connected-react-router';

class UserEdit extends Component {
  state = {
    username: this.props.user.username,
    password: this.props.user.password,
    bio: this.props.user.bio,
    avatar: this.props.user.avatar
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.userPatchFetch({...this.state, id: this.props.user.id})
    .then(() => {
      if (this.props.clickHandler) {
        this.props.clickHandler();
      } else {
        this.props.push(`/users/${this.props.user.id}`)
      }
    })
  }

  render() {
    return (
            <Form onSubmit={ this.handleSubmit }>
              <h1>Update Profile</h1>
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
              <Button type='submit'>Submit</Button>
            </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.reducer.user
  }
}

const mapDispatchToProps = (dispatch) => ({
    userPatchFetch: (userObj) => dispatch(userPatchFetch(userObj)),
    push: (url) => dispatch(push(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
