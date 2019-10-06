import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavItem from './NavItem';

const Nav = styled.nav`
  display: flex;
  margin-top: ${props => (props.mobile ? '-6rem' : '0')};
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: ${props => (props.mobile ? 'column' : 'row')};
  align-items: center;
  height: 100%;
`;

const HeadWrapper = styled.h4`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font-size: 1.2rem;
`;

const NavItems = ({ mobile, clicked, loggedIn, firebase }) => {
  let links;
  if (loggedIn) {
    links = (
      <Ul mobile={mobile}>
        <HeadWrapper>
          {firebase.profile.firstName} {firebase.profile.lastName}
        </HeadWrapper>
        <NavItem clicked={clicked} mobile={mobile} link='/todos'>
          Todos
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link='/profile'>
          Profile
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link='/logout'>
          Logout
        </NavItem>
      </Ul>
    );
  } else {
    links = (
      <Ul mobile={mobile}>
        <NavItem clicked={clicked} mobile={mobile} link='/login'>
          Login
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link='/signup'>
          Sign Up
        </NavItem>
      </Ul>
    );
  }
  return <Nav mobile={mobile}>{links}</Nav>;
};

NavItems.propTypes = {
  clicked: PropTypes.func,
  mobile: PropTypes.bool,
  firebase: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  firebase: state.firebase,
});

export default connect(mapStateToProps)(NavItems);
