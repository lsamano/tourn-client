import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

const TeamCard = ({ team, userShown }) => {
  return (
      <Card link>
        <Image src={team.logo} />
        <Card.Content>
        <Card.Meta>
          {
            team.captain_id === userShown.id
            ? <div>CAPTAIN of</div>
            : <div>MEMBER of</div>
          }
          </Card.Meta>
          <Card.Header><Link to={`/teams/${team.id}`}><h2>{team.name}</h2></Link></Card.Header>
          <Card.Description>{team.tagline}</Card.Description>
        </Card.Content>

      </Card>
  )
}

const mapStateToProps = state => ({
  userShown: state.reducer.userShown
})

export default connect(mapStateToProps)(TeamCard);
