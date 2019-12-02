import React, { useState } from 'react';
import Search from '../Search'


const TeamIndex = (props) => {
  const [ searchTerm, setSearchTerm ] = useState("")

  const changeHandler = searchTerm => {
    setSearchTerm(searchTerm)
  }
  return (
    <div>
      <h1>Search for a Team</h1>
      <Search changeHandler={changeHandler} searchTerm={searchTerm}/>
      <h1>Newest Teams</h1>
      <h1>Strongest Teams</h1>
    </div>
  )
}

export default TeamIndex;
