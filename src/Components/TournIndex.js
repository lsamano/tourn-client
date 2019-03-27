import React from 'react'
import {connect} from 'react-redux';
import Search from './Search'
import TournCard from './TournCard';

class TournIndex extends React.Component {
  state ={
    filteredTournaments: [],
    searchTerm: ""
  }

  changeHandler = searchTerm => {
    const filteredTournaments = this.props.tournaments.filter(tourn => tourn.title.includes(searchTerm))
    this.setState({
      searchTerm: searchTerm,
      filteredTournaments: filteredTournaments
    }, ()=>console.log(searchTerm))
  }

  formatTournaments = () => {
    return this.state.filteredTournaments.map(tourn => <TournCard key={tourn.id} tournament={tourn} />)
  }

  render() {
    return (
      <div>
      <h2 className="ui header">All Tournaments</h2>
      <Search changeHandler={this.changeHandler}/>
      <div className="ui middle aligned divided list">
      {this.formatTournaments()}
      </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  tournaments: state.reducer.tournaments
})

export default connect(mapStateToProps)(TournIndex);
