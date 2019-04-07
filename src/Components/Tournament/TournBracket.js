import React from 'react';
import Tree from 'react-d3-tree';
import {connect} from 'react-redux';
import MyPlaceholder from '../MyPlaceholder';
import {Header, Placeholder, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class TournBracket extends React.Component {
  render() {
    console.log("Current Props of TournBracket:", this.props);
    const {tournament} = this.props
    if (tournament.bracket) {
      const bracket = [tournament.bracket.node]
      return (
        <div>
          <Header as='h1'>{tournament.title}</Header>
          <div id="treeWrapper" style={{height: '50em'}}>
            <Tree data={bracket} pathFunc="elbow" orientation="vertical" collapsible={false} />
          </div>
          <Link to={`/tournaments/${tournament.id}`}><Button>See Tournament Info</Button></Link>
          <Link to={`dashboard`}><Button>Manage Tournament</Button></Link>

        </div>
      )
    } else {
      return <Placeholder><Placeholder.Image square /></Placeholder>
    }
  }
}

const mapStateToProps = state => ({
  tournament: state.reducer.tournShown
})

export default connect(mapStateToProps)(TournBracket);
