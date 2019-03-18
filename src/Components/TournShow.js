import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import moment from 'moment';
import TournSignup from './TournSignup';

const TournShow = ({tournament}) => {
  console.log("Tournament Show:", tournament);
  return (
    <Switch>
      <Route path="/tournaments/:id/signup" component={TournSignup} />
      <Route render={() => {
        return <div>
          <Link to="/tournaments">See All Tournaments</Link>
          <h1 className="ui top attached inverted header">{tournament.title}
            <div className="sub header">{moment(tournament.start_dt).format('llll')}</div>
          </h1>
          <div className="ui attached segment">
            <p>Hosted by {tournament.host.username}</p>
            <p className="description">{tournament.description}</p>
            <Link to={`/tournaments/${tournament.id}/signup`}><button className="ui button primary">Join This Tournament</button></Link>
            <h3>Current Teams Entered:</h3>
          </div>
        </div>
        }
      } />
    </Switch>

  )
}

export default TournShow;
