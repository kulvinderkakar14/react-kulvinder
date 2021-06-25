import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from 'react-router-dom';

import App from './App';

const countryNames = ['Australia', 'India'];
const countryObj = countryNames.map((country, i) => ({
  id: i,
  countryVal: country
}));

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <App country={countryObj} />
      </Route>
      <Route path="/news" />
    </Switch>
  </Router>,
  document.getElementById('root')
);
//<App country={countryObj} />, document.getElementById('root'));
