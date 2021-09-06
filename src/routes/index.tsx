import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Upload from '../pages/Upload';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';

const Routes = () => {
  return (
    <Router>
      <div>
        <Navbar/>

        <Switch>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;

