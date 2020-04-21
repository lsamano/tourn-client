import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { approveJoinRequest } from '../../redux/actions';
import NoRouteMatch from '../NoRouteMatch';

// import PropTypes from 'prop-types';

const TeamDashboard = ({ joinRequests, approveJoinRequest, teamShown, userTeams }) => {

  const formatJoinReqs = () => {
    if (joinRequests.length === 0) {
      return "No Pending Join Requests."
    }
    return joinRequests.map(req => (
      <div key={req.id}>
      <Link to={`/users/${req.user.id}`}>{req.user.username}</Link> is requesting to join.
      <Button icon color='green' onClick={() => approveJoinRequest(req.id)}><Icon name='check'/>Accept</Button>
      <Button icon color='red'><Icon name='x'/>Deny</Button>
      </div>
    ))
  }

  const userIsNotMember = () => {
    const arrayOfTeamIds = (userTeams && userTeams.map(team => team.id))
    return !(arrayOfTeamIds && arrayOfTeamIds.includes(teamShown.id))
  }

  if (!teamShown || !userTeams ) {
    return "loading"
  }

  if (userIsNotMember()) {
    return <NoRouteMatch />
  }

  return (
    <div>
      <h1>{teamShown.name} Dashboard</h1>
      <Link to={`/teams/${teamShown.id}`}>View Public Profile</Link>
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
  teamShown: state.reducer.teamShown,
  userTeams: state.reducer.user.teams
})

const mapDispatchToProps = dispatch =>({
  approveJoinRequest: join_request_id => dispatch(approveJoinRequest(join_request_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamDashboard);
