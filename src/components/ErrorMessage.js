import React from 'react'
import { Message } from 'semantic-ui-react'

const ErrorMessage = ({ message }) => (
  <Message negative>
    <Message.Header>
      { message }
    </Message.Header>
    <p>
      Please try again.
    </p>
  </Message>
)

export default ErrorMessage;
