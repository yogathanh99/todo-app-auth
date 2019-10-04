import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/layout';
import Home from './routes/Home';
import Todos from './routes/Todos';
import Login from './routes/Auth/Login';
import SignUp from './routes/Auth/SignUp';
import LogOut from './routes/Auth/LogOut';
import Profile from './routes/Auth/Profile';
import RecoverPassword from './routes/Auth/RecoverPassword';
import VerifyEmail from './routes/Auth/VerifyEmail';

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
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/todos' component={Todos} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/logout' component={LogOut} />
        <Redirect to='/' />
      </Switch>
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

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid,
  emailVerified: firebase.auth.emailVerified,
});

export default connect(mapStateToProps)(App);
