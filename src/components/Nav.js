import React, { Component } from 'react'
import { Menu, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { signOutUser } from '../redux/actions';
import { Link } from 'react-router-dom';

class NavTwo extends Component {
  handleItemClick =  ( e, { name } ) => {
    if (name === "logout") {
      localStorage.removeItem("token")
      this.props.signOutUser()
    } else {
      this.setState({ activeItem: name })
    }
  }

  formatTeamsNav = () => {
    const { activeItem } = this.state || {}
    return this.props.user.teams.map(team =>
      <Menu.Item
        name={`${team.id}`}
        as={Link} to={`/teams/${team.id}/dashboard`}
        active={activeItem === `${team.id}`}
        onClick={this.handleItemClick}
        key={team.id} >
        {team.name}
      </Menu.Item>
    )
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
              as={Link} to="/"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
              >Home<Icon name='home' /></Menu.Item>
            <Menu.Item
              name='my_profile'
              as={Link} to={`/users/${this.props.user.id}`}
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
            <Menu.Header>My Teams</Menu.Header>
          </Menu.Item>

          <Menu.Menu>
            {this.formatTeamsNav()}
          </Menu.Menu>

          <Menu.Item>
            <Menu.Header>Explore</Menu.Header>
          </Menu.Item>

            <Menu.Menu>
              <Menu.Item
                name='all_tournaments'
                as={Link} to="/tournaments"
                active={activeItem === 'all_tournaments'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='all_teams'
                as={Link} to="/teams"
                active={activeItem === 'all_teams'}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>

            <Menu.Item>
              <Menu.Header>Create</Menu.Header>
            </Menu.Item>

              <Menu.Menu>
                <Menu.Item
                  name='host_tournament'
                  as={Link} to="/tournaments/new"
                  active={activeItem === 'host_tournament'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name='register_new_team'
                  as={Link} to="/teams/new"
                  active={activeItem === 'register_new_team'}
                  onClick={this.handleItemClick}
                />
              </Menu.Menu>

          <Menu.Item >
            <Menu.Header>Support</Menu.Header>
          </Menu.Item>

            <Menu.Menu>
              <Menu.Item
                name='faq'
                as={Link} to="/faq"
                active={activeItem === 'faq'}
                onClick={this.handleItemClick}>
                FAQs
              </Menu.Item>
              <Menu.Item
                name='terms_and_conditions'
                as={Link} to="/terms_and_conditions"
                active={activeItem === 'terms_and_conditions'}
                onClick={this.handleItemClick}>
                Terms and Conditions
              </Menu.Item>
              <Menu.Item
                name='email'
                as={Link} to="/email"
                active={activeItem === 'email'}
                onClick={this.handleItemClick}>
                E-mail Support
              </Menu.Item>
              <Menu.Item
                name='contact_us'
                as={Link} to="/contact_us"
                active={activeItem === 'contact_us'}
                onClick={this.handleItemClick}>
                Contact Us
              </Menu.Item>
            </Menu.Menu>
        </React.Fragment>
          : <React.Fragment>
          <Menu.Item>
            <Menu.Menu>
              <Menu.Item
                name='login'
                as={Link} to="/login"
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='signup'
                as={Link} to="/signup"
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
    signOutUser: () => dispatch(signOutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavTwo);
