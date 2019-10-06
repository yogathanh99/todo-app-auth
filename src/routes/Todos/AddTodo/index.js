import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { StyledForm } from '../../../hoc/container';
import Input from '../../../components/UI/Form/Input';
import Button from '../../../components/UI/Form/Button';
import Message from '../../../components/UI/Message';

import * as actions from '../../../store/actions';

const schemaTodo = Yup.object().shape({
  todo: Yup.string().required('Todo is required!'),
});

const MessageWrapper = styled.div`
  position: absolute;
  bottom: -1rem;
`;

const AddTodo = ({ loading, error, addTodo }) => {
  return (
    <Formik
      initialValues={{
        todo: '',
      }}
      validationSchema={schemaTodo}
      onSubmit={async (value, { setSubmitting }) => {
        await addTodo(value);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <StyledForm>
          <Field
            type='text'
            name='todo'
            placeholder='Write your todo...'
            component={Input}
          />
          <Button
            color='green'
            disabled={!isValid || isSubmitting}
            type='submit'
            loading={loading ? 'Adding...' : null}
          >
            Add todo
          </Button>
          <MessageWrapper>
            <Message error show={error}>
              {error}
            </Message>
          </MessageWrapper>
        </StyledForm>
      )}
    </Formik>
  );
};

AddTodo.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  addTodo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.todos.loading,
  error: state.todos.error,
});

const mapDispatchToProps = {
  addTodo: actions.addTodo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTodo);
