import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter, Switch, Route, Redirect, useLocation,
} from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import App from './App';
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
        <Route exact path="/" component={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/painel/:category" component={Panel} />
        <PrivateRoute exact path="/painel" component={() => <Redirect to="/painel/Todos" />} />
      </Switch>
    </App>
  </BrowserRouter>
);

export default Routes;
