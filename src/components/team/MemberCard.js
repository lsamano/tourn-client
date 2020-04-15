import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

const MemberCard = ({ member, team, history }) => {
  const handleClick = (event, data) => {
    // data is Card's onClick data; it is not used here
    history.push(`/users/${member.id}`)
  }
  return (
    <Card link onClick={handleClick}>
      <Image src={ member.avatar }/>
      <Card.Content>
        <Card.Header>
          { member.username }
        </Card.Header>
        <Card.Meta>
          {
            team.captain.id === member.id
            ? <div>CAPTAIN</div>
            : <div>MEMBER</div>
          }
        </Card.Meta>
        <Card.Description>
          { member.bio }
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

const mapStateToProps = state => ({
  user: state.reducer.user
})

export default withRouter(connect(mapStateToProps)(MemberCard));
