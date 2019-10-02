import React from 'react';
import styled from 'styled-components';

import Logo from '../../Logo';
import { Container } from '../../../hoc/container';
import NavItems from '../NavItems';

const FixedWrapper = styled.div`
  position: fixed;
  background: var(--color-main);
  padding: 0 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;

  @media ${props => props.theme.mediaQueries.smallest} {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

const Navbar = ({ loggedIn }) => {
  return (
    <FixedWrapper>
      <Container>
        <Wrapper>
          <Logo />
          <NavItems loggedIn={loggedIn} />
        </Wrapper>
      </Container>
    </FixedWrapper>
  );
};

export default Navbar;
