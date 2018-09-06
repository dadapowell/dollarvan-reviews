import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Rate from './Rate.js';
import Check from './Check.js';
import Success from './Success';
import './App.css';

const App = () => (
  <Router>
    <div>

        {/* TO DO: Create a page for this route / */}
        <Route exact path="/" component={Check} />

        <Route path="/rate" component={RateId} />
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
      component={Rate}
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
      component={Check}
    />
  </div>
);


export default App;
