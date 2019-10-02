import React, { useState } from 'react';
import styled from 'styled-components';

import Logo from '../../Logo';
import HamburgerMenu from './HamburgerMenu';
import NavItems from '../NavItems';

const FixedWrapper = styled.div`
  position: fixed;
  background: var(--color-main);
  z-index: 10;
  padding: 0 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  display: none;

  @media ${props => props.theme.mediaQueries.smallest} {
    display: flex;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-main);
  margin-top: 6rem;
  visibility: ${props => (props.opened ? 'visibile' : 'hidden')};
  transform: translateY(${props => (props.opened ? '0%' : '-100%')});
  transition: all 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
`;

const Navbar = () => {
  const [isOpened, setOpen] = useState(false);

  return (
    <>
      <FixedWrapper>
        <Wrapper>
          <Logo />
          <HamburgerMenu opened={isOpened} clicked={() => setOpen(!isOpened)} />
        </Wrapper>
      </FixedWrapper>
      <Menu opened={isOpened}>
        <NavItems mobile clicked={() => setOpen(false)} />
      </Menu>
    </>
  );
};

export default Navbar;
