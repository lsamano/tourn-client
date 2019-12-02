import React, { Component } from 'react'
import { Menu, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { signOutUser } from '../redux/actions';

class NavTwo extends Component {
  handleItemClick =  ( e, { name } ) => {
    if (name === "logout") {
      localStorage.removeItem("token")
      this.props.signOutUser()
    } else {
      this.setState({ activeItem: name })
      switch (name) {
        case 'home':
          return this.props.push('/');
        case 'all_tournaments':
          return this.props.push('/tournaments')
        case 'host_tournament':
          return this.props.push('/tournaments/new')
        case 'new_team':
          return this.props.push('/teams/new')
        case 'my_profile':
          return this.props.push(`/users/${this.props.user.id}`)
        default:
          return this.props.push(`/${name}`);
      }
    }
  }

  render() {
    const { activeItem } = this.state || {}

    return (
      <Menu vertical inverted fixed="left">
        <Menu.Item>
          <Menu.Header>
            <h1>
              <Icon name="winner" size="big"/> Tourn
            </h1>
          </Menu.Header>
        </Menu.Item>
        { this.props.user.id
          ? <React.Fragment>
            <Menu.Item>
              <Menu.Header><h3><Image src={this.props.user.avatar} avatar/> {this.props.user.username}</h3></Menu.Header>
            </Menu.Item>
            <Menu.Menu>
            <Menu.Item
              name='home'
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
              >Home<Icon name='home' /></Menu.Item>
            <Menu.Item
              name='my_profile'
              active={activeItem === 'my_profile'}
              onClick={this.handleItemClick}
              >My Profile<Icon name='user' /></Menu.Item>
              <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.handleItemClick}
              />
          </Menu.Menu>

          <Menu.Item>
            <Menu.Header>Create</Menu.Header>
          </Menu.Item>

            <Menu.Menu>
              <Menu.Item
                name='host_tournament'
                active={activeItem === 'host_tournament'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='new_team'
                active={activeItem === 'new_team'}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>

          <Menu.Item>
            <Menu.Header>Explore</Menu.Header>
          </Menu.Item>

            <Menu.Menu>
              <Menu.Item
                name='all_tournaments'
                active={activeItem === 'all_tournaments'}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>


          <Menu.Item >
            <Menu.Header>Support</Menu.Header>
          </Menu.Item>

            <Menu.Menu>
              <Menu.Item name='faq' active={activeItem === 'faq'} onClick={this.handleItemClick}>
                FAQs
              </Menu.Item>
              <Menu.Item name='terms_and_conditions' active={activeItem === 'terms_and_conditions'} onClick={this.handleItemClick}>
                Terms and Conditions
              </Menu.Item>
              <Menu.Item name='email' active={activeItem === 'email'} onClick={this.handleItemClick}>
                E-mail Support
              </Menu.Item>
              <Menu.Item name='contact_us' active={activeItem === 'contact_us'} onClick={this.handleItemClick}>
                Contact Us
              </Menu.Item>
            </Menu.Menu>
        </React.Fragment>
          : <React.Fragment>
          <Menu.Item>
            <Menu.Menu>
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='signup'
                active={activeItem === 'signup'}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>
        </React.Fragment>
        }
      </Menu>
    )
  }
}

const mapStateToProps = state => ({
    user: state.reducer.user
  })

const mapDispatchToProps = dispatch => ({
    signOutUser: () => dispatch(signOutUser()),
    push: (path) => dispatch(push(path))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavTwo);
