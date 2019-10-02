import React from 'react';
import styled from 'styled-components';
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

const NavItems = ({ mobile, clicked, loggedIn }) => {
  let links;
  if (loggedIn) {
    links = (
      <>
        <NavItem clicked={clicked} mobile={mobile} link='/'>
          Home
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link='/todos'>
          Todos
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link='/logout'>
          Logout
        </NavItem>
      </>
    );
  } else {
    links = (
      <>
        <NavItem clicked={clicked} mobile={mobile} link='/login'>
          Login
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link='/signup'>
          Sign Up
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link='/recover'>
          Recover Password
        </NavItem>
      </>
    );
  }
  return (
    <Nav>
      <Ul mobile={mobile}>{links}</Ul>
    </Nav>
  );
};

export default NavItems;
