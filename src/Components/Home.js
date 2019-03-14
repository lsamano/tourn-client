import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {getTournaments, getProfileFetch} from '../Redux/actions';
import TournCard from './TournCard';

class Home extends Component {

  formatTournaments = tournaments => {
    return tournaments.map(tourn => <TournCard key={tourn.id} tournament={tourn} />)
  }

  filterHostedTournments = () => {
    const filteredTournaments = this.props.tournaments.filter(tourn => tourn.host.id === this.props.user.id)
    return this.formatTournaments(filteredTournaments)
  }

  render() {
    return (
      <div>
        <h1>Welcome, {this.props.user.username}!</h1>
        <h2 className="ui header">Your Hosted Tournaments:</h2>
          <div className="ui middle aligned divided list">
            {this.filterHostedTournments()}
          </div>
        <h2>Your Entered Tournaments:</h2>
          <p>Coming Soon</p>
        <h2 className="ui header">See All Tournaments:</h2>
          <div className="ui middle aligned divided list">
            {this.formatTournaments(this.props.tournaments)}
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tournaments: state.tournaments,
  user: state.user
})
//
// const mapDispatchToProps = dispatch => ({
//     getTournaments: () => dispatch(getTournaments()),
//     getProfileFetch: () => dispatch(getProfileFetch())
// })

export default connect(mapStateToProps)(Home);
