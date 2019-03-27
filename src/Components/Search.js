import React from 'react'
import { Icon, Input } from 'semantic-ui-react'

const Search = props => (
  <Input
  fluid
  icon={<Icon name='search' inverted circular link />}
  placeholder='Search...'
  onChange={(event, {value}) => props.changeHandler(value)}
   />
)

export default Search
