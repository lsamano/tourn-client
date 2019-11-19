import React from 'react';
import Tree from 'react-d3-tree';
import {connect} from 'react-redux';
import { Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Loading from '../Loading'

class TournBracket extends React.Component {
  render() {
    const {tournament, user} = this.props
    if (tournament.bracket) {
      const bracket = [tournament.bracket.node]
      return (
        <div>
          <Header as='h1'>{tournament.title}</Header>
          <div id="treeWrapper" style={{height: '80vh'}}>
            <Tree data={bracket} pathFunc="elbow" orientation="vertical" collapsible={false} />
          </div>
          <Link to={`/tournaments/${tournament.id}`}><Button>See Tournament Info</Button></Link>
          {tournament.host.id === user.id
            ? <Link to={`dashboard`}><Button>Manage Tournament</Button></Link>
            : null
          }

        </div>
      )
    } else {
      return (<Loading />)
    }
  }
}

const mapStateToProps = state => ({
  tournament: state.reducer.tournShown,
  user: state.reducer.user
})

export default connect(mapStateToProps)(TournBracket);
