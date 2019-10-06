import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Layout from './hoc/layout';
import Home from './routes/Home';
import Login from './routes/Auth/Login';
import SignUp from './routes/Auth/SignUp';
import LogOut from './routes/Auth/LogOut';
import Profile from './routes/Auth/Profile';
import RecoverPassword from './routes/Auth/RecoverPassword';
import VerifyEmail from './routes/Auth/VerifyEmail';

const Todos = React.lazy(() => import('./routes/Todos'));

const App = ({ loggedIn, emailVerified }) => {
  let routes;
  if (loggedIn && !emailVerified) {
    routes = (
      <Switch>
        <Route exact path='/verify-email' component={VerifyEmail} />
        <Route exact path='/logout' component={LogOut} />
        <Redirect to='/verify-email' />
      </Switch>
    );
  } else if (loggedIn && emailVerified) {
    routes = (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/todos' component={Todos} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/logout' component={LogOut} />
          <Redirect to='/' />
        </Switch>
      </Suspense>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/recover' component={RecoverPassword} />
        <Redirect to='/login' />
      </Switch>
    );
  }
  return <Layout>{routes}</Layout>;
};

App.propTypes = {
  loggedIn: PropTypes.string,
  emailVerified: PropTypes.bool,
};

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid,
  emailVerified: firebase.auth.emailVerified,
});

export default connect(mapStateToProps)(App);
