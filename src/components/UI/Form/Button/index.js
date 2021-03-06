import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  width: 100%;
  outline: none;
  padding: 1.2rem 2rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  color: var(--color-white);
  font-weight: 700;
  box-shadow: 0rem 0.5rem 3.5rem var(--shadow);
  background-color: ${({ color }) => {
    if (color === 'red') return 'var(--color-error)';
    else if (color === 'green') return 'var(--color-submit)';
    else if (color === 'main') return 'var(--color-mainDark)';
    else return 'var(--color-mainLighter)';
  }};
  border: none;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(2px);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #333;
  }
`;

const Button = ({ children, disabled, loading, color, ...rest }) => {
  return (
    <StyledButton disabled={disabled} {...rest} color={color}>
      {loading ? loading : children}
    </StyledButton>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  color: PropTypes.string,
  loading: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default Button;
