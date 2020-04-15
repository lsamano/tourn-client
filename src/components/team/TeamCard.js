import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

const TeamCard = ({ team, userShown, history }) => {
  const handleClick = (event, data) => {
    // data is Card's onClick data; it is not used here
    history.push(`/teams/${team.id}`)
  }
  return (
      <Card link onClick={handleClick}>
        <Image src={team.logo} />
        <Card.Content>
        <Card.Meta>
          {
            team.captain_id === userShown.id
            ? <div>CAPTAIN of</div>
            : <div>MEMBER of</div>
          }
          </Card.Meta>
          <Card.Header><h2>{team.name}</h2></Card.Header>
          <Card.Description>{team.tagline}</Card.Description>
        </Card.Content>

      </Card>
  )
}

const mapStateToProps = state => ({
  userShown: state.reducer.userShown
})

export default withRouter(connect(mapStateToProps)(TeamCard));
