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

const Routes = () => (
    <Router history={history} component={Home}>
        <div>
            {/* TO DO: Create a page to Select Check or Rate / */}
            <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
            <Route path="/callback" render={(props) => {
                handleAuthentication(props);
                return <Callback {...props} />
            }}/>
            {/* TO DO: Create a page to Input DVID: Rate a Driver / */}
            <Route path="/rate" render={(props) => <RateId auth={auth} {...props} />} />
            {/* TO DO: Create a page to Input DVID: Check a Driver / */}
            <Route path="/check" component={CheckId} />
            <Route path="/success" component={Success} />

        </div>
    </Router>
);

const RateId = ({ match }) => (
  <div>
    <Route path={`${match.url}/:driverId`} render={(props) => <Rate pid="4b232d86-d942-4de8-9358-0c923a0b0e2f"{...props} />} />

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

    {/* TO DO: Create a page for this route /check */}
    <Route
      exact
      path={match.url}
      component={CheckDriverID}
    />
  </div>
);

export default Routes;
