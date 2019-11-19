import React from 'react'
import {connect} from 'react-redux';
import Search from '../Search'
import TournCard from './TournCard';
import { updateSearch } from '../../redux/actions';
import Loading from '../Loading'

class TournIndex extends React.Component {
  changeHandler = searchTerm => {
    this.props.updateSearch(searchTerm, this.props.tournaments)
  }

  formatTournaments = () => {
    return this.props.filteredTournaments.map(tourn => <TournCard key={tourn.id} tournament={tourn} />)
  }

  render() {
    return (
      <div>
      <h2 className="ui header">All Tournaments</h2>
      <Search changeHandler={this.changeHandler} searchTerm={this.props.searchTerm}/>

      {this.props.tournaments.length > 0
        ? <div className="ui middle aligned divided list">{this.formatTournaments()}</div>
        : <Loading />
      }

      </div>
    )
  }

}

const mapStateToProps = state => ({
  tournaments: state.reducer.tournaments,
  filteredTournaments: state.reducer.filteredTournaments,
  searchTerm: state.reducer.searchTerm
})

const mapDispatchToProps = dispatch => ({
  updateSearch: (searchTerm, tournaments) => dispatch(updateSearch(searchTerm, tournaments))
})

export default connect(mapStateToProps, mapDispatchToProps)(TournIndex);
