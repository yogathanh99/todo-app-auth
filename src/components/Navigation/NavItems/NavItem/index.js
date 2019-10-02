import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Li = styled.li`
  display: flex;
`;

const NavLinkStyle = styled(NavLink)`
  display: flex;
  text-transform: uppercase;
  align-items: center;
  border-bottom: ${props =>
    props.mobile ? '1px solid transparent' : '2px solid transparent;'};
  font-size: 1.2rem;
  padding: ${props => (props.mobile ? '.5rem 1rem' : '1rem')};
  margin: ${props => (props.mobile ? '2rem 0' : '0 1rem')};
  font-weight: 400;
  color: var(--color-white);
  transition: all 0.2s;

  &:hover {
    border-bottom: ${props =>
      props.mobile
        ? '1px solid var(--color-white)'
        : '2px solid var(--color-white);'};
  }

  &.active {
    border-bottom: ${props =>
      props.mobile
        ? '1px solid var(--color-white)'
        : '2px solid var(--color-white);'};
  }
`;

const NavItem = ({ link, children, mobile, clicked }) => {
  return (
    <Li>
      <NavLinkStyle
        mobile={mobile ? 1 : 0}
        to={link}
        activeClassName='active'
        exact
        onClick={clicked}
      >
        {children}
      </NavLinkStyle>
    </Li>
  );
};

export default NavItem;
