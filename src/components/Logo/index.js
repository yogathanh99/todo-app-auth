import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from './logo.png';

const Wrapper = styled.div`
  color: var(--color-white);
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const Logo = () => {
  return (
    <Wrapper>
      <Link to='/'>
        <img src={logo} alt='Logo' style={{ width: '4rem' }} />
      </Link>
    </Wrapper>
  );
};

export default Logo;
