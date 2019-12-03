import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Search from '../Search'
import TeamIndexCard from './TeamIndexCard';
import { Card } from 'semantic-ui-react';


const TeamIndex = (props) => {
  const [ searchTerm, setSearchTerm ] = useState("")
  const teams = useSelector(state => state.reducer.teams)
  console.log(teams);

  const changeHandler = searchTerm => {
    setSearchTerm(searchTerm)
  }

  const formatTeamCards = teams => (
    teams.map(team => <TeamIndexCard key={team.id} team={team} />)
  )

  return (
    <div>
      <h2 className="ui header">Search for a Team</h2>
      <Search changeHandler={changeHandler} searchTerm={searchTerm}/>
      <h1>Newest Teams</h1>
        <Card.Group>
          { formatTeamCards(teams.slice(-4)) }
        </Card.Group>
      <h1>Strongest Teams</h1>
      <h1>All Teams</h1>
        <Card.Group>
          { formatTeamCards(teams) }
        </Card.Group>
    </div>
  )
}

export default TeamIndex;
