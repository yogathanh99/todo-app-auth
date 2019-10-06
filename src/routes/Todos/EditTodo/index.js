import React, { useEffect } from 'react';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from '../../../components/UI/Form/Button';
import Heading from '../../../components/UI/Form/Heading';
import Message from '../../../components/UI/Message';
import Modal from '../../../components/UI/Modal';
import Input from '../../../components/UI/Form/Input';
import { StyledForm } from '../../../hoc/container';

import * as actions from '../../../store/actions';

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;

const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0rem;
  width: 100%;
  padding: 0 3rem;
`;

const TodoSchema = Yup.object().shape({
  todo: Yup.string().required('The todo is required.'),
});

const EditTodo = ({
  opened,
  close,
  todo,
  loading,
  error,
  editTodo,
  cleanUp,
}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <Modal opened={opened} close={close}>
      <Heading noMargin size='h1' color='white'>
        Edit your todo
      </Heading>
      <Heading fontWeight={`true`} size='h4' color='white'>
        Edit your todo and tap edit
      </Heading>
      <Formik
        initialValues={{
          todo: todo.todo,
        }}
        validationSchema={TodoSchema}
        onSubmit={async (value, { setSubmitting, resetForm }) => {
          const res = await editTodo(todo.id, value);
          if (res) {
            close();
          }
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting, isValid, resetForm }) => (
          <StyledForm>
            <Field
              type='text'
              name='todo'
              placeholder='Write your todo...'
              component={Input}
            />
            <ButtonsWrapper>
              <Button
                contain
                color='green'
                type='submit'
                disabled={!isValid || isSubmitting}
                loading={loading ? 'Editing' : null}
              >
                Edit todo
              </Button>
              <Button
                type='button'
                color='main'
                contain
                onClick={() => {
                  close();
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </ButtonsWrapper>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
          </StyledForm>
        )}
      </Formik>
    </Modal>
  );
};

EditTodo.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  editTodo: PropTypes.func.isRequired,
  cleanUp: PropTypes.func,
};

const mapStateToProps = state => ({
  error: state.todos.editTodo.error,
  loading: state.todos.editTodo.loading,
});

const mapDispatchToProps = {
  editTodo: actions.editTodo,
  cleanUp: actions.cleanUpTodos,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTodo);
