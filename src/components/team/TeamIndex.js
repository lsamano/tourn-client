import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Search from '../Search'


const TeamIndex = (props) => {
  const [ searchTerm, setSearchTerm ] = useState("")
  const teams = useSelector(state => state.reducer.teams)
  console.log(teams);

  const changeHandler = searchTerm => {
    setSearchTerm(searchTerm)
  }
  return (
    <div>
      <h1>Search for a Team</h1>
      <Search changeHandler={changeHandler} searchTerm={searchTerm}/>
      <h1>Newest Teams</h1>
      <h1>Strongest Teams</h1>
      <h1>All Teams</h1>

    </div>
  )
}

export default TeamIndex;
