import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const TeamIndexCard = ({ team, history }) => {
  const handleClick = (event, data) => {
    // data is Card's onClick data; it is not used here
    history.push(`/teams/${team.id}`)
  }

  return (
    <Card link onClick={handleClick}>
      <Image src={team.logo} size='medium' />
      <Card.Content>

        <Card.Header>
          <h2> {team.name} </h2>
        </Card.Header>
        <Card.Description>
          { team.tagline }
        </Card.Description>
      </Card.Content>

    </Card>
  )
}

TeamIndexCard.propTypes = {
  team: PropTypes.object
};

export default withRouter(TeamIndexCard)
