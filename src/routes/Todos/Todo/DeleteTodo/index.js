import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Modal from '../../../../components/UI/Modal';
import Button from '../../../../components/UI/Form/Button';
import Message from '../../../../components/UI/Message';
import Heading from '../../../../components/UI/Form/Heading';

import * as actions from '../../../../store/actions';

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0rem;
`;

const TodoWrapper = styled.div`
  margin: 1rem 0rem;
  font-size: 1.3rem;
  text-align: center;
  color: var(--color-white);
`;

const DeleteTodo = ({ show, todo, close, loading, error, deleteTodo }) => {
  return (
    <Modal opened={show} close={close}>
      <Heading noMargin size='h1' color='white'>
        Delete todo
      </Heading>
      <Heading noMargin fontWeight={`true`} size='h4' color='white'>
        Are you sure you want to delete this todo?
      </Heading>
      <TodoWrapper>{todo.todo}</TodoWrapper>
      <ButtonsWrapper>
        <Button
          contain
          color='red'
          onClick={async () => await deleteTodo(todo.id)}
          disabled={loading}
          loading={loading ? 'Deleting...' : null}
        >
          Delete
        </Button>
        <Button color='main' contain onClick={close}>
          Cancel
        </Button>
      </ButtonsWrapper>
      <MessageWrapper>
        <Message error show={error}>
          {error}
        </Message>
      </MessageWrapper>
    </Modal>
  );
};

DeleteTodo.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  deleteTodo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.todos.deleteTodo.loading,
  error: state.todos.deleteTodo.error,
});

const mapDispatchToProps = {
  deleteTodo: actions.deleteTodo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteTodo);
