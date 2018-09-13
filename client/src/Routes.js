import React from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './Home';
import Rate from './Rate';
import Check from './Check';
import Success from './Success';
import CheckDriverID from './CheckDriverID';
import RateDriverID from './RateDriverID';
import Callback from './Callback';
import AuthLock from './Auth/AuthLock';
import history from './history';

const auth = new AuthLock();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}
const USER_INFO = localStorage.getItem('passenger_id');

const Routes = () => (
    <Router history={history} component={Home}>
        <div>
            <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />

            <Route path="/rate" render={(props) => <RateId auth={auth} {...props} />} />
            <Route path="/check" component={CheckId} />
            
            <Route path="/success" component={Success} />
            <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />
            }}/>

        </div>
    </Router>
);

const RateId = ({ match }) => (
  <div>
    <Route path={`${match.url}/:driverId`} render={(props) => <Rate passenger_id={USER_INFO}{...props} />} />

    {/* TO DO: Create a page for this route /rate */}
    <Route
      exact
      path={match.url}
      component={RateDriverID}
    />
  </div>
);

const CheckId = ({ match }) => (
  <div>
    <Route path={`${match.url}/:driverId`} component={Check} />

    <Route
      exact
      path={match.url}
      component={CheckDriverID}
    />
  </div>
);

export default Routes;
