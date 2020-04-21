import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter, Switch, Route, Redirect, useLocation,
} from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Login from './pages/Login';
import Panel from './pages/Panel';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) => (
        isAuthenticated()
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

const Routes = () => (
  <BrowserRouter>
    <Route path="/login" component={Login} />
    <Switch>
      <PrivateRoute path="/painel" component={Panel} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
