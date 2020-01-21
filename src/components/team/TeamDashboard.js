import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types';

const TeamDashboard = (props) => {
  const formatJoinReqs = () => {
    return props.joinRequests.map(req => (<><Link to={`/users/${req.user.id}`}>{req.user.username}</Link> is requesting to join.</>))
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
