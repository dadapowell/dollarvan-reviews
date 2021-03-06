import React from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Rate from './Rate';
import Check from './Check';
import Success from './Success';
import CheckDriverID from './CheckDriverID';
import RateDriverID from './RateDriverID';
import Callback from './Callback';
// import AuthLock from './Auth/AuthLock';
import Auth from './Auth/Auth';
import history from './history';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// const auth = new AuthLock();
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const Routes = () => (
    <Router history={history}>
        <div>

            <Route render={({ location }) => (
                <div>
                    <TransitionGroup>
                        <CSSTransition
                          timeout={500}
                          classNames='fade'
                          key={location.key}
                        >
                            <Switch location={location}>
                                <Redirect from="/defaultsite" to="/" />
                                <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />

                                <Route path="/rate" render={(props) => <RateId auth={auth} {...props} />} />
                                <Route path="/check" render={(props) => <CheckId auth={auth} {...props} />} />

                                <Route path="/success" component={Success} />
                                <Route path="/callback" render={(props) => {
                                    handleAuthentication(props);
                                    return <Callback {...props} />
                                }}/>
                            </Switch>

                        </CSSTransition>
                    </TransitionGroup>
                </div>
            )} />




        </div>
    </Router>
);

const RateId = ({ match }) => (
  <div>
    <Route path={`${match.url}/:driverId`} render={(props) => <Rate auth={auth} passenger_id={localStorage.getItem('passenger_id')}{...props} />} />

    {/* TO DO: Create a page for this route /rate */}
    <Route
      exact
      path={match.url}
      render={(props) => <RateDriverID auth={auth} passenger_id={localStorage.getItem('passenger_id')}{...props} />}
    />
  </div>
);

const CheckId = ({ match }) => (
  <div>
    <Route path={`${match.url}/:driverId`} render={(props) => <Check auth={auth} passenger_id={localStorage.getItem('passenger_id')}{...props} />} />

    <Route
      exact
      path={match.url}
      render={(props) => <CheckDriverID auth={auth} passenger_id={localStorage.getItem('passenger_id')}{...props} />}
    />
  </div>
);

export default Routes;
