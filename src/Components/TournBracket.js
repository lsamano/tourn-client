import React from 'react';
import Tree from 'react-d3-tree';
import {connect} from 'react-redux';
import MyPlaceholder from './MyPlaceholder';
import {Header} from 'semantic-ui-react';

class TournBracket extends React.Component {
  render() {
    console.log("Current Props of TournBracket:", this.props);
    if (this.props.tournament.bracket) {
      const bracket = [this.props.tournament.bracket.node]
      return (
        <div>
          <Header>{this.props.tournament.title}</Header>
          <div id="treeWrapper" style={{width: '100em', height: '100em'}}>
            <Tree data={bracket} pathFunc="elbow" orientation="vertical" collapsible={false} />
          </div>
        </div>
      )
    } else {
      return <MyPlaceholder/>
    }
  }
}

const mapStateToProps = state => ({
  tournament: state.reducer.tournShown
})

export default connect(mapStateToProps)(TournBracket);
