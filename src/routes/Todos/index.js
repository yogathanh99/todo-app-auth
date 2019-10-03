import React from 'react';
import styled from 'styled-components';

import { Container } from '../../hoc/container';
import Heading from '../../components/UI/Form/Heading';
import AddTodo from './AddTodo';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  align-self: flex-start;
  min-height: calc(100vh - 6rem);
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 4rem;
`;

const Todos = () => {
  return (
    <Wrapper>
      <Container>
        <InnerWrapper>
          <Heading size='h1' noMargin>
            Your todos
          </Heading>
          <Heading size='h4' fontWeight={`true`}>
            All todos you have now...
          </Heading>
          <AddTodo />
        </InnerWrapper>
      </Container>
    </Wrapper>
  );
};

export default Todos;
