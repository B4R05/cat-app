import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Upload from '../pages/Upload';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';

const Routes = () => {
  return (
    <Router>
      <div>
        <Navbar/>

        <CacheSwitch>
          <Route exact path="/upload" component={Upload} />
          <CacheRoute exact path="/" cacheKey="/" component={Home} />
        </CacheSwitch>
      </div>
    </Router>
  );
};

export default Routes;

