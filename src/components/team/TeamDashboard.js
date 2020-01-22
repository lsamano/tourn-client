import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';


// import PropTypes from 'prop-types';

const TeamDashboard = (props) => {
  const formatJoinReqs = () => {
    return props.joinRequests.map(req => (
      <>
      <Link to={`/users/${req.user.id}`}>{req.user.username}</Link> is requesting to join.
      <Button icon color='green'><Icon name='check'/>Accept</Button>
      <Button icon color='red'><Icon name='x'/>Deny</Button>
      </>
    ))
  }
  console.log(props.joinRequests);
  return (
    <div>
      <h2>
        Join Requests
      </h2>
      <div>
        {formatJoinReqs()}
      </div>
    </div>
  );
}

// TeamDashboard.propTypes = {
//   : PropTypes.
// };

const mapStateToProps = state => ({
  joinRequests: state.reducer.teamShown.join_requests
})

export default connect(mapStateToProps)(TeamDashboard);
