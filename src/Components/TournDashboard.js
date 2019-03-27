import React from 'react';
import {connect} from 'react-redux';

class TournDashboard extends React.Component {
  render() {
    return (
      <div>Hi</div>
    )
  }
}

const mapStateToProps = state => ({
  tournament: state.reducer.tournShown
})

export default connect(mapStateToProps)(TournDashboard);
