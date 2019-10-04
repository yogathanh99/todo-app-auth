import React, { useEffect } from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import { Container } from '../../hoc/container';
import Heading from '../../components/UI/Form/Heading';
import AddTodo from './AddTodo';
import Loading from '../../components/UI/Loading';
import Todo from './Todo';

import * as actions from '../../store/actions';

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

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 60rem;
  flex-direction: column;
  margin-top: 2.5rem;
`;

const Todos = ({ cleanUp, todos, userId, requested, requesting }) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);
  let content;

  if (!todos) {
    content = (
      <Content>
        <Loading />
      </Content>
    );
  } else if (!todos[userId] && requested[`todos/${userId}`]) {
    content = (
      <Content>
        <Heading size='h2'>You have not todos</Heading>
      </Content>
    );
  } else {
    content = (
      <Content>
        {todos[userId].todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </Content>
    );
  }

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
          {content}
        </InnerWrapper>
      </Container>
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  userId: state.firebase.auth.uid,
  todos: state.firestore.data.todos,
  requesting: state.firestore.status.requesting,
  requested: state.firestore.status.requested,
});

const mapDispatchToProps = {
  cleanUp: actions.cleanUpTodos,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  firestoreConnect(props => [`todos/${props.userId}`]),
)(Todos);
