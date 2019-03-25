import React from 'react';
import Tree from 'react-d3-tree';

class TournBracket extends React.Component {
  render() {
    console.log(this.props);
    const bracket = [this.props.tournament.bracket.node]
    return (
      <div>
      hi {this.props.tournament.title}

      <div id="treeWrapper" style={{width: '100em', height: '100em'}}>

        <Tree data={bracket} pathFunc="elbow" orientation="vertical" collapsible={false} />

      </div>


      </div>
    )
  }
}

export default TournBracket;
