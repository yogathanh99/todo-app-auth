import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from '../../components/Navigation/Navbar';
import SideDrawer from '../../components/Navigation/SideDrawer';

const MainWrapper = styled.main`
  width: 100%;
  min-height: calc(100vh - 6rem);
  margin-top: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Layout = ({ children, loggedIn }) => {
  return (
    <>
      <NavBar loggedIn={loggedIn} />
      <SideDrawer loggedIn={loggedIn} />
      <MainWrapper>{children}</MainWrapper>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  loggedIn: PropTypes.string,
};

const mapStateToProps = ({ firebase }) => ({
  loggedIn: firebase.auth.uid,
});

export default connect(mapStateToProps)(Layout);
