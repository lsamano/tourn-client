import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTournaments} from '../Redux/actions';

class Home extends Component {
  componentDidMount = () => {
    // Not sure if I call this.props.getTournaments() here
    const stuff = this.props.getTournaments()
    // console.log("This is it:", stuff);
  }


  render() {
    return (
      <div>Hoi</div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
    getTournaments: () => dispatch(getTournaments())
})

export default connect(null, mapDispatchToProps)(Home);
