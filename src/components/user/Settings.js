import React from 'react';
import UserEdit from './UserEdit';
import { connect } from 'react-redux';

const Settings = ({user}) => (
  <div>
    <h1>Settings</h1>
    {user.username && <UserEdit user={user} />}
  </div>
);

const mapStateToProps = state => ({
  user: state.reducer.user
})

export default connect(mapStateToProps)(Settings);
