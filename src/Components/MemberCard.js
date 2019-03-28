import React from 'react';
import {Link} from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

const MemberCard = ({member, team}) => {
  return (
    <Card link>
      <Image src={member.avatar}/>
      <Card.Content>
        <Card.Header><Link to={`/users/${member.id}`}>{member.username}</Link></Card.Header>
        <Card.Meta>{team.captain.id === member.id ? <div>CAPTAIN</div> : <div>MEMBER</div>}</Card.Meta>
        <Card.Description>{member.bio}</Card.Description>
      </Card.Content>
    </Card>
  )
}

const mapStateToProps = state => ({
  user: state.reducer.user
})

export default connect(mapStateToProps)(MemberCard);
