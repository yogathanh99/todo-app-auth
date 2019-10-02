import React from 'react';
import styled from 'styled-components';

const P = styled.p`
  font-weight: 7000;
  font-size: 1.2rem;
  color: ${props => {
    if (props.error) return `var(--color-error)`;
    if (props.success) return `green`;
    else return `var(--color-main)`;
  }};
  opacity: ${props => (props.show ? '1' : '0')};
  transform: translateY(${props => (props.show ? '30px' : '0px')});
  text-align: center;
  transition: all 0.2s;
`;

const Message = ({ children, error, show, success }) => {
  return (
    <P error={error} show={show} success={success}>
      {children}
    </P>
  );
};

export default Message;
