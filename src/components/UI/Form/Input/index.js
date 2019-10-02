import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

const StyledInput = styled.input`
  padding: 1.2rem 2rem;
  width: 100%;
  background: var(--color-mainLight);
  color: var(--color-white);
  font-weight: 500;
  font-size: 1.2rem;
  border-radius: 2rem;
  border: none;

  &::placeholder {
    color: var(--color-white);
  }

  &:focus {
    background: var(--color-white);
    color: var(--color-mainDark);

    &::placeholder {
      color: var(--color-mainDark);
    }
  }
`;

const StyledError = styled.div`
  color: var(--color-error);
  font-weight: 700;
  font-size: 1.2rem;
  visibility: ${props => (props.show ? 'visibile' : 'hidden')};
  opacity: ${props => (props.show ? '1' : '0')};
  transform: translateY(${props => (props.show ? '20px' : '10px')});
  transition: all 0.1s;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0rem 2rem;
`;

const Input = ({ field, form: { errors, touched }, ...props }) => {
  return (
    <InputWrapper>
      <StyledInput {...field} {...props} />
      <StyledError show={errors[field.name] && touched[field.name]}>
        {errors[field.name]}
      </StyledError>
    </InputWrapper>
  );
};

export default Input;
