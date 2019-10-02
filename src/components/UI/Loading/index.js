//Cre: loading.io
import React from 'react';
import styled from 'styled-components';

const StyledLoading = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  &:after {
    content: ' ';
    display: block;
    width: 60px;
    height: 60px;
    margin: 1px;
    border-radius: 50%;
    border: 7px solid var(--color-main);
    border-color: var(--color-main) transparent var(--color-main) transparent;
    animation: lds-dual-ring 1.5s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return <StyledLoading />;
};

export default Loading;
