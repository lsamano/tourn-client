import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button, Modal } from 'semantic-ui-react'
import { tournamentDeleteFetch } from '../redux/actions'

class DeletionModal extends Component {
  state = { open: false }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  close = () => {
    this.setState({ open: false })
    this.props.tournamentDeleteFetch(this.props.id)
  }

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state

    return (
      <div>
        <Button color="red" onClick={this.closeConfigShow(true, false)}>Delete This Tournament</Button>

        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>Delete This Tournament</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this tournament?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              onClick={this.close}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Yes'
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  tournamentDeleteFetch: (id) => dispatch(tournamentDeleteFetch(id))
})

export default connect(null, mapDispatchToProps)(DeletionModal)
