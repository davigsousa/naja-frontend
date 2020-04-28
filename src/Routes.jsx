import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter, Switch, Route, Redirect, useLocation,
} from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import App from './App';
import Login from './pages/Login';
import Panel from './pages/Panel';

const PublicRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) => (
        isAuthenticated()
          ? <Redirect to={{ pathname: '/painel', state: { from: location.pathname } }} />
          : <Component {...props} />
      )}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) => (
        isAuthenticated()
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/', state: { from: location.pathname } }} />
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

const Routes = () => (
  <BrowserRouter>
    <App>
      <Switch>
        <PublicRoute exact path="/" component={() => <Redirect to="/login" />} />
        <PublicRoute path="/login" component={Login} />
        <PrivateRoute path="/painel/:category" component={Panel} />
        <PrivateRoute exact path="/painel" component={() => <Redirect to="/painel/Todos" />} />
      </Switch>
    </App>
  </BrowserRouter>
);

export default Routes;
