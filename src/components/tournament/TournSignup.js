import React from 'react';
import { connect } from 'react-redux';
import { entryPostFetch } from '../../redux/actions';

class TournSignup extends React.Component {
  state = {

  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("Now starting the Post fetch for an entry...");
    const tournInfo = {...this.state}
    console.log("... for this", tournInfo);
    this.props.entryPostFetch(tournInfo);
  }

  render() {
    console.log("TournSignup Props", this.props);
    return (
      <div>
        xxx
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.reducer.user
})

const mapDispatchToProps = (dispatch) => ({
    entryPostFetch: (tournInfo) => dispatch(entryPostFetch(tournInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(TournSignup);
