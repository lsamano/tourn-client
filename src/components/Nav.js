import React, { Component } from 'react'
import { Menu, Icon, Image, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { signOutUser } from '../redux/actions';
import { NavLink, Link } from 'react-router-dom';

class NavTwo extends Component {
  handleLogout =  ( e, { name } ) => {
    localStorage.removeItem("token")
    this.props.signOutUser()
  }

  formatTeamsNav = () => {
    return this.props.user.teams.map(team =>
      <Menu.Item
        name={`${team.id}`}
        as={NavLink} to={`/teams/${team.id}/dashboard`}
        key={team.id} >
        {team.name}
      </Menu.Item>
    )
  }

  render() {
    const myself = {image: { avatar: true, src: this.props.user.avatar }}
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
          <Dropdown item text={
              <>
                <img src="https://robohash.org/gre7z84z6y4era6.jpg?size=300x300&amp;set=set4&amp;bgset=bg2" className="ui avatar image"/>
                {this.props.user.username}
              </>
            } lazyLoad >
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/users/${this.props.user.id}`} icon="user" text="View Profile"/>
              <Dropdown.Item as={Link} to={`/users/${this.props.user.id}/edit`} icon="settings" text="Settings"/>
              <Dropdown.Item icon="sign-out" text="Logout" onClick={this.handleLogout}/>
            </Dropdown.Menu>
          </Dropdown>

            <Menu.Menu>
            <Menu.Item
              name='home'
              as={NavLink} to="/"
              exact >
              Home<Icon name='home' />
            </Menu.Item>
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
                as={NavLink} to="/tournaments" exact
              />
              <Menu.Item
                name='all_teams'
                as={NavLink} to="/teams" exact
              />
            </Menu.Menu>

            <Menu.Item>
              <Menu.Header>Create</Menu.Header>
            </Menu.Item>

              <Menu.Menu>
                <Menu.Item
                  name='host_tournament'
                  as={NavLink} to="/tournaments/new"
                />
                <Menu.Item
                  name='register_new_team'
                  as={NavLink} to="/teams/new"
                />
              </Menu.Menu>

          <Menu.Item >
            <Menu.Header>Support</Menu.Header>
          </Menu.Item>

            <Menu.Menu>
              <Menu.Item
                name='faq'
                as={NavLink} to="/faq"
                content="FAQs"
                />
              <Menu.Item
                name='terms_and_conditions'
                as={NavLink} to="/terms_and_conditions"
                />
              <Menu.Item
                name='email'
                as={NavLink} to="/email"
                content="Email Support"
                />

              <Menu.Item
                name='contact_us'
                as={NavLink} to="/contact_us"
                />
            </Menu.Menu>
        </React.Fragment>
          : <React.Fragment>
          <Menu.Item>
            <Menu.Menu>
              <Menu.Item
                name='login'
                as={NavLink} to="/login"

              />
              <Menu.Item
                name='signup'
                as={NavLink} to="/signup"

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
