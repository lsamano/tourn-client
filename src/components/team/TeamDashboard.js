import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { approveJoinRequest } from '../../redux/actions';

// import PropTypes from 'prop-types';

const TeamDashboard = (props) => {

  const formatJoinReqs = () => {
    return props.joinRequests.map(req => (
      <div key={req.id}>
      <Link to={`/users/${req.user.id}`}>{req.user.username}</Link> is requesting to join.
      <Button icon color='green' onClick={() => props.approveJoinRequest(req.id)}><Icon name='check'/>Accept</Button>
      <Button icon color='red'><Icon name='x'/>Deny</Button>
      </div>
    ))
  }
  console.log(props);
  return (
    <div>
      <h1>{props.teamShown.name} Dashboard</h1>
      <h2>
        Incoming Join Requests
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
  joinRequests: state.reducer.teamShown.join_requests,
  teamShown: state.reducer.teamShown
})

const mapDispatchToProps = dispatch =>({
  approveJoinRequest: join_request_id => dispatch(approveJoinRequest(join_request_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamDashboard);
