import React from 'react'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'

const Loading = () => {
  return (
    <Segment className="height-container">
            <Dimmer active>
              <Loader> Loading </Loader>
            </Dimmer>
          </Segment>
  )
}

export default Loading;
